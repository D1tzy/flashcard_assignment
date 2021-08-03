import React, {useEffect, useState} from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import UserRouteHelper from "../common/UserRouteHelper"
import {readDeck} from "../../utils/api"

export default function StudyDeck() {
    const [id, setId] = useState(1)
    const { deckId } = useParams();
    const [deck, setDeck] = useState([])
    const [showFront, setShowFront] = useState(true)
    const [showNext, setShowNext] = useState(false)
    const length = deck.length === 0 ? 0 : deck.cards.length

    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [])

    function RenderCard() {
        const history = useHistory()
    
        // if there are less than 3 cards, return this JSX
        if (length < 3) {
            return (
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`}>
                        <button className="bg-primary text-white m-3">Add Cards</button>
                    </Link>
                </div>
            )
        }
    
        // whenever the flip button is clicked, the card is flipped 
        // and the show next button either appears or disappears depending 
        // on if the front or back is showing
        function flipCard() {
            setShowFront(!showFront)
            setShowNext(!showNext)
        }
    
        // this function sets the state of id to + 1
        function goNext() {
            // if there is a next card, set id to +1, show the front of the card again, and hide the next button
            if (id + 1 <= deck.cards.length) {
                setId(id + 1)
                setShowFront(!showFront)
                setShowNext(!showNext)
            } 
            // otherwise send a window prompt
            else {
                // if confirmed, set id back to 1, show the front of the card, and hide the next button
                if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
                    setId(1)
                    setShowFront(true)
                    setShowNext(false)
                } 
                // if rejected, go back to the home page
                else {
                    history.push("/")
                }
            }
        }
    
        // JSX for each card
        return (
            <div className="border">
                <h5 className="p-2">Card {id} of {length}</h5>
                <p className="p-2">{(showFront) ? deck.cards[id - 1].front : deck.cards[id - 1].back}</p>
                <button className="m-2 text-white bg-dark" onClick={flipCard}>Flip</button>
                {showNext &&
                    <button className="m-2 bg-primary text-white" onClick={goNext}>Next</button>
                }
            </div>
        )
    }

    // the StudyDeck component returns our Route Helper, an h3, and the current card being studied
    return (
        <main>
            <div className="text-center">
                <UserRouteHelper />
            </div>
            <h3>{deck.name}: Study</h3>
            <RenderCard />
        </main>
        )
}