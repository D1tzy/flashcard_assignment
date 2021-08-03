import DecksList from "./DecksList"
import React, { Fragment } from "react"
import { Link } from "react-router-dom"


// Main has a button linked to the CreateDeck page, and also renders DecksList
export default function Main({decks}) {
    return (
      <Fragment>
        <Link to={`/decks/new`}>
          <button>Create Deck</button>
        </Link>
        <DecksList decks={decks} />
      </Fragment>
    )
}