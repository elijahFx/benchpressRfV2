const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        enum: ["Admin", "User"],
        required: false
    }
})

UserSchema.statics.signup = async function (email, password) {

    if(!email || !password) {
        throw Error("Все поля должны быть заполнены")
    }

    if(!validator.isEmail(email)) {
        throw Error("Введенное вами значение не является надлежащим email")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Введенный вами пароль не соответствует нашим требованиям к безопасности")
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error("Этот email уже используется")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

UserSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error("Все поля должны быть заполнены")
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error("Этот email ещё не зарегестрирован")
    }

    const match = await bcrypt.compare(password, user.password)
    console.log(match);

    if(!match) {
        throw Error("Неправильный пароль")
    }

    if(match) {
        return user
    }

    
}

module.exports = mongoose.model("UserModel", UserSchema)