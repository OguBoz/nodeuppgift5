const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('./../models/movie.js');
const db = mongoose.connection;

//const Movies = db.collection("Movies")

// GET(READ) ALL ROUTE
router.get('/', async  (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies)

    } catch(err) {
        res.status(500).json({ message: err  });
    }
});

// GET(READ) ONE ROUTE
router.get('/:id', async (req, res) => {
   const movie = await Movie.findById(req.params.id);
   res.json(movie);
});

// POST(CREATE) ROUTE
router.post('/', async (req, res) => {
    const movie = new Movie({
        movieDirector: req.body.movieDirector,
        movieTitle: req.body.movieTitle
    });
    try {
        const newMovie = await movie.save(function (err, kittens) {
            if (err) return console.error("save error: " + err);
          });
        res.status(201).json(newMovie);
    } catch(err) {
        res.status(400).json({ message: err.message  });
    }
});

// PUT(UPDATE) ROUTE
 router.put('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie)
         res.status(404).json({message: 'The movie was not found'});

    movie.movieDirector = req.body.movieDirector;
    movie.movieTitle = req.body.movieTitle;

    await movie.save();
    res.status(200).json(movie);
 });

 // DELETE ALL ROUTE
 router.delete('/:id', async (req, res) => {
    await Movie.deleteMany({}, (err) => {
        if(err) 
            res.status(404).json({message: 'The movies could not be deleted'});
        res.status(200).json({message: 'The movies got deleted'});
      });
 });


// DELETE ONE ROUTE
 router.delete('/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id, (err) => {
        if(err) 
            res.status(404).json({message: 'The movie was not found'});
        res.status(200).json({message: 'The movie was deleted'});
      });
 });


module.exports = router;