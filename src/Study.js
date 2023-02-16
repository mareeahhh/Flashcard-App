import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "./utils/api/index";


function Study(){
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const [front, setFront] = useState(true)
  const { deckId } = useParams();

  const history = useHistory();
  useEffect(() => {
        const abortController = new AbortController();
        async function setStudyDeck() {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
        setCards(response.cards)
          return () => {
          abortController.abort()
        }
        }
        setStudyDeck()
    },[deckId])
    console.log("this is", deck);
  
  function nextCard(index, total){
    if (index < total) {
      setCardNumber(cardNumber+1)
      setFront(true)
    }else{
      if(window.confirm('Restart Cards? \n Click Cancel to return to the home page.')) {
        setCardNumber(1)
        setFront(true)
      }else {
        history.push("/")
      }
    }
  }

  function flipCard() {
    if(front){
      setFront(false)
    }else{
      setFront(true)
    }
  }
  
  function showButton(cards, index){
  if(front){
    return null
  }else{
    return  <button className="btn btn-primary mx-1" onClick={() => nextCard(index+1, cards.length)}>Next</button>
  }
}
  
  function notEnoughCards() {
      return (
          <div>
              <h2>Not Enough Cards</h2>
              <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Card</Link>
          </div>
      )
  }

    
    function enoughCards(){
      const card = cards[cardNumber];

      return (
        <div className="card">
                  <div className="card-body" key={card.id}>
                    <div className="card-title">
                      {`Card ${cardNumber+1} of ${cards.length}`}
                    </div>
                    <div className="card-text">
                      {front ? card.front : card.back}
                    </div>
                    <button type="button" className="btn btn-secondary mx-1" onClick={flipCard}>Flip</button>
                    {showButton(cards, cardNumber)}
                  </div> 
        </div>
      )
    }
    
    return(
        <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
        <div>
          <h2>{`${deck.name}: Study`}</h2>
          <div>
            {cards.length === 0
               ? notEnoughCards()
               : cards.length >2
               ? enoughCards()
               : notEnoughCards()}
          </div>
        </div>
        </div>
    )

}

export default Study;