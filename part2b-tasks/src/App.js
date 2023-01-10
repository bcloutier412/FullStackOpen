import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
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
    )
    if (userInPhonebook) {
      if (window.confirm(`${userInPhonebook.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(userInPhonebook.id, newPerson)
          .then((updatedUser) => {
            setPersons(persons.map(person => person.id === updatedUser.id ? updatedUser : person))
            setNewPerson({ name: "", number: "" });
      })
      }
      return 
    }

    // ADD user to the db
    personService
      .create({ name: newPerson.name, number: newPerson.number })
      .then((newPerson) => {
        // Updates persons state to render the new person to the screen
        setPersons(persons.concat(newPerson));
        // RESET text input
        setNewPerson({ name: "", number: "" });
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
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch(() => {
        alert('Invalid User')
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

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
