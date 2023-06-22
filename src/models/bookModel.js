const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    reviews: {
        type: Number,
        default: 0,
        comment: 'Holds number of reviews of this book',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    releasedAt: {
        type: Date,
        required: true,
        format: 'YYYY-MM-DD',
    },
    reviewsData : {
        type: Array,
        default: [],
    }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema);

/* 
{ 
  title: {string, mandatory, unique},
  excerpt: {string, mandatory}, 
  userId: {ObjectId, mandatory, refs to user model},
  ISBN: {string, mandatory, unique},
  category: {string, mandatory},
  subcategory: {string, mandatory},
  reviews: {number, default: 0, comment: Holds number of reviews of this book},
  deletedAt: {Date, when the document is deleted}, 
  isDeleted: {boolean, default: false},
  releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
*/