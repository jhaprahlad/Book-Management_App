const router = require("express").Router()
const { createUser, loginUser } = require("../controllers/userController")
const { createBook, getBookByQuery, getBookByParams, updateBook, deleteBook } = require("../controllers/bookController")
const { createReview, updateReview, deletedReview } = require("../controllers/reviewController")
const { authentication } = require("../middleware/authentication")


router.post("/register", createUser)
router.post("/login", loginUser)

router.post("/books", authentication, createBook)
router.get("/books", authentication, getBookByQuery)
router.get("/books/:bookId", authentication, getBookByParams)
router.put("/books/:bookId", authentication, updateBook)
router.delete("/books/:bookId", authentication, deleteBook)

router.post('/books/:bookId/review', createReview)
router.put('/books/:bookId/review/:reviewId', updateReview)
router.delete('/books/:bookId/review/:reviewId', deletedReview)


module.exports = router