require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const Person = require("./models/person");

/*
 * MIDDLEWARE
 */
const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
};

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static("build"));

/*
 * ROUTES
 */
app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((people) => {
			response.send(people);
		})
		.catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	console.log("here");
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

app.post("/api/persons", (request, response, next) => {
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
	Person.find({ name: { $eq: body.name } })
		.then((personInDatabase) => {
			console.log(personInDatabase);
			if (personInDatabase.length > 0) {
				return response
					.status(404)
					.json({ message: "Person is already in the database" });
			} else {
				const person = new Person({
					name: body.name,
					number: body.number,
				});

				person
					.save()
					.then((newPerson) => {
						response.send(newPerson);
					})
					.catch((error) => next(error));
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	const id = request.params.id;

	Person.findByIdAndRemove(id)
		.then(() => {
			response.status(204).send({ message: "User deleted" });
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body;
	const id = request.params.id;

	// Check if its a valid user
	if (!name || !number) {
		return response.status(404).send({ message: "invalid user " });
	}

	Person.findByIdAndUpdate(
		id,
		{ name, number },
		{ new: true, runValidators: true, context: "query" }
	)
		.then((newPerson) => {
			if (newPerson) {
				response.send(newPerson);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

/*
 * ERROR HANDLING MIDDLEWARE
 */
app.use(unknownEndpoint);
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server up on port: ${PORT}`);
});
