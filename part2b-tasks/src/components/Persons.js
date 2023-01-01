const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map((person) => <Person key={person.name} person={person} />)}
        </div>
    )
}

const Person = ({ person }) => <div>{person.name} {person.number}</div>

export default Persons