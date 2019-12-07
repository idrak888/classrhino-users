const {mongoose} = require('./mongoose');

const Teacher = mongoose.model('Teacher', {
    _id: String,
	name: String,
    gender: String,
    email: String,
    profilePic: String,
    certificates: Array,
    workingDays: Array,
    approved: Boolean,
    curriculums: Array,
    subjects: Array,
    languages: Array,
    rate: Number,
    location: {
        country: String,
        city: Object,
	    flag: String
	},
    upcomingClasses: Array,
    completedClasses: Array
});

module.exports = {
	Teacher
}
