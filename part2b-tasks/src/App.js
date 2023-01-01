import userEvent from "@testing-library/user-event";
import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: '949-874-3305' }]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

  // HANDLING STATE - text input for name and number
  const handleChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name] : event.target.value
    })
  }

  // FORM SUBMIT - new user
  const handleSubmit = (e) => {
    e.preventDefault()

    // CHECK if user input is valid
    if (!newPerson.name || !newPerson.number) {
      return alert("Please input a name and number")
    } 

    // CHECK if user is already in phonebook
    if(persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      return alert(`${newPerson.name} already exists`)
    }

    // ADD user to the list of persons
    setPersons(persons.concat({name: newPerson.name, number: newPerson.number}))

    // RESET text input
    setNewPerson({name: '', number: ''})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm
        newPerson={newPerson}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
        <Persons persons={persons}/>
    </div>
  );
};

export default App;
