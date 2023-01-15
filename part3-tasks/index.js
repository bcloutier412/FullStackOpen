const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Brandon Cloutier",
    number: "949-874-3305",
  },
  {
    id: 2,
    name: "Aishlinn Lee",
    number: "949-331-2082",
  },
  {
    id: 3,
    name: "David Cloutier",
    number: "949-412-6424",
  },
];
app.get("/", (request, response) => {
  response.send("hello");
});

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  // Check if the user exists
  if (person) {
    response.send(person);
  } else {
    response.status(404).end(); 
  }
});
app.get("/info", (request, response) => {
  response.send(
    `<div>Phonebook has infor for ${persons.length} people</div>
    <br>
    <div>${new Date()}</div>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    // fail request if missing
    if (!body.name || !body.number) {
        return response.status(400).send({ error: 'missing body content'})
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).send({ error: 'name must be unique'})
    }
    const person = {
        id: Math.max(...persons.map(person => person.id)) + 1,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);

    response.send(person)
})
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
