import React from "react";
import { Link, useHistory } from "react-router-dom";
import EditDeckForm from "./EditDeckForm";
import { createDeck } from "./utils/api";

function CreateDeck(){
    const history = useHistory();
    
    function onSubmitHandler(deck){
        createDeck(deck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`))
    }

    function cancel(){
        history.push('/');
    }

    return(
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                    </ol>
                </nav>
            </div>
            <h2>Create Deck</h2>
            <div>
                <EditDeckForm 
                    onCancel={cancel}
                    onSubmit={onSubmitHandler}
                />
            </div>
        </div>
    )
}

export default CreateDeck;