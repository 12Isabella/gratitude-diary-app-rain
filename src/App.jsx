import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import GratitudeItem from "./GratitudeItem";

function App() {
  const [currentItem, setCurrentItem] = useState("");

  const [items, setItems] = useState(function () {
    const itemsJson = window.localStorage.getItem("gratitudeItems") || "[]";

    // parse the JSON into the list of items
    return JSON.parse(itemsJson);
  });

  function handleSubmit(event) {
    event.preventDefault();
    const date = new Date();

    const newNote = {
      id: nanoid(),
      text: currentItem,
      date: date.toLocaleDateString(),
    };

    const updatedItems = [...items, newNote];

    setItems(updatedItems);

    setCurrentItem("");

    // Store the updated list in localStorage. Since localStorage can only store
    // strings, we encode the array of objects as JSON before storing them.
    const updatedItemsJson = JSON.stringify(updatedItems);
    window.localStorage.setItem("gratitudeItems", updatedItemsJson);
  }

  function handleChange(event) {
    setCurrentItem(event.target.value);
  }

  function handleDelete(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const updatedItemsJson = JSON.stringify(updatedItems);
    window.localStorage.setItem("gratitudeItems", updatedItemsJson);
  }

  return (
    <div className="App">
      <div className="container mt-3">
        <h1 className="mt-3 mb-5">What are you grateful for today?</h1>
        <div className="input-group mb-5 gratitude-input ">
          <div className="input-group-prepend "></div>
          <form id="input-form" onSubmit={handleSubmit}>
            <input
              value={currentItem}
              placeholder="I am happy and grateful for..."
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              autoFocus="on"
              onChange={handleChange}
            />
          </form>
        </div>

        <div className="gratitude-item-list">
          {items.map((item, index) => {
            return (
              <GratitudeItem
                key={index}
                item={item}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
