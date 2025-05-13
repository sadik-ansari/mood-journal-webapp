const JournalEntry = require('../models/JournalEntries');

const createJournalEntry = async (req,res) => {
    const {title, mood, content} = req.body;
    console.log("title is: ",title)
    console.log("mood is: ",mood);
    console.log("content is: ",content);

    try {
        const newEntry = await JournalEntry({userId: req.user.id,title,mood,content});
        console.log(newEntry)
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).send('Error creating entry');
    }
}
const getJournalEntry = async (req,res) => {
    try {
        const entries = await JournalEntry.find({userId: req.user.id});
        res.json(entries)
    } catch (error) {
        console.error("Error fetching entries:", error.message);
        res.status(500).send('Error retrieving entries');
    }

}
const updateJournalEntry = async (req,res) => {
    const {id} = req.params
    const {title,mood,content} = req.body;

    try {
        const entry = await JournalEntry.findByIdAndUpdate(id,{title,content,mood},{ new: true });

        if(!entry){
            return res.status(403).send('Unauthorized')
        }

        res.json(entry);

    } catch (error) {
        console.error("Error updating entry:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const deleteJournalEntry = async (req,res) => {
    const {id} = req.params;

    try {
        const deleted = await JournalEntry.findByIdAndDelete(id);

        if(!deleted){
            return res.status()
        }

        res.json(deleted);

    } catch (error) {
        console.error("Error finding entry:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {createJournalEntry, getJournalEntry, updateJournalEntry, deleteJournalEntry}