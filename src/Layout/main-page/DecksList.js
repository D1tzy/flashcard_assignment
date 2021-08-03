import React, { Fragment } from "react"
import RenderDeck from "./RenderDeck"

export default function DecksList({decks}) {
    // shows loading if decks have not been set yet
    if (decks === undefined || decks.length === 0) return <p>Loading...</p>

    // we need to map through the decks, so we either create an array of the decks, or simply return the single deck
    const decksArray = () => {
        if (decks.length > 1) {
            return Array.from(decks)
        } else {
            return decks
        }
    }

    // this function maps through the decksArray, using each one to render RenderDeck
    let List = decksArray().map((deck) => {
                return <RenderDeck decks={decks} deck={deck} /> 
            })
       
    

    // returns the rendered decks from the function above
    return (
        <div>{List}</div>
    )
}