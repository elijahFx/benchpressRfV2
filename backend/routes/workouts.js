const express = require("express")
const router = express.Router()
const Workout = require("../models/WorkoutModel")
const {
    deleteWorkout,
    updateWorkout,
    getWorkout,
    getWorkouts,
    createWorkout
} = require("../controllers/WorkoutController")
const requireAuth = require("../middleware/requireauth")

router.use(requireAuth)

router.get("/", getWorkouts)

router.get("/:id", getWorkout)

router.delete("/:id", deleteWorkout)

router.post("/", createWorkout)

router.patch("/:id", updateWorkout)



module.exports = router