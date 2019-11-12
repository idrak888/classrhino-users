const {mongoose} = require('./mongoose');

const Teacher = mongoose.model('Teacher', {
    _id: String,
	name: String,
    gender: String,
    curriculums: Array,
    subjects: Array,
    languages: Array,
    rate: Number,
    location: {
        country: String,
        timezone: String
	},
    email: String,
    profilePic: String,
    certificates: Array
});

module.exports = {
	Teacher
}
