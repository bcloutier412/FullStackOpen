const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
const URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(URL)
	.then(() => {
		console.log("connected to mongoDB");
	}).catch(error => {
		console.log("error connecting to MongoDB:", error.message);
	});

// The structure of the data
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function(v) {
				return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required: true
	}
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports =  mongoose.model("Person", personSchema);