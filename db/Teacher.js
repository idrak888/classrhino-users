const {mongoose} = require('./mongoose');

const Teacher = mongoose.model('Teacher', {
    _id: String,
	name: String,
    gender: String,
    curriculums: Array,
    subjects: Array,
    lanugages: Array,
    rate: Number,
    location: {
        country: String,
        timezone: String
	},
    email: String,
    profilePic: String,
    certificates: String
});

module.exports = {
	Teacher
}