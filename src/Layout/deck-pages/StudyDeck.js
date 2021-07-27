import React from "react"
import { useRouteMatch, useParams } from "react-router"
import UserRouteHelper from "../common/UserRouteHelper";

export default function StudyDeck({ decks }) {
    const { url } = useRouteMatch();
    const { deckId } = useParams();

    return (
        <main>
            <div>
                <UserRouteHelper decks={decks} deckId={deckId} />
            </div>
        </main>
        )
}