import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardList from "./CardList";
import { deleteCard, deleteDeck, readDeck } from "./utils/api";

function ViewDeck(){
    const [deck, setDeck] = useState([]);
    const {deckId} = useParams();
    const history = useHistory();

    useEffect(loadDeck, [deckId]);

    function loadDeck(){
        readDeck(deckId).then(setDeck);
    }

    function deleteDeckHandler(deckId){
        const deleteConfirmation = window.confirm("Delete this deck? \n You will not be able to recover it.")

        if(deleteConfirmation) {
            deleteDeck(deck.id).then(() => history.pushState("/"))
        }
    }

    function deleteCardHandler(cardId){
        const deleteConfirmation = window.confirm("Delete this card? \n You will not be able to recover it.")

        if(deleteConfirmation) {
            deleteCard(cardId).then(loadDeck)
        }
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div>
                <div>
                    <h5>{deck.name}</h5>
                    {deck.description}
                </div>
            </div>
            <Link to={`/decks/${deckId}/edit`}>
                <button type="button" className="btn btn-secondary btn sm m-1">Edit</button>
            </Link>
            <Link to={`/decks/${deckId}/study`}>
                <button type="button" className="btn btn-primary btn sm m-1">Study</button>
            </Link>
            <Link to={`/decks/${deckId}/cards/new`}>
                <button type="button" className="btn btn-primary btn sm m-1"> + Add Card</button>
            </Link>
            <button type="button" className="btn btn-danger btn sm m-1" onClick={deleteDeckHandler}>Delete Deck</button>
            <div>
                <CardList deck={deck} onCardDelete={deleteCardHandler}/>
            </div>
        </div>
    )
}

export default ViewDeck;