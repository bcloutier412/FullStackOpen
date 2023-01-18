const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

persons = [
]




app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.send(person)
    } else {
        response.status(404).end();
    }
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
    return maxId + 1;
  };
app.post('/api/persons', (request, response) => {
    const body = request.body
    // Check valid input
    if (!body.name || !body.number) {
        return response.status(404).send({ message: 'Please give a valid input or a field is missing'})
    }

    // Check if user is alredy in the phonebook
    if (persons.find((currentPerson) => body.name === currentPerson.name)) {
        return response.status(404).send({ message: 'Person is already added '})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    // Add user to the phonebook
    persons = persons.concat(person)

    // Send new user back
    response.send(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);

    persons = persons.filter(person => person.id !== id);

    response.status(204).send({ message: "User deleted"})
})

app.put("/api/persons/:id" , (request, response) => {
    const body = request.body
    const id = Number(request.params.id);
    
    // Check if its a valid user
    if (!body.name || !body.number) {
        response.status(404).send({ message: "invalid user "})
    }

    currentPerson = persons.find(person => person.id === id);
    if (currentPerson) {
        currentPerson.number = body.number;
        persons = persons.map(person => person.id === id ? currentPerson : person);
    } else {
        return response.status(404).send({ message: "not a user"})
    }

    response.send(currentPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server up on port: ${PORT}`)
});