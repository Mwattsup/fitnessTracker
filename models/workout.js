const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workOutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: 'Enter a type of exercise'
                },
                name: {
                    type: String,
                    trim: true,
                    required: 'Enter an exercise name'
                },
                duration: {
                    type: Number,
                    required: 'Enter number of minutes'
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

workOutSchema.virtual('totalDuration').get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    },0);
});

const Workout = mongoose.model('Workout', workOutSchema);

module.exports = Workout;