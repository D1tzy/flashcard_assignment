import React from "react"
import { useHistory } from "react-router-dom"

function submitHandler(event) {
  event.preventDefault();
  console.log("submitted")
}

export default function CreateDeck() {
  const history = useHistory()
  
  return (
    <main>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler} className="d-flex flex-column">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Deck Name" />
        <br />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" type="text" placeholder="Brief description of the deck" />
        <br />
        <div className="d-inline-flex">
          <button onClick={() => history.push("/")} className="bg-dark text-white m-2">Cancel</button>
          <button type="submit" className="bg-primary text-white m-2">Submit</button>
        </div>
      </form>
    </main>
  )
}