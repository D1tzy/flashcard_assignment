import React from "react"
import {useParams, useHistory} from "react-router-dom"



export default function EditDeck({decks}) {
    const {deckId} = useParams();
    const history = useHistory();
    const deck = decks[0][deckId - 1]
    console.log(deck)

    function submitHandler(event) {
        event.preventDefault()
        history.push(`/decks/${deckId}`)
        console.log("submitted")
    } 

    return (
        <main>
          <h1>Edit Deck</h1>
          <form onSubmit={submitHandler} className="d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder={deck.name} />
            <br />
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" type="text" placeholder={deck.description} />
            <br />
            <div className="d-inline-flex">
              <button onClick={() => history.push(`/decks/${deckId}`)} className="bg-dark text-white m-2">Cancel</button>
              <button type="submit" className="bg-primary text-white m-2">Submit</button>
            </div>
          </form>
        </main>
      )
}