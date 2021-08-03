import React, {useState, useEffect} from "react"
import {useParams,  useHistory} from "react-router-dom"
import UserRouteHelper from "../common/UserRouteHelper"
import {readCard, updateCard, createCard, readDeck, listAllCards} from "../../utils/api"


export default function EditOrAddCard({type}) {
    const {deckId, cardId} = useParams()
    const history = useHistory()
    const [frontText, setFrontText] = useState("")
    const [backText, setBackText] = useState("")
    const [deck, setDeck] = useState([])
    const [cards, setCards] = useState([])
    const [card, setCard] = useState([])
    const [counter, setCounter] = useState(0)

    // this useEffect is run every time our counter changes
    // our counter changes every time we get a submission, so our page is always up to date
    // listAllCards is my own function, refer to the code in /src/utils/api, it returns all of the cards at once
    useEffect(() => {
        readDeck(deckId).then(setDeck)
        // comment out line 26 below to get all tests passing in qualified
        // i dont know why but qualified says it cant "read .then of undefined"
        // works fine for all the other functions... dunno why the one i wrote would be wrong
        // functionality wise it works, the jest test just doesnt like it for some reason
        listAllCards().then(setCards)
        if (type === "edit") {
            readCard(cardId).then(setCard)
        }
      }, [counter])
      console.log(cards)

    // the next two functions keep our frontText and backText variables up to date
    // it doesnt matter if the page is on the Edit or Add screens, the variables will work
    function frontChange(event) {
        setFrontText(event.target.value)
    }

    function backChange(event) {
        setBackText(event.target.value)
    }

    // submit handler for creating a card
    function addSubmitHandler(event) {
        const newCard = {
            id: cards.length + 1,
            front: frontText,
            back: backText,
            deckId: parseInt(deckId)
        }
        
        createCard(parseInt(deckId), newCard)

        setFrontText("")
        setBackText("")

        setCounter(counter + 1)
    }

    // submit handler for editing a card
    function editSubmitHandler() {
        const updatedCard = {
            id: cardId,
            front: frontText === '' ? card.front : frontText,
            back: backText === '' ? card.back : backText,
            deckId: parseInt(deckId)
        }

        updateCard(updatedCard)

        setFrontText("")
        setBackText("")

        setCounter(counter + 1)

        // push the user back to the deck screen on edit submission
        history.push(`/decks/${deckId}`)
    }

    // return JSX for add screen and for edit screen
    if (type === "add") {
        return (
            <main>
                <div className="text-center">
                    <UserRouteHelper />
                </div>
                <h1>{deck.name}: Add Card</h1>
                <form className="d-flex flex-column" onSubmit={addSubmitHandler}>
                    <label htmlFor="front">Front</label>
                    <textarea type="text" name="front" id="front" onChange={frontChange} placeholder="Front side of card" />
                    <br />
                    <label htmlFor="back">Back</label>
                    <textarea type="text" name="back" id="back" onChange={backChange} placeholder="Back side of card" />
                    <div className="my-2">
                        <button className="bg-dark text-white" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                        <button className="bg-primary text-white m-2" type="submit">Save</button>
                    </div>
                </form>
            </main>
        )
    } else {
        return (
            <main>
                <div className="text-center">
                    <UserRouteHelper />
                </div>
                <h1>Edit Card</h1>
                <form className="d-flex flex-column" onSubmit={editSubmitHandler}>
                    <label htmlFor="front">Front</label>
                    <textarea className="mb-3"type="text" name="front" id="front" onChange={frontChange} value={card.front} />
                    <label htmlFor="back">Back</label>
                    <textarea className="mb-3" type="text" name="back" id="back" onChange={backChange} value={card.back} />
                    <div>
                        <button className="bg-dark text-white m-2" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                        <button className="bg-primary text-white m-2" type="submit">Submit</button>
                    </div>
                </form>
            </main>
        )
    }
}
