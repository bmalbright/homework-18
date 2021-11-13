const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: "Enter a workout name."
            
            },
            type: {
                type: String,
                trim: true,
                required: "Enter a workout type"
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number
            },
            reps: {
                duration: Number
            },
            distance: {
                type: Number
            } 
        }
    ]
})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
