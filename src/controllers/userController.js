const userModel = require("../models/userModel")
const validator = require("validator")
const jwt = require("jsonwebtoken")

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
            return res.status(400).send({ status: false, message: "Email or phone no. is not unique" })
        }
        else {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}

const loginUser = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 2) {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).send({ status: false, message: 'email or password is missing' });
            }
            const user = await userModel.findOne({ email: email, password: password });
            if (!user) {
                return res.status(401).send({ status: false, message: 'User not found' });
            }
            const token = jwt.sign(
                { userId: user._id },
                "Prahlad_Secret_key",
                { expiresIn: "1h" }
            );
            res.setHeader('x-api-key', token);
            return res.status(200).send({ status: true, data: { token: token } });

        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}


module.exports = {
    createUser,
    loginUser

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
