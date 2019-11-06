const {mongoose} = require('./mongoose');

const Student = mongoose.model('Student', {
    _id: String,
	name: String,
    gender: String,
	age: Number,
    curriculum: String,
	grade: Number,
    location: {
        country: String,
        timezone: String
	},
	email: String
});

module.exports = {
	Student
}