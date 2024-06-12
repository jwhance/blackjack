const Card = ({card, onClick, showBack}) => {

    const cardImage = !showBack ? `images/${card}` : `images/back_of_card.png`;
    const cardTitle = !showBack ? card.replace('.png', '') : 'back_of_card';

    return (
        <div className="Card">
            <img src={cardImage} className="card-image" alt="logo" onClick={onClick} title={cardTitle} />
        </div>
    );
}

export default Card;
