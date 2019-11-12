const express = require('express');
const bodyParser = require('body-parser');
const { Student } = require('./db/Student');
const { Teacher } = require('./db/Teacher');

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

app.get('/teachers', (req, res) => {
	Teacher.find().then(doc => {
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
	}).catch(e => {
        res.send(e);
    });
});

app.post("/teacher", (req, res) => {
	var NewTeacher = new Teacher({
        _id: req.body.uid,
		name: req.body.name,
		gender: req.body.gender,
		curriculums: req.body.curriculums,
		subjects: req.body.subjects,
		lanugages: req.body.lanugages,
		rate: req.body.rate,
		location: {
			country: req.body.country,
			timezone: req.body.timezone
		},
		email: req.body.email,
		profilePic: req.body.profilePic,
		certificates: req.body.certificates
	});

	NewTeacher.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
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

app.delete("/teachers", (req, res) => {
	Teacher.remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete("/teachers/:id", (req, res) => {
	var _id = req.params.id;

	Teacher.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});