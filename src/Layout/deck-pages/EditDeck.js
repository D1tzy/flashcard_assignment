import React, {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import UserRouteHelper from "../common/UserRouteHelper";
import { readDeck, updateDeck } from "../../utils/api";



export default function EditDeck() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState([])
    const history = useHistory();
  
    // this use effect gets the deck and sets the deck state
    useEffect(() => {
      readDeck(deckId).then(setDeck)
    }, [])

    async function submitHandler(event) {
        event.preventDefault()
        
        // these variables are equal to the text in their respective fields
        let input = event.target.querySelector("input").value
        let textArea = event.target.querySelector("textarea").value

        // if there is no 'value', then set them equal to either the name or description
        if (input === "") input = deck.name
        if (textArea === "") textArea = deck.description

        // this is the updated deck being used in updateDeck below
        const newDeck = {
          name: input,
          description: textArea,
          id: deck.id,
          cards: [deck.cards]
        }

        updateDeck(newDeck)

        // after the deck is updated, return to the deck screen
        history.push(`/decks/${deckId}`)
    } 

    // JSX containing our Route Helper and our form
    return (
        <main>
          <div className="text-center">
            <UserRouteHelper />
          </div>
          <h1>Edit Deck</h1>
          <form onSubmit={submitHandler} className="d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={deck.name} />
            <br />
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" type="text" value={deck.description} />
            <br />
            <div className="d-inline-flex">
              <button onClick={() => history.push(`/decks/${deckId}`)} className="bg-dark text-white m-2">Cancel</button>
              <button type="submit" className="bg-primary text-white m-2">Submit</button>
            </div>
          </form>
        </main>
      )
}