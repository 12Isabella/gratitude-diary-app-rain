import { useState } from "react";
import "./App.css";

function App() {
  const [currentItem, setCurrentItem] = useState("");
  const [items, setItems] = useState(function () {
    const itemsJson = window.localStorage.getItem("gratitudeItems") || "[]";
    return JSON.parse(itemsJson);
  });

  function handleSubmit(event) {
    event.preventDefault();
    const updatedItems = items.concat(currentItem);
    setItems(updatedItems);
    setCurrentItem("");
    const itemsJson = JSON.stringify(updatedItems);
    window.localStorage.setItem("gratitudeItems", itemsJson);
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
          {items.map(function (item, index) {
            return (
              <div key={index}>
                <div className="gratitude-item">
                  <div>{item}</div>
                  <footer className="note-footer">
                    <small>22/09/2021</small>
                    <i className="fas fa-trash-alt"></i>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
