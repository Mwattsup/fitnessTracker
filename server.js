const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;



const Workout = require('./models/workout');

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGDB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true });


app.get('/workouts', (req, res) => {
    res.sendFile('public/exercise.html', {root: __dirname});
});

app.get('/stats', (req, res) => {
    res.sendFile('public/stats.html', {root: __dirname});
});

app.get('/api/workouts', (req, res) => {
    Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

app.post('/api/workouts', ({body}, res) => {
    Workout.create(body).then(({id}) => db.Workout);
});

app.get('/api/workouts/range', (req, res) => {
    Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
})