const Card = ({card, onClick, showBack}) => {

    const cardImage = !showBack ? `images/${card}` : `images/back_of_card.png`;

    return (
        <div className="Card">
            <img src={cardImage} className="card-image" alt="logo" onClick={onClick} title={card.replace('.png', '')} />
        </div>
    );
}

export default Card;
