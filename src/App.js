import { useState, useEffect } from 'react';

import './App.css';
import Card from './Card';


function App() {
  
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  return (
    <div className="App">
      <section className="parent">
        <div>Dealer:</div>
        <Card card="back_of_card.png" />
        <Card card="2_of_clubs.png" />
        </section>
        <section className="parent">
        <div>Joe:</div>
        <Card card="7_of_hearts.png" />
        <Card card="6_of_hearts.png" />
        <Card card="5_of_hearts.png" />
        <Card card="4_of_hearts.png" />
        <Card card="3_of_hearts.png" />
        </section>
    </div>
  );
}

export default App;
