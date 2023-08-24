const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));


app.get('/api/notes', (req, res) => {
  const dbPath = path.join(__dirname, '..', 'db', 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  res.json(data);
});

app.post('/api/notes', (req, res) => {
  const dbPath = path.join(__dirname, '..', 'db', 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    text: req.body.text,
  };

  data.push(newNote);

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  res.json(newNote);
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
