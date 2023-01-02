const Persons = ({ persons, filter }) => {

    let filteredUsers;
    if (filter) {
        filteredUsers = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    }
    
    return (
        <div>
            {!filter
            ? persons.map((person) => <Person key={person.name} person={person} />)
            : filteredUsers.map((person) => <Person key={person.name} person={person} />)}
        </div>
    )
}

const Person = ({ person }) => <div>{person.name} {person.number}</div>

export default Persons