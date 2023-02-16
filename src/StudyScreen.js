import React from "react";
import { Link } from "react-router-dom";

function StudyScreen({deckId}) {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>TITLE OF DECK</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>TITLE OF DECK: Study</h1>
        </div>
    )
}

export default StudyScreen;