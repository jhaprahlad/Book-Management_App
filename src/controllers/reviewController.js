const bookModel = require("../models/bookModel")
const reviewModel= require("../models/reviewModel")
const mongoose= require("mongoose")
const ObjectId = mongoose.Types.ObjectId;


const createReview= async function(req,res){
    try {
        const bookId = req.params.bookId
        if (!ObjectId.isValid(bookId)) {
            return res
                .status(400)
                .send({ status: false, message: "bookId is invalid" });
        }

        req.body.bookId=bookId
        const data = req.body;
    
        const checkBook = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!checkBook) {
            return res
                .status(404)
                .send({ status: false, message: "Book data is not found" });
        }
        const reviewsCreate = await reviewModel.create(data);

        const book = await bookModel.findByIdAndUpdate(bookId, { $inc: { reviews: 1 } }, { new: true }).lean();
        book.reviewsData = reviewsCreate;
        res.status(201).send({ status: true, message: "Review added successfully", data: book });
        
    } catch (error) {
        if (error.message.includes('validation')) {
            return res.status(400).send({ status: false, message: error.message })
        } else if (error.message.includes('duplicate')) {
            return res.status(400).send({ status: false, message: error.message })
        } else {
            return res.status(500).send({ status: false, message: error.message })
        }
        
    }
}

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const bookId = req.params.bookId;
        if (!ObjectId.isValid(bookId) && !ObjectId.isValid(reviewId) ) {
            return res
                .status(400)
                .send({ status: false, message: "bookId or reviewId is invalid" });
        }
        
        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) {
            return res.status(404).send({ status: false, message: "book not found" })
        }
        const review = await reviewModel.findOne({ _id: reviewId, isDeleted: false });
        if (!review) {
            return res.status(404).send({ status: false, message: "review not found" })
        }
        if (bookId != review.bookId) {
            return res.status(400).send({ status: false, message: "please provide valid BookId" })
        }
        const updatedReview = await reviewModel.findByIdAndUpdate(reviewId, req.body, { new: true });
        res.status(200).send({ status: true, message: "Review updated successfully", data: updatedReview });
    } catch (error) {
        if (error.message.includes('validation')) {
            return res.status(400).send({ status: false, message: error.message })
        } else if (error.message.includes('duplicate')) {
            return res.status(400).send({ status: false, message: error.message })
        } else {
            res.status(500).send({ status: false, message: error.message })
        }
    }
}

const deletedReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const bookId = req.params.bookId;

        if (!ObjectId.isValid(bookId) && !ObjectId.isValid(reviewId) ) {
            return res
                .status(400)
                .send({ status: false, message: "bookId or reviewId is invalid" });
        }   
        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });

        if (!book) {
            return res.status(404).send({ status: false, message: "book not found" })
        }

        const review = await reviewModel.findOne({ _id: reviewId, isDeleted: false });

        if (!review) {
            return res.status(404).send({ status: false, message: "review not found" })
        }

        const reviewUpdated = await reviewModel.findByIdAndUpdate(reviewId, { $set: { isDeleted: true } }, { new: true });

        const bookUpdated = await bookModel.findByIdAndUpdate(bookId, { $inc: { reviews: -1 } }, { new: true });

        res.status(200).send({ status: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    createReview,
    updateReview,
    deletedReview
}