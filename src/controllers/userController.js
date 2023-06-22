const userModel = require("../models/userModel")
const validator = require("validator")

const createUser = async function (req, res) {
    try {
        // const { title, name, phone, email, password } = req.body;
        let dataOfUser = req.body;
        let user = await userModel.create(dataOfUser)
        return res.status(201).send({
            status: true,
            // message: "User created successfully",
            data: user
        })


    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        else if (error.message.includes("duplicate")) {
            return res.status(400).send({ status: false, message: "email should be unique" })
        }
        else {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}

module.exports = {
    createUser
}



// {
//     title: {string, mandatory, enum[Mr, Mrs, Miss]},
//     name: {string, mandatory},
//     phone: {string, mandatory, unique},
//     email: {string, mandatory, valid email, unique},
//     password: {string, mandatory, minLen 8, maxLen 15},
//     address: {
//       street: {string},
//       city: {string},
//       pincode: {string}
//     },
//     createdAt: {timestamp},
//     updatedAt: {timestamp}
//   }
