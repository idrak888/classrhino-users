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
		var filteredTeachers = doc.filter(teacher => {
			return (
			   	(req.body.language == '' || teacher.languages.indexOf(req.body.language) != -1) &&
				(req.body.country == '' || teacher.location.country.toLowerCase() == req.body.country.toLowerCase()) &&
				(req.body.subject == '' || teacher.subjects.indexOf(req.body.subject) != -1) &&
				(req.body.grade == '' || teacher.grades.indexOf(req.body.grade) != -1) &&
				(req.body.gender == '' || teacher.gender == req.body.gender) 
			);
	    });
	   
	   	res.send(filteredTeachers);
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
        email: req.body.email,
        birthDate: req.body.birthDate,
        grade: req.body.grade,
        location: {
            country: req.body.country,
            city: req.body.city
		},
		upcomingClasses: [],
		completedClasses: []
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
		email: req.body.email,
		profilePic: req.body.profilePic,
		certificates: req.body.certificates,
		workingDays: req.body.workingDays,
		approved: false,
		subjects: req.body.subjects,
		grades: req.body.grades,
		languages: req.body.languages,
		rate: req.body.rate,
		location: {
			country: req.body.country,
			city: req.body.city,
			flag: req.body.flag
		},
		upcomingClasses: [],
		completedClasses: []
	});

	NewTeacher.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

app.post("/teachers/newclass/:id", (req, res) => {
	var _id = req.params.id;
	
	Teacher.findOneAndUpdate({ _id }, { $push: { upcomingClasses: req.body.class } }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/teachers/completed/:id", (req, res) => {
	var _id = req.params.id;
	
	Teacher.findOneAndUpdate({ _id }, { $pull: { upcomingClasses: req.body.class }, $push: { completedClasses: req.body.class } }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/students/newclass/:id", (req, res) => {
	var _id = req.params.id;
	
	Student.findOneAndUpdate({ _id }, { $push: { upcomingClasses: req.body.class } }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/students/completed/:id", (req, res) => {
	var _id = req.params.id;
	
	Student.findOneAndUpdate({ _id }, { $pull: { upcomingClasses: req.body.class }, $push: { completedClasses: req.body.class } }).then(doc => {
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
