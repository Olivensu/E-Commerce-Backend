const data = require("../data")
const User = require("../models/userModel")

const seedUser = async (req,res,next)=>{
    try {
        // deleting all existing users
        await User.deleteMany({})

        //inserting all existing users

        const users = await User.insertMany(data.users);

        //successfully inserted

        return res.status(201).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {seedUser}