const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://bcloutier412:${password}@cluster0.wgb28ql.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

// The structure of the data
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

//using mongoose.model returns a constructor that we can use to create note objects
const Note = mongoose.model('Note', noteSchema)

// //creating a new note object from the Note contructor.
// const note = new Note({
//     content: 'Html is easy',
//     date: new Date(),
//     important: true,
// })

// note.save().then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })

// Finding data in the database
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })