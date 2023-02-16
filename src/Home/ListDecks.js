import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function ListDecks(){
    const [decks, setDecks] = useState([]);

    const history = useHistory

    async function loadDecks(signal) {
        try{
        const response = await listDecks(signal)
        // console.log("this is", response)
        setDecks(response) 
        } catch (error) {
console.log("this is error", error)
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        
        loadDecks(abortController.signal)
        return () => {
            abortController.abort();
        }
    },[])

    async function deleteDeckHandler(deckId){
        try{
            if (window.confirm("Delete this deck? \n You will not be able to recover it.")){
                await deleteDeck(deckId).then(() => loadDecks())
            }
        }catch (error) {
            console.log(error)
        }
    }

    const listEachDeck = decks.map((deck) => (
        <li key={deck.id} className="list-group-item">
            <h3>{deck.name}</h3>
            <p>{deck.cards.length} cards</p>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary btn sm m-1">Study</Link>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary btn sm m-1">View</Link>
            <button type="button" className="btn btn-danger btn sm m-1" onClick={() => deleteDeckHandler(deck.id)}>Delete Deck</button> 
        </li>
    ))
    return(
        <div>
            <Link to={`/decks/new`}>
                <button type="button" className="btn btn-secondary btn sm m-1">+ Create Deck</button>
            </Link>
            {listEachDeck}
        </div>
    )
}

export default ListDecks;