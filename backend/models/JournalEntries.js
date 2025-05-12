const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    mood: {type: String, enum: ['happy', 'neutral', 'sad']},
    content: {type: String, required: true},
    Date: {type: Date, default: Date.now}
})

const JournalSchema = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = JournalSchema;