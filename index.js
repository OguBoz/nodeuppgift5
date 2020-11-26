const express = require("express");
const helmet = require("helmet");
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/movies';
mongoose.connect(DATABASE_URL, 
        { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
const moviesRouter = require('./routes/movies.js');
const app = express();
const PORT = process.env.PORT || 3000;
const Movies = db.collection("movies");

db.once('open', () => console.log('Connected to DB'));

app.use(helmet());

app.use(express.json());
app.use('/movies', moviesRouter);

// const lessons = [
//     { id: 1, lesson: 'lesson 1' },
//     { id: 2, lesson: 'lesson 2' },
//     { id: 3, lesson: 'lesson 3' }
// ]


// // GET ROUTE
// app.get('/', (req,res) => { res.send("hello") });

// // GET ROUTE
// app.get('/api/lessons/', (req, res) => res.send(lessons));

// //GET ROUTE
// app.get('/api/lessons/:id', (req, res) => {
//     const lesson = lessons.find(l => l.id === parseInt(req.params.id));
//     if(!lessons) res.status(404).send("The lesson ID given was not found")
//         res.send(lesson)
// });

// app.post('/api/lessons/', (req, res) => {
//     if(!req.body.lesson || req.body.lesson.length < 3) {
//         res.status(404).send("Lessons is required and must be minimum 3 characters");
//         return;
//     }
//     const lesson = {
//         id: lessons.length + 1,
//         lesson: req.body.lesson
//     }
//     lessons.push(lesson);
//     res.send(lesson);
// });

// app.put('/api/lessons/:id', (req, res) => {
//     const lesson = lessons.find(l => l.id === parseInt(req.params.id));
//     if(!lesson) res.status(404).send('The lesson ID given was not found');
//     validate(req, res);
//     lesson.lesson = req.body.lesson;
// });


// app.delete('/api/lessons/:id', (req, res) => {
//     const lesson = lessons.find(l => l.id === parseInt(req.params.id));
//     if(!lesson) res.status(404).send("The lesson ID given was not found");
//     const index = lessons.indexOf(lesson);
//     lessons.split(index, 1);
//     res.send(lesson);
// })


app.listen(PORT);