import axios from "axios";
import "./EditEntries.css";
// EditEntry.jsx
import React, { useState } from "react";

const EditEntry = ({ entry, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: entry.title,
    mood: entry.mood,
    content: entry.content,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const API_BASE_URL = import.meta.env  .REACT_APP_API_BASE_URL || "http://localhost:5000";
    console.log("Entry type:", typeof entry);
    console.log("Entry object:", entry);
    console.log("entry id is: ",entry.userId)
    try {
      const response = await axios.put(`${API_BASE_URL}/api/entries/${entry._id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
          },
        });
        console.log(response)
        onUpdate(response.data); // Update UI after successful update
        onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("Failed to update entry");
    }

  };

  return (
    <div className="edit-popup">
      <div className="popup-content">
        <h2>Edit Entry</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </label>
        <label>
          Mood:
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
          >
            <option value="happy">happy</option>
            <option value="neutral">neutral</option>
            <option value="sad">sad</option>
          </select>
        </label>
        <label>
          Content:
          <textarea
            value={formData.content}
            name="content"
            onChange={handleChange}
            placeholder="Enter content"
          />
        </label>
        
        <div className="popup-actions">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditEntry;
