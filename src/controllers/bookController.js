const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createBook = async function (req, res) {
    try {
        const {
            title,
            excerpt,
            userId,
            ISBN,
            category,
            subcategory,
            reviews,
            isDeleted,
            releasedAt,
        } = req.body;

        if (!ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ status: false, message: "User Id is invalid" });
        }

        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res
                .status(404)
                .json({ status: false, message: "User does not exist" });
        }

        if(userId != req.userId){
            return res.status(401).json({status: false, message: 'Unauthorized'})
        }

        const book = await bookModel.create({
            title,
            excerpt,
            userId,
            ISBN,
            category,
            subcategory,
            reviews,
            isDeleted,
            releasedAt,
        });

        res.status(201).json({ status: true, data: book });
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message });
        } else if (error.message.includes("duplicate")) {
            return res
                .status(400)
                .send({ status: false, message: "title Or ISBN is not unique" });
        } else {
            return res.status(500).send({ status: false, message: error.message });
        }
    }
};

const getBookByQuery = async function (req, res) {
    try {
        const data = req.query;
        const { userId, category, subcategory } = data;
        if (!userId && !category && !subcategory) {
            const bookData = await bookModel
                .find({ isDeleted: false })
                .sort({ title: 1 })
                .select({
                    isDeleted: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                    ISBN: 0,
                    subcategory: 0,
                });
            if (bookData.length === 0) {
                return res
                    .status(404)
                    .send({ status: false, message: "No books are available." });
            } else {
                return res.status(200).send({ status: true, data: bookData });
            }
        } else {
            if (userId) {
                if (!ObjectId.isValid(userId)) {
                    return res
                        .status(400)
                        .json({ status: false, message: "User Id is invalid" });
                }
            }
            const books = await bookModel
                .find({ $and: [{ isDeleted: false }, data] })
                .sort({ title: 1 })
                .select({
                    isDeleted: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                    ISBN: 0,
                    subcategory: 0,
                });
            if (books.length === 0) {
                return res
                    .status(404)
                    .send({ status: false, message: "No books are available." });
            }
            return res
                .status(200)
                .send({ status: true, message: "Books List.", data: books });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getBookByParams = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        if (!ObjectId.isValid(bookId)) {
            return res
                .status(400)
                .json({ status: false, message: "bookId is invalid" });
        }
        const book = await bookModel
            .findOne({ _id: bookId, isDeleted: false })
            .lean();
        if (!book) {
            return res
                .status(404)
                .send({ status: false, message: "Book data is not found" });
        }
        const reviews = await reviewModel.find({ bookId: bookId }).select({
            _id: 1,
            bookId: 1,
            reviewedBy: 1,
            reviewedAt: 1,
            rating: 1,
            review: 1,
        });
        book.reviewData = reviews;
        // book.reviews = reviews.length;

        return res
            .status(200)
            .send({ status: true, message: "book details", data: book });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const updateBook = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        if (!ObjectId.isValid(bookId)) {
            return res
                .status(400)
                .send({ status: false, message: "bookId is invalid" });
        }
        const data = req.body;

        const { title, excerpt, ISBN, releasedAt } = data;

        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });

        if (!book) {
            return res.status(404).json({ status: false, message: 'Book does not exist' });
        }

        if (book.userId != req.userId) {
            return res.status(403).json({ status: false, message: 'Access denied' });
        }

        const updatedBook = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            {
                $set: {
                    title,
                    excerpt,
                    ISBN,
                    releasedAt
                },
            },
            { new: true }
        );
        if (!updatedBook) {
            return res
                .status(404)
                .send({ status: false, message: "Please Enter correct bookId" });
        }
        return res
            .status(200)
            .send({ status: false, message: "successful", data: updatedBook });
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message });
        } else if (error.message.includes("duplicate")) {
            return res.status(400).send({ status: false, message: error.message });
        } else {
            return res.status(500).send({ status: false, message: error.message });
        }
    }
};

const deleteBook = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        if (!ObjectId.isValid(bookId)) {
            return res
                .status(400)
                .send({ status: false, message: "bookId is invalid" });

        }
        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });


        if (!book) {
            return res.status(404).json({ status: false, message: 'Book does not exist' });
        }

        if (book.userId != req.userId) {
            return res.status(403).json({ status: false, message: 'Access denied' });
        }
        
        const deletedBook = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: Date.now() } },
            { $new: true }
        );
        if (!deletedBook) {
            return res
                .status(404)
                .send({ status: false, message: "Please Enter correct bookId" });
        }
        return res
            .status(200)
            .send({ status: false, message: "successful", data: deletedBook });
    } catch (error) { 
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = {
    createBook,
    getBookByQuery,
    getBookByParams,
    updateBook,
    deleteBook,
};
