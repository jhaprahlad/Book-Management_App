const router= require("express").Router()
const {createUser}= require("../controllers/userController")


router.post("/user",createUser)


module.exports=router