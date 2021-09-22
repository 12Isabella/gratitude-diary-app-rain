import React from "react";

const GratitudeItem = ({ index, item }) => {
  const itemObject = JSON.parse(item);
  return (
    <div key={index}>
      <div className="gratitude-item">
        <div>{itemObject.text}</div>
        <footer className="note-footer">
          <small>{itemObject.date}</small>
          <i className="fas fa-trash-alt"></i>
        </footer>
      </div>
    </div>
  );
};

export default GratitudeItem;
