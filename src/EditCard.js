import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AddCardForm from "./AddCardForm";
import { readCard, readDeck, updateCard } from "./utils/api";

function EditCard({ title }){
    const [deck, setDeck] = useState({cards:[]});
    const [card, setCard] = useState({ front: "", back: ""});
    const {deckId, cardId} = useParams();

    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then(setDeck);
        readCard(cardId).then(setCard);
    }, [deckId, cardId]);

    function onSaveHandler(card) {
        updateCard(card).then(onDoneHandler);
    }
    function onDoneHandler() {
        history.push(`/decks/${deck.id}`);
    }

   const editForm = card.id ? (
    <AddCardForm
        onDone={onDoneHandler}
        onSubmit={onSaveHandler}
        initialState={card}
        doneButton="Cancel"
        />
   ) : (
    <p>Loading...</p>
   )

    return(
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>{`${deck.name}`}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                    </ol>
                </nav>
            </div>
            <div>
                <h2>Edit Card</h2>
                {editForm}
            </div>
        </div>
    )
}

export default EditCard;