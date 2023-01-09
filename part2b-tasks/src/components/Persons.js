import React from "react";

const Persons = ({ persons, filter, handleDelete }) => {

    let filteredUsers;
    if (filter) {
        filteredUsers = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    }

    return (
        <div>
            {!filter
            ? persons.map((person) => <Person key={person.id} person={person} handleDelete={handleDelete}/>)
            : filteredUsers.map((person) => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
        </div>
    )
}

const Person = ({ person, handleDelete }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>

    )}

export default Persons