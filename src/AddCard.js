import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AddCardForm from "./AddCardForm";
import { createCard, readDeck } from "./utils/api";

function AddCard() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState({cards:[]})

    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then(setDeck);
    }, [deckId]);

    function onSaveHandler(card){
        createCard(deckId, card)
    }

    function onDoneHandler(){
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
                <AddCardForm 
                deckName={deck.name}
                initialState={deck}
                onSubmit={onSaveHandler}
                onDone={onDoneHandler}
                />
        </div>
    )
}

export default AddCard;