const {mongoose} = require('./mongoose');

const Teacher = mongoose.model('Teacher', {
    _id: String,
	name: String,
    gender: String,
    approved: Boolean,
    curriculums: Array,
    subjects: Array,
    languages: Array,
    rate: Number,
    location: {
        country: String,
        timezone: String,
	flag: String
	},
    email: String,
    profilePic: String,
    certificates: Array,
    workingDays: Array
});

module.exports = {
	Teacher
}
