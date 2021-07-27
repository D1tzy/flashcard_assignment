import React from "react"
import {Link} from "react-router-dom"



export default function RenderDeck({deck, decks, setDecks}) {
    function deleteHandler(event) {
        event.preventDefault();
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            const filtered = decks[0].filter((deck) => {
                console.log(typeof deck.id)
                console.log(typeof event.target.value)
                return deck.id.toString() !== event.target.value
            })
            console.log(filtered)
            setDecks(filtered)
        }
    }

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