import React from "react";
import "./EditModal.css";

const EditModal = () => {
  return (
    <div className="editModal">
      <div className="form-group">
        <label for="exampleFormControlTextarea1"></label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
    </div>
  );
};

export default EditModal;
