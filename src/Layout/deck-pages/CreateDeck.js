import { render } from "@testing-library/react";
import React from "react"
import { useHistory } from "react-router-dom"
import {createDeck} from "../../utils/api"
import UserRouteHelper from "../common/UserRouteHelper";



export default function CreateDeck() {
  const history = useHistory()

  // on submission, create a deck using the values in the input fields, and then return the user to the home page
  async function submitHandler(event) {
    event.preventDefault();
    const input = event.target.querySelector("input")
    const textArea = event.target.querySelector("textarea")
    await createDeck({name: `${input.value}`, description: `${textArea.value}`})
    history.push("/")
  }
  
  // JSX containing Route Helper and form
  return (
    <main>
      <div className="text-center">
          <UserRouteHelper />
      </div>
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