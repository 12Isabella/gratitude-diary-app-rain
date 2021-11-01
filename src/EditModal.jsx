import React from "react";
import "./EditModal.css";
import { useState } from "react";

const EditModal = (props) => {
  const [editInput, setEditInput] = useState(null);

  function handleChange(event) {
    setEditInput(event.target.value);
  }

  function saveEdit(event, id) {
    event.preventDefault();
    // set EditInput in local storage
    console.log(id);
    //Items + updated Item...???
    // 1. How do I get Items form App.js?
    // 2. How do I get the edited Item to be edited?
    //handleEdit (id)
    // set Edit Input as content of GratitudeItem
  }

  return (
    <div className="editModal">
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1"></label>
        <textarea
          onChange={handleChange}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <i
          className="fas fa-save icon"
          onClick={(event) => saveEdit(event, props.id)}
        ></i>
      </div>
    </div>
  );
};

export default EditModal;
