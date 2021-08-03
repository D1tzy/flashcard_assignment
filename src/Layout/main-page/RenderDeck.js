import React from "react"
import {Link} from "react-router-dom"
import { deleteDeck } from "../../utils/api";



export default function RenderDeck({deck}) {
    // our delete handler function deletes the deck if the user confirms the pop up
    function deleteHandler(event) {
        event.preventDefault();
        if (window.confirm(`Delete this deck? You will not be able to recover it.`)) {
                deleteDeck(event.target.value)
            }
        }
    
    // JSX for each deck
    return (
        <div key={deck.id} className="border mt-2">
            <div className="w-100 d-inline-flex">
                <div className="w-50">
                    <h3 className="p-2">{deck.name}</h3>
                </div>
                <div className="w-50 text-right">
                    <p className="p-2">{deck.cards.length} cards</p>
                </div>
            </div>
            <p className="p-3">{deck.description}</p>
            <div className="d-flex justify-content-around">
                <Link to={`/decks/${deck.id}`}>
                    <button className="m-2 bg-secondary">View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="m-2 bg-primary">Study</button>
                </Link>
                <button className="m-2 bg-danger" value={deck.id} onClick={deleteHandler}>Delete Deck {deck.id}</button>
            </div>
        </div>
    )
}