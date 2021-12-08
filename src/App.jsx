import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import GratitudeItem from "./GratitudeItem";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL85oyvwM0v1asFDoSBvE4Ic_QqCXzH3E",
  authDomain: "rain-db.firebaseapp.com",
  projectId: "rain-db",
  storageBucket: "rain-db.appspot.com",
  messagingSenderId: "542470929269",
  appId: "1:542470929269:web:6ff292ea412271f4f8b13c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Example Test
async function getgratitudeItems(db) {
  const gratitudeItemsCol = collection(db, "gratitudeItems");
  const gratitudeItemSnapshot = await getDocs(gratitudeItemsCol);
  const gratitudeItemList = gratitudeItemSnapshot.docs.map((doc) => doc.data());
  return gratitudeItemList;
}

function App() {
  const [currentItem, setCurrentItem] = useState("");

  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log("useEffect running");
    getgratitudeItems(db).then((items) => setItems(items));
  }, []);

  function handleSubmit(event) {
    console.log("handleSubmit running");
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

    // Store the new gratitude item in firestore DB

    setDoc(doc(db, "gratitudeItems", newNote.id), newNote);
  }

  function handleChange(event) {
    setCurrentItem(event.target.value);
  }

  function handleDelete(id) {
    const updatedItems = items.filter(function (item) {
      return item.id !== id;
    });
    setItems(updatedItems);

    deleteDoc(doc(db, "gratitudeItems", id));
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
