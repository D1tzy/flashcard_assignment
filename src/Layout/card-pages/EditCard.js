import React from "react"
import {useParams, useHistory} from "react-router-dom"

export default function EditCard({decks}) {
    const {deckId, cardId} = useParams()
    const history = useHistory()
    const deck = decks[0][deckId - 1]
    const card = deck.cards[cardId]

    function submitHandler(event) {
        event.preventDefault()
        console.log("submitted")
        history.push(`/decks/${deckId}`)
    }

    return (
        <main>
            <h1>Edit Card</h1>
            <form className="d-flex flex-column" onSubmit={submitHandler}>
                <label htmlFor="front">Front</label>
                <input className="mb-3"type="text" name="front" id="front" placeholder={card.front} />
                <label htmlFor="back">Back</label>
                <input className="mb-3" type="text" name="back" id="back" placeholder={card.back} />
                <div>
                    <button className="bg-dark text-white m-2" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                    <button className="bg-primary text-white m-2" type="submit">Submit</button>
                </div>
            </form>
        </main>
    )
}