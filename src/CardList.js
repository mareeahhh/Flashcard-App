import React from "react";
import { Link } from "react-router-dom";

function CardList({deck, onCardDelete}) {
    const { cards =[] } = deck;

    const eachCard = cards.map(card => (
        <li key={card.id} className="list-group-item">
            <div className="row">
                <div className="col-md-7">
                    <div className="row">
                        <div className="col">{card.front}</div>
                        <div className="col">{card.back}</div>
                    </div>
                </div>
                <div className="col text-right">
                    <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-primary btn-sm mr-1" title="Edit Card">Edit</Link>
                    <button className="btn btn-danger btn-sm md-1" onClick={() =>onCardDelete(card.id)}>Delete</button>          
                </div>
            </div>
        </li>
    ))
    return (
        <div>
            <div>
                <h2>Cards</h2>
            </div>
            <div>
                {eachCard}
            </div>
        </div>
    )
}

export default CardList;