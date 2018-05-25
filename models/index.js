const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'quiz'));

// Session
sequelize.import(path.join(__dirname,'session'));

// Create tables
sequelize.sync()
.then(() => sequelize.models.quiz.count()) //accede a la propiedad model y cuento cuantos hay
.then(count => { 
	if(!count){ //si es 0 cojo y creo varios quizzes con bulkcreate
		return sequelize.models.quiz.bulkCreate([ //pongo el return para que la promesa del then count espere a que se ejecute lo de abajo
			{ question: "Capital de Italia", answer: "Roma" },
			{ question: "Capital de Francia", answer: "París" },
			{ question: "Capital de España", answer: "Madrid" },
			{ question: "Capital de POrtugal", answer: "Lisboa" },
		]);
	}
})
.catch(error => { 
	console.log(error);
});

module.exports = sequelize;
