import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    }).catch(() => {
      sendMessage(setErrorMessage, 'Cannot fetch phonebook data', 3000);
    })
  }, []);

  // HANDLING STATE - text input for name and number
  const handleChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name]: event.target.value,
    });
  };

  // FORM SUBMIT - new user
  const handleSubmit = (event) => {
    event.preventDefault();

    // CHECK if user input is valid
    if (!newPerson.name || !newPerson.number) {
      return alert("Please input a name and number");
    }

    // CHECK if user is already in phonebook
    let userInPhonebook = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    if (userInPhonebook) {
      if (
        window.confirm(
          `${userInPhonebook.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(userInPhonebook.id, newPerson)
          .then((updatedUser) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedUser.id ? updatedUser : person
              )
            );
            setNewPerson({ name: "", number: "" });
            sendMessage(setSuccessMessage, `${userInPhonebook.name} has been updated`, 3000)
          })
          .catch(() => {
            // Removes user from state
            setPersons(
              persons.filter((person) => person.id !== userInPhonebook.id)
            );
            sendMessage(setErrorMessage, `${userInPhonebook.name} is not a valid user`, 3000);
          });
      }
      return;
    }

    // ADD user to the db
    personService
      .create({ name: newPerson.name, number: newPerson.number })
      .then((newPerson) => {
        // Updates persons state to render the new person to the screen
        setPersons(persons.concat(newPerson));
        // RESET text input
        setNewPerson({ name: "", number: "" });
        // Renders Success
        sendMessage(setSuccessMessage, `${newPerson.name} has been added`, 3000);
      })
      .catch(() => {
        // Renders Error
        sendMessage(setErrorMessage, `unable to add ${newPerson.name} to the database`, 3000);
      });
  };

  // HANDLE filtering displayed persons
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  // HANDLE deleting a user
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .deleteUser(id)
        .then(() => {
          // Removes user from state
          setPersons(persons.filter((person) => person.id !== id));
          // Renders success message
          sendMessage(setSuccessMessage, `${name} has been deleted`, 3000)
        })
        .catch(() => {
          // Remove invalid user from state
          setPersons(persons.filter((person) => person.id !== id));
          // Renders error message
          sendMessage(setErrorMessage, `${name} is already not in the phonebook`, 3000)
        });
    }
  };
  const sendMessage = (setMessageState, message, timeoutDuration) => {
    setMessageState(message);
    setTimeout(() => {
      setMessageState(null);
    }, timeoutDuration);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        newPerson={newPerson}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
