const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required:[true, "bookId is required"]
    },
    reviewedBy: {
        type: String,
        required: [true, "reviewedBy is required"],
        default: 'Guest',
    },
    reviewedAt: {
        type: Date,
        required: [true, "reviewedAt is required"],
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
        min: 1,
        max: 5
    },
    review: {
        type: String,
        trim: true,

    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Review', reviewSchema);


/*
{
  bookId: {ObjectId, mandatory, refs to book model},
  reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  reviewedAt: {Date, mandatory},
  rating: {number, min 1, max 5, mandatory},
  review: {string, optional}
  isDeleted: {boolean, default: false},
}
*/

