import React from "react";
import "./ShowEntries.css";

const ShowEntries = ({ entry, onClose }) => {
  if (!entry) return null; 

  return (
    <div className="entry-popup">
      <div className="entry-popup-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2><b>Title: </b>{entry.title || "No title"}</h2>
        <p><b>Content: </b> {entry.content || "No content available"}</p>
        <p><b>Mood: </b> {entry.mood || "No mood specified"}</p>
      </div>
    </div>
  );
};

export default ShowEntries;
