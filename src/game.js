//const prompt = require("prompt-sync")({ sigint: true });

const cCards = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
const cardValues = [[11, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [10, 10], [10, 10], [10, 10]];
const suits = ['hearts', 'diamonds', 'spades', 'clubs'];

const getCardDeck = () => {
  const deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cCards.length; j++) {
      deck.push({
        suit: suits[i],
        face: cCards[j],
        value: cardValues[j]
      });
    }
  }
  return deck;
};

const getShuffledDeck = (deck) => {
  let currentIndex = deck.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
  }

  return deck;
};

const dealCard = (deckIndex, deck) => {
    return deck[deckIndex];
}

/*
    Dealer always hits if <= 16
*/
const getHitStandOrBust = (dealerHand) => {

    let total = getHandTotal(dealerHand);

    if (total <= 16) {
        console.log(total, 'HIT');
        return 'hit';
    }

    if (total > 21) {
        console.log(total, 'BUST');
        return 'bust';
    }

    console.log(total, 'STAND');
    return 'stand';
    
}

const handHasAce = (hand) => {
    return hand.some(card => card.face === 'ace');
}


const getHandTotal = (hand) => {
     let handTotal = hand.reduce((accumulator, currentValue) => accumulator + currentValue.value[0], 0);

     if (handHasAce(hand) && handTotal > 21) {
        handTotal = hand.reduce((accumulator, currentValue) => accumulator + currentValue.value[1], 0);
     }

     return handTotal;
}

const printHand = (hand, player) => {
    console.log(player, hand, getHandTotal(hand));
}

export {getCardDeck, getShuffledDeck, dealCard, getHandTotal, getHitStandOrBust}