import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "./utils/api";

function FlashCard({ card={}, title }) {
    const [cardView, setCardView] = useState("front");
    const [flipCard, setFlipCard] = useState(false);
    const [studyDeck, setStudyDeck] = useState({cards:[]});
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadStudyDeck() {
            try{
                const response = await readDeck(deckId, abortController.signal)
                setStudyDeck(response)
            } catch (error) {
                
            }
        }
        loadStudyDeck()
        return () => {
            abortController.abort()
        }
    },[deckId])
    console.log("this is", studyDeck);

  
    
    return(
        <div className={`card ${cardView} study-card`}>
            <div className="card-body">
                <h3 className="card-title">Title here</h3>
                <p className="card-text">Front of card</p>
                <button type="button" className="btn btn-secondary mr-2">
                    Flip
                </button>
                {flipCard}
            </div>
        </div> 
        )
}

export default FlashCard;
