const express = require('express');

const notes = require('./notes');
const apiNotes = require('./api/notes');

const app = express();

app.use('/notes', notes);
app.use('/api/notes', apiNotes);

module.exports = app;
