import React, { useState } from "react"
import { useRouteMatch,  } from "react-router"

/* async function asyncSetRoute(text, route, setRoute) {
    await setRoute([...route], text)
    return route
} */

function RouteBuilder({ path, route, setRoute }) {
    return route.map((value, index) => {
        <p className="p-3 text-primary">{value}</p>
    })
}

export default function UserRouteHelper({ decks, deckId }) {
    const { path } = useRouteMatch();
    console.log(decks)
    const name = decks[0][deckId - 1].name


    const [route, setRoute] = useState(["Home", "/", `${name}`])

    return (
        <main>
            <div className="width-auto bg-light d-inline-flex">
                <RouteBuilder path={ path } route={ route } setRoute={ setRoute } />
            </div>
        </main>
        )
}