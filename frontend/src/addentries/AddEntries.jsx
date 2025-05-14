import React, { useState } from 'react'
import "./AddEntries.css"
import axios from 'axios';

const AddEntries = ({onClose,onAddedEntry}) => {
  const[formData, setFormData] = useState({
    title:"",
    mood:"neutral",
    content: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  };

  const handleSubmit = async () => {
    onClose()
    if(formData.title || formData.content){
      try {
        const response = await axios.post("https://mood-journal-webapp-backend.onrender.com/api/entries", // Updated URL with /api
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
            },
          });
          console.log(response);
          onAddedEntry(response.data)
      } catch (error) {
        console.error("Error adding entry:", error);
        alert("Error adding entry. Please check your credentials.");
      }
    }
  }
  return (
     <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Add New Entry</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <select name="mood" value={formData.mood} onChange={handleChange}>
          <option value="happy">happy</option>
          <option value="neutral">neutral</option>
          <option value="sad">sad</option>
        </select>
        <textarea
          name="content"
          placeholder="Write your content here..."
          rows="5"
          value={formData.content} 
          onChange={handleChange}
        ></textarea>
        <button className="add-btn" onClick={handleSubmit}>
          Add
        </button>
      </div>
    
    </div>
  )
}

export default AddEntries
