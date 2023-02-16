import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import EditDeckForm from "./EditDeckForm";
import { readDeck, updateDeck } from "./utils/api";

function EditDeck(){
    const [deck, setDeck] = useState({name:"", description:""});
    const {deckId} = useParams();
    
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId]);

    function onSubmitHandler(updatedDeck){
        updateDeck(updatedDeck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`))
    }

    function cancel(){
        history.goBack("/");
    }

    const deckForm = deck.id ? (
        <EditDeckForm 
            onCancel={cancel}
            onSubmit={onSubmitHandler}
            initialState={deck}
        />
    ) : (
        <p>Loading...</p>
    );
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
                        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
            </div>
            <h2>Edit Deck</h2>
            {deckForm}
        </div>
    )
}

export default EditDeck;