const router= require("express").Router()
const {createUser,loginUser}= require("../controllers/userController")
const {createBook,getBookByQuery,getBookByParams,updateBook,deleteBook} = require("../controllers/bookController")
const {createReview,updateReview,deletedReview}= require("../controllers/reviewController")


router.post("/register",createUser)
router.post("/login",loginUser)

router.post("/books",createBook)
router.get("/books",getBookByQuery)
router.get("/books/:bookId",getBookByParams)
router.put("/books/:bookId",updateBook)
router.delete("/books/:bookId",deleteBook)

router.post('/books/:bookId/review', createReview)
router.put('/books/:bookId/review/:reviewId',updateReview)
router.delete('/books/:bookId/review/:reviewId',deletedReview)


module.exports=router