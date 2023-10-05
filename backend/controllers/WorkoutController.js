const Workout = require("../models/WorkoutModel")
const mongoose = require("mongoose")

const createWorkout = async (req, res) => {

    const { title, reps, load, comments } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push("название")
    }
    if(!reps) {
        emptyFields.push("повторения")
    }
    if(!load) {
        emptyFields.push("нагрузка")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: `Пожайлуйста заполните следующие обязательные поля: ${emptyFields}`, emptyFields})
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, load, reps, comments, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
    
}


const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Неправильный id"})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: "Ошибка. Такого упражнения нет"})
    }

    res.status(200).json(workout)
}

const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Неправильный id"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: "Ошибка. Такого упражнения нет"})
    }

    res.status(200).json(workout)

}

const deleteWorkout = async (req, res) => {
    const { id } = req.params


    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Неправильный id"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(404).json({error: "Ошибка. Такого упражнения нет"})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getWorkouts,
    getWorkout
}