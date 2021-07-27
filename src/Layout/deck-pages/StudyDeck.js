import React, {useState} from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import UserRouteHelper from "../common/UserRouteHelper";

function RenderCard(props) {
    const {setId, id, length, decks, deckId, cards} = props

    

    const [showFront, setShowFront] = useState(true)
    const [showNext, setShowNext] = useState("d-none")

    const history = useHistory()

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

    function flipCard() {
        setShowFront(!showFront)
        if (showNext === "d-none") {
            setShowNext("d-inline-flex")
        } else {
            setShowNext("d-none")
        }
    }

    function goNext() {
        if (id + 1 <= cards.length) {
            setId(id + 1)
            setShowFront(!showFront)
            setShowNext("d-none")
        } else {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
                setId(1)
                setShowFront(true)
                setShowNext("d-none")
            } else {
                history.push("/")
            }
        }
    }

    return (
        <div className="border">
            <h5 className="p-2">Card {id} of {length}</h5>
            <p className="p-2">{(showFront) ? cards[id - 1].front : cards[id - 1].back}</p>
            <button className="m-2 text-white bg-dark" onClick={flipCard}>Flip</button>
            <button className={`${showNext} m-2 bg-primary text-white`} onClick={goNext}>Next</button>
        </div>
    )
}

export default function StudyDeck({ decks }) {
    const [id, setId] = useState(1)
    const { deckId } = useParams();
    console.log(decks)
    const deck = decks[0][deckId - 1];
    const name = deck.name
    const cards = deck.cards;

    console.log(cards)

    

    return (
        <main>
            <div>
                <UserRouteHelper decks={decks} deckId={deckId} />
            </div>
            <h3>{name}: Study</h3>
            <RenderCard setId={setId} decks={decks} id={id} deckId={deckId} length={cards.length} cards={cards} />
        </main>
        )
}