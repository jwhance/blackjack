function Card(card) {
    const cardImage = `images/${card.card}`;

    return (
        <div className="Card">
            <img src={cardImage} className="card-image" alt="logo" />
        </div>
    );
}

export default Card;
