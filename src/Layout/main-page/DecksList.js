import React, { Fragment } from "react"
import RenderDeck from "./RenderDeck"

export default function DecksList({decks, setDecks}) {
    if (decks[0] === undefined || decks[0].length === 0) return <p>hello</p>


    const decksArray = () => {
        if (decks[0].length > 1) {
            return Array.from(decks[0])
        } else {
            return decks[0]
        }
    }
  
    let List = decksArray().map((deck) => {
                return <RenderDeck decks={decks} deck={deck} setDecks={setDecks} /> 
            })
       
    


    return (
        <Fragment>
            <div>{List}</div>
        </Fragment>
    )
}