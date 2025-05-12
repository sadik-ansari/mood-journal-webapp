const express = require('express');
const authMiddleware = require('../middlewares/AuthMiddlewares');
const router = express.Router();

const {createJournalEntry, getJournalEntry, updateJournalEntry, deleteJournalEntry} = require('../controllers/JournalController');

router.post('/entries',authMiddleware, createJournalEntry);
router.get('/entries',authMiddleware, getJournalEntry);
router.put('/entries/:id',authMiddleware, updateJournalEntry);
router.delete('/entries/:id',authMiddleware, deleteJournalEntry);

module.exports = router;
