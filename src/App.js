import { useState, useEffect } from 'react';

import './App.css';
import Card from './Card';
import {getShuffledDeck, getCardDeck, dealCard} from './game.js';


function App() {

  const [deck, setDeck] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0);

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  if (shuffledDeck.length === 0) {
    setShuffledDeck(getShuffledDeck(getCardDeck()));
  }

  useEffect(() => {
    console.log('USE EFFECT');
    // Deal the initial cards
    if (dealerHand.length === 0) {
      let dh = dealerHand;
      let ph = playerHand;
      let di = deckIndex;

      const firstDealerCard = dealCard(di++, shuffledDeck);
      Object.defineProperty(firstDealerCard, 'showBack', {value: true});
      dh.push(firstDealerCard);
      ph.push(dealCard(di++, shuffledDeck));
      dh.push(dealCard(di++, shuffledDeck));
      ph.push(dealCard(di++, shuffledDeck));

      setDealerHand(dh);
      setPlayerHand(ph);
      setDeckIndex(di); 
    }   
  }, [dealerHand, playerHand])

  const handleCardClick = (card) => {
    console.log(card.target.title);
    console.log(dealerHand);
    console.log(playerHand);
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
    </div>
  );
}

export default App;
