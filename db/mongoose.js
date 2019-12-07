const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:class123@ds241258.mlab.com:41258/classrhino-users');

module.exports = {
	mongoose
}