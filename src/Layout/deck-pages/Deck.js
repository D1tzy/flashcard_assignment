import React, {Fragment, useState, useEffect} from "react"
import {useParams, Link, useHistory} from "react-router-dom"
import UserRouteHelper from "../common/UserRouteHelper"
import {readDeck, deleteCard, deleteDeck} from "../../utils/api"


export default function Deck() {
    const {deckId} = useParams()
    const [deck, setDeck] = useState([])
    const [counter, setCounter] = useState(0)
    const history = useHistory()
    const name = deck.name
    const description = deck.description
    const cards = deck.cards

    // this delete handler dynamically deletes either the deck or card depending on the targets name
    async function deleteHandler(event) {
        if (window.confirm(`Delete this ${event.target.name}? You will not be able to recover it.`)) {
            if (event.target.name === "card") {
                deleteCard(parseInt(event.target.value))
            } else {
                deleteDeck(deckId)
                history.push("/")
            }
        }

        // change counter after a deletion so our useEffect is run again and our screen is refreshed
        setCounter(counter + 1)
    }

    // useEffect to set deck
    // runs on page load and every time there is a deletion
    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [counter])


    // render cards component that is used in the return JSX below this function
    function RenderCards({cards = [], deckId}) {
        return cards.map((card, index = 1) => {
            return (
                <Fragment>
                    <div key={index} className="border">
                        <div className="d-inline-flex w-100">
                            <div className="w-50 p-2">{card.front}</div>
                            <div className="w-50 p-2">{card.back}</div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link to={`/decks/${deckId}/cards/${index + 1}/edit`}>
                                <button className="m-2 bg-dark text-white">Edit</button>
                            </Link>
                            <button className="m-2 bg-danger text-white" value={card.id} name="card" onClick={deleteHandler}>Delete</button>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }

    // deck return JSX
    return (
        <main>
            <div className="text-center">
                <UserRouteHelper />
            </div>
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
                        <button className="bg-danger text-white float-right" name="deck" onClick={deleteHandler}>Delete</button>
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