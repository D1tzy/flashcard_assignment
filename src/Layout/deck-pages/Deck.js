import React, {Fragment} from "react"
import {useParams, Link} from "react-router-dom"

function deleteHandler(event) {
    event.preventDefault()
    if (window.confirm("Delete this card? You will not be able to recover it.")) {
        console.log(`Deleting ${event.target.value}`)
    } else {
        console.log("Canceled")
    }
}

function RenderCards({cards, deckId}) {
    return cards.map((card, index) => {
        return (
            <Fragment>
                <div className="border">
                    <div className="d-inline-flex w-100">
                        <div className="w-50 p-2">{card.front}</div>
                        <div className="w-50 p-2">{card.back}</div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={`/decks/${deckId}/cards/${index}/edit`}>
                            <button className="m-2 bg-dark text-white">Edit</button>
                        </Link>
                        <button className="m-2 bg-danger text-white" value={index} onClick={deleteHandler}>Delete</button>
                    </div>
                </div>
            </Fragment>
        )
    })
}

export default function Deck({decks}) {
    const {deckId} = useParams()
    const deck = decks[0][deckId - 1]
    const name = deck.name
    const description = deck.description
    const cards = deck.cards

    return (
        <main>
            <div className="mb-3">
                <h2>{name}</h2>
                <p>{description}</p>
                <div className="w-auto d-flex mb-2">
                    <div className="w-50 d-flex justify-content-around">
                        <Link to={`/decks/${deckId}/edit`}>
                            <button className="bg-dark text-white">Edit</button>
                        </Link>
                        <Link to={`/decks/${deckId}/study`}>
                            <button className="bg-primary text-white">Study</button>
                        </Link>
                        <Link to={`/decks/${deckId}/cards/new`}>
                            <button className="bg-primary text-white">Add Cards</button>
                        </Link>
                    </div>
                    <div className="w-50">
                        <button className="bg-danger float-right">Delete</button>
                    </div>
                </div>
                <h2 className="my-2">Cards</h2>
                <div className="d-flex flex-column">
                    <RenderCards cards={cards} deckId={deckId} />
                </div>
            </div>
        </main>
    )
}