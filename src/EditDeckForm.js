import React, { useState } from "react";

function EditDeckForm({ onSubmit, onCancel, initialState={name:"", description:"" }}){
    const [deck, setDeck] =useState(initialState);

    function changeHandler({ target: {name, value} }){
        setDeck((prevState) => ({
            ...prevState,
            [name]: value,
        }))
       };

    function onSubmitHandler(event) {
        event.preventDefault();
        onSubmit({...deck});
       }
       
    return(
        <div>
            <form onSubmit={onSubmitHandler} className="edit-deck">
                    <fieldset>
                        <div>
                        <label htmlFor="name">Name</label>
                            <input 
                            className="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-default"
                            type="text" 
                            id="name" 
                            name="name"
                            placeholder="Deck Name"
                            onChange={changeHandler}
                            value={deck.name}
                            />
                        </div>
                        <div>
                        <label htmlFor="description">Description</label>
                            <textarea
                            className="form-control"
                            id="description" 
                            type="description" 
                            name="description" 
                            placeholder="Brief description of the deck"
                            onChange={changeHandler}
                            value={deck.description}
                            />
                        </div>
                        <button className="btn btn-secondary btn-sm mx-1" onCancel={onCancel}>Cancel</button>
                        <button className="btn btn-primary btn-sm mx-1">Submit</button>
                    </fieldset>
                </form>
        </div>
    )
}

export default EditDeckForm;