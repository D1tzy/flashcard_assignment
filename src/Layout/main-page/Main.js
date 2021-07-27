import DecksList from "./DecksList"
import React, { Fragment } from "react"
import { Link } from "react-router-dom"



export default function Main({decks, setDecks}) {
    return (
      <Fragment>
        <Link to={`/decks/new`}>
          <button>Create Deck</button>
        </Link>
        <DecksList decks={decks} setDecks={setDecks} />
      </Fragment>
    )
}