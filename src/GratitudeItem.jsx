import React from "react";

const GratitudeItem = ({ index, item, handleDelete }) => {
  return (
    <div key={index}>
      <div className="gratitude-item">
        <div>{item.text}</div>
        <footer className="note-footer">
          <small>{item.date}</small>
          <i
            className="fas fa-trash-alt"
            onClick={() => handleDelete(item.id)}
          ></i>
        </footer>
      </div>
    </div>
  );
};

export default GratitudeItem;
