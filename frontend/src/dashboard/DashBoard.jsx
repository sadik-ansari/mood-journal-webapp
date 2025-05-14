  import React, { useState, useEffect, use } from "react";
  import "./DashBoard.css";
  import list from "../assets/assests";
  import AddEntries from "../addentries/AddEntries";
  import ShowEntries from "../showentries/ShowEntries";
  import EditEntry from "../editentries/EditEntries";
  import axios from "axios";
  import Navbar from "../navbar/NavBar";

  const DashBoard = () => {
    const [entries, setEntries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [showEntry, setShowEntry] = useState(null);
    const [selectMood, setSelectMood] = useState("all");
    const [showEditPop, setShowEditPop] = useState(false);

    const API_BASE_URL = import.meta.env  .REACT_APP_API_BASE_URL || "https://mood-journal-webapp-backend.onrender.com";

   
      useEffect(() => {
        const fetchEntries = async () =>{
          try {
            
            const response = await axios.get(`${API_BASE_URL}/api/entries`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
              });
              setEntries(response.data)
          } catch (error) {
              console.error("Error fetching entries:", error);
          }
        };
        fetchEntries();
      },[])
    

    const handleAddEntries = () => {
      setShowForm(true);
    }

    const handleAddedEntries = (newEntry) => {
      setEntries((prevEntries) => [...prevEntries, newEntry]);
    }

    const handleShowEntry = (entry) => {
      setShowEntry(entry)
    }

    const handleEditEntry = (entry) => {
      setSelectedEntry(entry)
      setShowEditPop(true)
    }

    const handleUpdateEntry = (updatedEntry) => {
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry
        )
    );
    }

    const handleDelete = async (entry) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/entries/${entry._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            });
            console.log(response)
            setEntries((prevEntries) => prevEntries.filter((e) => e._id !== entry._id));
      } catch (error) {
        console.error("Error deleting entries:", error);
      }
    }

    const filterEntriesByMood = Array.isArray(entries)
  ? selectMood === "all"
    ? entries
    : entries.filter((entry) => entry.mood === selectMood)
  : [];

      return (
      <>
        <div className="list add flex-col">
          <div className="display-none">
        
          </div>
          <div className="list-new-find">
            <div className="list-new-entries">
              <button type="button" className="new-entries-btn" onClick={handleAddEntries}>New Entries</button>
            </div>
            <div className="list-find-entries">
              <select id="moods"
              value={selectMood}
              onChange={(e) => setSelectMood(e.target.value)} >
                <option value="all">All</option>
                <option value="Normal">Normal</option>
                <option value="Happy">Happy</option>
                <option value="Exhausted">Exhausted</option>
                <option value="Inspired">Inspired</option>
                <option value="Calm">Calm</option>
                <option value="Annoyed">Annoyed</option>
              </select>
            </div>
          </div>
          {showForm && <AddEntries onClose={() => setShowForm(false)} onAddedEntry={handleAddedEntries}/>}
          
          <div className="list-table">
            <div className="list-table-formate title">
              <b>Title</b>
              <b>Content</b>
              <b>Mood</b>
              <b>Edit</b>
              <b>Delete</b>
            </div>
          </div>
          <div className="">
            {filterEntriesByMood.map((entry, index) => {
            return(
                <div
                  className="list-entries"
                  id="list-entries-center"
                  key={index}
                  onClick={() => handleShowEntry(entry)}
                >
                  <p>{entry.title}</p>
                  <p>{entry.content}</p>
                  <p className="list-entries-center">{entry.mood}</p>
                  <button type="button" className="edit-btn" onClick={(e) => {e.stopPropagation();
                    handleEditEntry(entry)}}>
                    <i className="fa-solid fa-pen-to-square"></i>Edit
                  </button>
                  <button type="button" className="delete-btn" onClick={(e) => {e.stopPropagation();
                    handleDelete(entry)}}>
                    <i className="fa-solid fa-trash-can"></i>Delete
                  </button>
                </div>
            )
            })}
            {showEntry && <ShowEntries entry={showEntry} onClose={() => setShowEntry(null)}/>}
            {showEditPop && <EditEntry entry={selectedEntry} onClose={() => setShowEditPop(false)} onUpdate={handleUpdateEntry}/>}
          </div>
        </div>
      </>
    );
  };

  export default DashBoard;
