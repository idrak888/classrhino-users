const {mongoose} = require('./mongoose');

const Student = mongoose.model('Student', {
    _id: String,
	name: String,
    gender: String,
	email: String,
	age: Number,
	grade: Number,
    location: {
        country: String,
        city: Object
    },
    upcomingClasses: Array,
    completedClasses: Array
});

module.exports = {
	Student
}