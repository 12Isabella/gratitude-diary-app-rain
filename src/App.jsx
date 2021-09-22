import { useState } from "react";
import "./App.css";
import GratitudeItem from "./GratitudeItem";

function App() {
  const [currentItem, setCurrentItem] = useState("");

  const [items, setItems] = useState(function () {
    const itemsJson = window.localStorage.getItem("gratitudeItems") || "[]";

    return [itemsJson];
  });

  function handleSubmit(event) {
    event.preventDefault();
    const date = new Date();
    const newNote = {
      id: 1,
      text: currentItem,
      date: date.toLocaleDateString(),
    };
    const newNoteString = JSON.stringify(newNote);
    const updatedItems = [...items, newNoteString];

    setItems(updatedItems);
    setCurrentItem("");

    window.localStorage.setItem("gratitudeItems", updatedItems);
  }

  function handleChange(event) {
    setCurrentItem(event.target.value);
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
            return <GratitudeItem key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
