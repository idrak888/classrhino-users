const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Student } = require('./db/Student');
const { Teacher } = require('./db/Teacher');

const app = express();
var port = process.env.PORT || 3100;

const pathToPublic = path.join(__dirname, './public');
app.use(express.static(pathToPublic));

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

app.get("/students", (req, res) => {
	Student.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get("/students/:id", (req, res) => {
	var _id = req.params.id;

	Student.find({_id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.get("/teachers/limit/:limit", (req, res) => {
	var limit = req.params.limit;

	Teacher.find().limit(parseInt(limit)).then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get("/teachers/search/:keywords", (req, res) => {
	var keywords = req.params.keywords;

	Teacher.find().then(doc => {
		var filteredTeachers = doc.filter(teacher => teacher.subjects.indexOf(keywords) != -1 || teacher.curriculums.indexOf(keywords) != -1);
		res.send(filteredTeachers);
    }).catch(e => {
		res.send(e);
	});
});

app.post("/teachers/filter", (req, res) => {
 	Teacher.find().then(doc => {
//  		var filteredTeachers = doc.filter(teacher => {
//  			return (
// 				(req.body.subject == '' || teacher.subjects.indexOf(req.body.subject) != -1) &&
//  				(req.body.curriculum == '' || teacher.curriculums.indexOf(req.body.curriculum) != -1) &&
//  				(req.body.gender == '' || teacher.gender == req.body.gender) 
//  				(req.body.language == '' || teacher.languages.indexOf(req.body.language) != -1) &&
//  				(req.body.country == '' || teacher.location.country.toLowerCase() == req.body.country.toLowerCase())
//  			);
// 		});
		
		res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get("/teachers/:id", (req, res) => {
	var _id = req.params.id;

	Teacher.find({_id}).then(doc => {
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
            city: req.body.city
        },
        email: req.body.email
	});

	NewStudent.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

app.post("/teachers", (req, res) => {
	var NewTeacher = new Teacher({
        _id: req.body.uid,
		name: req.body.name,
		gender: req.body.gender,
		approved: false,
		curriculums: req.body.curriculums,
		subjects: req.body.subjects,
		languages: req.body.languages,
		rate: req.body.rate,
		location: {
			country: req.body.country,
			city: req.body.city,
			flag: req.body.flag
		},
		email: req.body.email,
		profilePic: req.body.profilePic,
		certificates: req.body.certificates,
		workingDays: req.body.workingDays
	});

	NewTeacher.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

app.post("/teachers/update/:id", (req, res) => {
	var _id = req.params.id;
	
	Teacher.findOneAndUpdate({ _id }, { workingDays: req.body.workingDays, approved: true }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/teachers/disable/:id", (req, res) => {
	var _id = req.params.id;
	
	Teacher.findOneAndUpdate({ _id }, { approved: false }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/teachers/enable/:id", (req, res) => {
	var _id = req.params.id;
	
	Teacher.findOneAndUpdate({ _id }, { approved: true }).then(doc => {
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
