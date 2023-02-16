import React, { useState } from "react";

function AddCardForm({
    onSubmit,
    onDone,
    deckName,
    initialState,
    doneButton = "Done"
}) {
    const [card, setCard] = useState(initialState);

   function changeHandler({ target: {name, value} }){
    setCard((prevState) => ({
        ...prevState,
        [name]: value,
    }))
   };

   function onSubmitHandler(event) {
    event.preventDefault();
    onSubmit({...card});
    setCard({front: "", back: ""});
   }
   
    return(
        <div>
            <form onSubmit={onSubmitHandler} className="card-front">
                <fieldset>
                    <legend>{deckName}</legend>
                    <div className="form-group">
                        <label htmlFor="font">Front</label>
                                <textarea
                                className="form-control"
                                id="front" 
                                type="text" 
                                name="front" 
                                placeholder="Front side of Card"
                                value={card.front}
                                onChange={changeHandler}
                                />
                    </div>
                    <div className="form-group">
                        <label htmlFor="back">Back</label>
                            <textarea
                            className="form-control"
                            id="back" 
                            name="back" 
                            placeholder="Back side of Card"
                            value={card.back}
                            onChange={changeHandler}
                            />
                    </div>
                    <button className="btn btn-secondary btn-sm mx-1" onClick={onDone}>{doneButton}</button>
                    <button className="btn btn-primary btn-sm mx-1">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default AddCardForm;