import React, {useState, useEffect} from "react"
import { useRouteMatch, Link, useParams } from "react-router-dom"
import { readDeck } from "../../utils/api";
//import ClassNames from "../../utils/class-names"



export default function UserRouteHelper() {
    const { path } = useRouteMatch();
    const currentPath = path
    const {deckId, cardId} = useParams()
    const [deck, setDeck] = useState([])

    // useEffect that sets the current deck every time the path is changed
    // only sets the deck if the path is not to create a deck
    useEffect(() => {
        if (currentPath !== "/decks/new") {
            readDeck(deckId).then(setDeck)
        }
    }, [path])
    
    // this very long if else statement returns different JSX for every screen
    if (currentPath === "/decks/:deckId") {
        return (
            <div className="w-auto d-inline-flex">
                <Link to="/">Home</Link>
                <p className="mx-2">/</p>
                <p className="mx-2">{deck.name}</p>
            </div>
        )
    } else if (currentPath === "/decks/:deckId/study") {
        return (
            <div className="w-auto d-inline-flex">
                <Link to="/">Home</Link>
                <p className="mx-2">/</p>
                <Link to={`/decks/${deckId}`} className="mx-2">{deck.name}</Link>
                <p className="mx-2">/</p>
                <p className="mx-2">Study</p>
            </div>
        )
    } else if (currentPath === "/decks/:deckId/edit") {
        return (
            <div className="w-auto d-inline-flex">
                <Link to="/">Home</Link>
                <p className="mx-2">/</p>
                <Link to={`/decks/${deckId}`} className="mx-2">{deck.name}</Link>
                <p className="mx-2">/</p>
                <p className="mx-2">Edit</p>
            </div>
        )
    } else if (currentPath === "/decks/:deckId/cards/new") {
        return (
            <div className="w-auto d-inline-flex">
                <Link to="/">Home</Link>
                <p className="mx-2">/</p>
                <Link to={`/decks/${deckId}`} className="mx-2">{deck.name}</Link>
                <p className="mx-2">/</p>
                <p className="mx-2">Add Card</p>
            </div>
        )
    } else if (currentPath === "/decks/:deckId/cards/:cardId/edit") {
        return (
            <div className="w-auto d-inline-flex">
                <Link to="/">Home</Link>
                <p className="mx-2">/</p>
                <Link to={`/decks/${deckId}`} className="mx-2">{deck.name}</Link>
                <p className="mx-2">/</p>
                <p className="mx-2">Edit Card {cardId} </p>
            </div>
        )
    }
    

    // if none of the paths match, the path must be to the create deck screen, so return this JSX
    return (
        <div className="w-auto d-inline-flex">
            <Link to="/">Home</Link>
            <p className="mx-2">/</p>
            <p className="mx-2">Create Deck</p>
        </div>
    )
}