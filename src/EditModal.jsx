import React from "react";
import "./EditModal.css";
import { useState } from "react";

const EditModal = (props) => {
  const [editInput, setEditInput] = useState(null);

  function handleChange(event) {
    setEditInput(event.target.value);
  }

  function saveEdit(event, id, items) {
    event.preventDefault();
    // set EditInput in local storage = general idea
    console.log(id);
    console.log(items);

    const newItemList = items.map((gratitudeItem) =>
      gratitudeItem.id === id
        ? { ...gratitudeItem, text: editInput }
        : gratitudeItem
    );
    console.log(newItemList);
    props.updateGratitudeItems(newItemList);
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
          onClick={(event) => saveEdit(event, props.id, props.items)}
        ></i>
        <i
          className="fas fa-times-circle icon"
          onClick={() => props.closeModal()}
        ></i>
      </div>
    </div>
  );
};

export default EditModal;
