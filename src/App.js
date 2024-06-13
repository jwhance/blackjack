import { useState, useEffect } from 'react';

import './App.css';
import Card from './Card';

import {getShuffledDeck, getCardDeck, dealCard, getHandTotal, getHitStandOrBust} from './game.js';


function App() {

  const [deck, setDeck] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0);

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  if (shuffledDeck.length === 0) {
    setShuffledDeck(getShuffledDeck(getCardDeck()));
  }

  // const insertCardIntoHand = (hand, deck) => {
  //   let di = deckIndex;
  //   hand.push(dealCard(di++, deck));
  //   setDeckIndex(di);
  //   return hand;
  // }

  useEffect(() => {
    console.log('USE EFFECT');
    // Deal the initial cards
    if (dealerHand.length === 0) {
      let dh = dealerHand;
      let ph = playerHand;
      let di = deckIndex;

      const firstDealerCard = dealCard(di++, shuffledDeck);
      Object.defineProperty(firstDealerCard, 'showBack', {value: true, writable: true});
      dh.push(firstDealerCard);
      ph.push(dealCard(di++, shuffledDeck));
      dh.push(dealCard(di++, shuffledDeck));
      ph.push(dealCard(di++, shuffledDeck));

      setDealerHand(dh);
      setPlayerHand(ph);
      setDeckIndex(di); 
    }   
  }, [dealerHand, playerHand, deckIndex, shuffledDeck])

  const handleCardClick = (card) => {
    console.log(card.target.title);
    console.log(dealerHand);
    console.log(playerHand);
  }

  const handleButtonClick = (event) => {
    console.log(event.target.title);
    if (event.target.title === 'Shuffle') {
      setPlayerHand([]);
      setDealerHand([]);
      setDeckIndex(0);
      setShuffledDeck(getShuffledDeck(getCardDeck()));
    } else if (event.target.title === 'Hit') {
      let ph = playerHand;
      let di = deckIndex;
      ph.push(dealCard(di++, shuffledDeck));
      setPlayerHand(ph);
      setDeckIndex(di);

      // Get the total
      const playerHandTotal = getHandTotal(playerHand);
      if (playerHandTotal > 21) {
        // Bust
        alert(`Player BUST at ${playerHandTotal}`);
      }
    } else {
      // Stand - show down card
      let didx = deckIndex;
      let dh = dealerHand;
      dh[0].showBack = false;

      while (getHitStandOrBust(dh) === 'hit' || getHandTotal(dh) <= getHandTotal(playerHand)) {
        dh.push(dealCard(didx++, shuffledDeck));

        if (getHitStandOrBust(dh) === 'bust') {
            setDeckIndex(didx);
            setDealerHand(dh);          
            alert("Dealer Bust!!");
            break;
        } 
      }
      
      if (getHitStandOrBust(dh) !== 'bust' && (getHandTotal(dh) > getHandTotal(playerHand))) {
        alert(`Dealer wins with ${getHandTotal(dh)}`);
      } else {
        alert(`Player wins with ${getHandTotal(playerHand)}`);
      }

      setDeckIndex(didx);
      setDealerHand(dh);      
    }
  }


  return (
    <div className="App">
      <section className="parent">
        <div><b>Dealer:</b></div>
        { dealerHand.map((element, i) => (
          <Card card={element.face + '_of_' + element.suit + '.png'} onClick={handleCardClick} showBack={element.showBack} key={i} />)
        )}
        </section>
        <section className="parent">
        <div><b>Player:</b></div>
        { playerHand.map((element, i) => (
          <Card card={element.face + '_of_' + element.suit + '.png'} onClick={handleCardClick} showBack={element.showBack}  key={i*100}/>)
        )}
        </section>
        <section className='parent-button'>
          <div />
          <button className="button" onClick={handleButtonClick} title="Hit">Hit</button>
          <button className="button" onClick={handleButtonClick} title="Stand">Stand</button>
          <button className="button" onClick={handleButtonClick} title="Shuffle">Shuffle</button>
        </section>
    </div>
  );
}

export default App;
