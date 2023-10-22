require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: [""],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}))



const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/users")

app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

mongoose.connect("mongodb+srv://killrodxgames:iloveatlas2001@cluster0.adeu0iq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`Слушаем на порте ${process.env.PORT} и подключили базу данных`);
        })

    })
    .catch((err) => {
        console.log(err);
    })






