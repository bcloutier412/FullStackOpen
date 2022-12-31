import { useState } from "react";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: '949-874-3305' }]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

  const handleChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // CHECK if user input is valid
    if (!newPerson.name || !newPerson.number) {
      return alert("Please input a name and number")
    } 
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
      ...
    </div>
  );
};

export default App;
