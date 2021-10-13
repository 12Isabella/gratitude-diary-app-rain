import React from "react";

const GratitudeItem = ({ index, item, handleDelete, handleEdit }) => {
  return (
    <div key={index}>
      <div className="gratitude-item">
        <div>{item.text}</div>
        <footer className="note-footer">
          <small className="date">{item.date}</small>
          <i
            className="fas fa-edit icon me-1"
            onClick={function () {
              handleEdit(item.id);
            }}
          ></i>
          <i
            className="fas fa-trash-alt icon"
            onClick={function () {
              handleDelete(item.id);
            }}
          ></i>
        </footer>
      </div>
    </div>
  );
};

export default GratitudeItem;
