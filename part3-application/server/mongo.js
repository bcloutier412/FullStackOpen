const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Please input valid arguments: node.js mongo.js [password] or node.js mongo.js [password] [name] [number]")
    process.exit(1);
}

const password = process.argv[2];

const URL = `mongodb+srv://bcloutier412:${password}@cluster0.wgb28ql.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(URL)

// The structure of the data
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(phonebook => {
        console.log("phonebook:")
        phonebook.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(0);
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
        process.exit(0);
    })
} else {
    console.log('please provide a valid input')
    mongoose.connection.close();
    process.exit(1);
}