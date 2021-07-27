import React, {useState} from "react"
import {useParams,  useHistory} from "react-router-dom"

// This is the function for the page at path /decks/:deckId/cards/new
export default function AddCard({decks}) {
    /* Declare all variables that require hooks
       frontText and backText are used to track the text in the textarea's
    */
    const {deckId} = useParams()
    const history = useHistory()
    const [frontText, setFrontText] = useState("")
    const [backText, setBackText] = useState("")

    // Get our specific deck from the decks object
    const deck = decks[0][deckId - 1]

    function frontChange(event) {
        setFrontText(event.target.value)
    }

    function backChange(event) {
        setBackText(event.target.value)
    }

    function submitHandler(event) {
        event.preventDefault()
        const textAreas = event.target.querySelectorAll("textarea")
        textAreas.forEach((area) => {
            area.value = ""
        })
        console.log(frontText, backText)
        setFrontText("")
        setBackText("")
        console.log("submitted")
    }

    return (
        <main>
            <h1>{deck.name}: Add Card</h1>
            <form className="d-flex flex-column" onSubmit={submitHandler}>
                <label htmlFor="front">Front</label>
                <textarea type="text" name="front" id="front" onChange={frontChange} placeholder="Front side of card" />
                <br />
                <label htmlFor="back">Back</label>
                <textarea type="text" name="back" id="back" onChange={backChange} placeholder="Back side of card" />
                <div className="my-2">
                    <button className="bg-dark text-white" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                    <button className="bg-primary text-white m-2" type="submit">Save</button>
                </div>
            </form>
        </main>
    )
}