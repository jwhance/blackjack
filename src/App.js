import './App.css';
import Card from './Card';

function App() {
  return (
    <div className="App">
      <section className="App-header">
        Dealer: <Card card="2_of_clubs.png" />
        <hr />
        Joe: <Card card="7_of_hearts.png" />
      </section>
    </div>
  );
}

export default App;
