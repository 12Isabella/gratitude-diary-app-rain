import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import GratitudeItem from "./GratitudeItem";
import EditModal from "./EditModal";
import LogIn from "./LogIn";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL85oyvwM0v1asFDoSBvE4Ic_QqCXzH3E",
  authDomain: "rain-db.firebaseapp.com",
  projectId: "rain-db",
  storageBucket: "rain-db.appspot.com",
  messagingSenderId: "542470929269",
  appId: "1:542470929269:web:6ff292ea412271f4f8b13c",
};

const collectionName = "gratitudeItems";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

function App() {
  const [currentText, setCurrentText] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  onAuthStateChanged(auth, (user) => setUser(user));

  useEffect(() => {
    if (user != null) {
      getgratitudeItems(db, user.uid).then((items) => {
        setItems(items);
      });
    }
  }, [user]);
  const [editModal, setEditModal] = useState({ open: false, id: 0 });

  function handleSignUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("signed in", userCredential);
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      // handle fail not implemented yet
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setErrorMessage("You're gonna need a stronger password! 🙄");

            break;
          case "auth/email-already-in-use":
            setErrorMessage("We already have a user for this email 😏");
            break;
          default:
            console.log("error code", error.code);
            setErrorMessage("Sorry, something went wrong.");
        }
      });
  }

  function handleLogIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      })
      // handle fail not implemented yet
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMessage("You typed the wrong password 🙄");

            break;
          case "auth/user-not-found":
            setErrorMessage("This is not your e-mail adress 😏");
            break;
          default:
            console.log("error code", error.code);
            setErrorMessage("Sorry, something went wrong.");
        }
      });
  }

  async function getgratitudeItems(db, userID) {
    const gratitudeItemsCol = collection(db, collectionName);
    const q = query(gratitudeItemsCol, where("uid", "==", userID));
    const gratitudeItemSnapshot = await getDocs(q);
    const gratitudeItemList = gratitudeItemSnapshot.docs.map((doc) =>
      doc.data()
    );
    return gratitudeItemList;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const date = new Date();

    const newNote = {
      id: nanoid(),
      text: currentText,
      date: date.toLocaleDateString(),
      uid: user.uid,
    };

    const updatedItems = [...items, newNote];

    setItems(updatedItems);

    setCurrentText("");

    // Store the new gratitude item in firestore DB

    setDoc(doc(db, collectionName, newNote.id), newNote);
  }

  function handleChange(event) {
    setCurrentText(event.target.value);
  }

  function handleEdit(id) {
    setEditModal({ open: true, id: id });
  }

  function closeModal() {
    setEditModal({ open: false, id: 0 });
  }

  const updateGratitudeItems = (gratitudeItems, id) => {
    setItems(gratitudeItems);
    // update item in firebase
    const updatedItem = gratitudeItems.find(
      (gratitudeItem) => gratitudeItem.id === id
    );
    setDoc(doc(db, collectionName, id), updatedItem);
  };

  function handleDelete(id) {
    const updatedItems = items.filter(function (item) {
      return item.id !== id;
    });
    setItems(updatedItems);

    deleteDoc(doc(db, collectionName, id));
  }

  const modal = editModal.open ? (
    <EditModal
      id={editModal.id}
      items={items}
      updateGratitudeItems={updateGratitudeItems}
      closeModal={closeModal}
    />
  ) : (
    <React.Fragment />
  );

  return (
    <div className="App">
      <div className="container mt-3">
        {modal}
        {user === null ? (
          <LogIn
            signUp={handleSignUp}
            logIn={handleLogIn}
            errorMessage={errorMessage}
          />
        ) : (
          <React.Fragment />
        )}
        {editModal.open ? (
          <EditModal
            id={editModal.id}
            items={items}
            updateGratitudeItems={updateGratitudeItems}
            closeModal={closeModal}
          />
        ) : (
          <React.Fragment />
        )}

        <h1 className="mt-3 mb-5">What are you grateful for today?</h1>
        <div className="input-group mb-5 gratitude-input ">
          <div className="input-group-prepend "></div>
          <form id="input-form" onSubmit={handleSubmit}>
            <input
              value={currentText}
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
                onEdit={handleEdit}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
