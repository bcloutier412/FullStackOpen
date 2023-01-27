require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

persons = [];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.send(people);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};
app.post("/api/persons", (request, response) => {
  const body = request.body;
  // Check valid input
  if (!body.name || !body.number) {
    return response
      .status(404)
      .send({ message: "Please give a valid input or a field is missing" });
  }

  /* Check if user is alredy in the phonebook
   * If user is already in the phonebook then we will return an error to the client
   * If it is a new user then we will save the new user to the database
   * we had to put everything into the .then because we need to wait for the database response before proceeding
   */
  Person.find({ name: { $eq: body.name } }).then((personInDatabase) => {
    if (personInDatabase.length > 0) {
        return response.status(404).json({ message: `Person is already in the database` });
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
          });
        
          person.save().then((newPerson) => {
            response.send(newPerson);
          });
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);

  response.status(204).send({ message: "User deleted" });
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;
  const id = Number(request.params.id);

  // Check if its a valid user
  if (!body.name || !body.number) {
    response.status(404).send({ message: "invalid user " });
  }

  currentPerson = persons.find((person) => person.id === id);
  if (currentPerson) {
    currentPerson.number = body.number;
    persons = persons.map((person) =>
      person.id === id ? currentPerson : person
    );
  } else {
    return response.status(404).send({ message: "not a user" });
  }

  response.send(currentPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server up on port: ${PORT}`);
});
