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

app.listen(PORT);
