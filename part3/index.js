require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')
const Note = require('./models/note')

app.use(express.json());
app.use(cors())
app.use(express.static('build'))


app.get("/api/notes", (req, res) => {
  Note.find({}).then(result => {
    res.send(result);
  })
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  // Check that the body has the content
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // Create a new note
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  // Add the new note to the notes array
  notes = notes.concat(note);

  // respond with the new note
  response.json(note);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
