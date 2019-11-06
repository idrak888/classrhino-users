const express = require('express');
const bodyParser = require('body-parser');
const {Student} = require('./db/Student');

const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('Hello world');
});

app.get('/students', (req, res) => {
	Student.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.post("/students", (req, res) => {
	var NewStudent = new Student({
        _id: req.body.uid,
		name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        curriculum: req.body.curriculum,
        grade: req.body.grade,
        location: {
            country: req.body.country,
            timezone: req.body.timezone
        },
        email: req.body.email
	});

	NewStudent.save().then((doc) => {
		res.send(doc);
	});
});

app.delete("/students", (req, res) => {
	Student.remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete("/students/:id", (req, res) => {
	var _id = req.params.id;

	Student.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});