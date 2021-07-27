import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import NotFound from "../NotFound";
import CreateDeck from "../deck-pages/CreateDeck"
import Main from "../main-page/Main"
import Deck from "../deck-pages/Deck"
import vars from "../common/variables.js"
import StudyDeck from "../deck-pages/StudyDeck";
import EditDeck from "../deck-pages/EditDeck"
import EditCard from "../card-pages/EditCard"
import AddCard from "../card-pages/AddCard"
import { useRouteMatch, Route, Switch } from "react-router-dom"

function Layout() {
  const {url} = useRouteMatch()

  const [decks, setDecks] = useState([])
  
  useEffect(() => {
    console.log("use effect")
    const {BASE_URL} = vars;
    const url = `${BASE_URL}/decks?_embed=cards`
    //const abortController = new AbortController()
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
          console.log("Setting decks as", response)
          setDecks([response], setDecks([response]))
        })
    //return abortController.abort();
    }, [])
  
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={`${url}`}>
            <Main decks={decks} setDecks={setDecks}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard decks={decks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard decks={decks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck decks={decks}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck decks={decks}/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck decks={decks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
