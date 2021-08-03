import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import NotFound from "../NotFound";
import CreateDeck from "../deck-pages/CreateDeck"
import Main from "../main-page/Main"
import Deck from "../deck-pages/Deck"
import StudyDeck from "../deck-pages/StudyDeck";
import EditDeck from "../deck-pages/EditDeck";
import EditOrAddCard from "../card-pages/EditOrAddCard"
import { useRouteMatch, Route, Switch } from "react-router-dom"
import {listDecks} from "../../utils/api"

function Layout() {
  const {url} = useRouteMatch()

  const [decks, setDecks] = useState([])
  
  useEffect(() => {
      listDecks().then(setDecks)
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
            <EditOrAddCard type="edit" />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <EditOrAddCard type="add" />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
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