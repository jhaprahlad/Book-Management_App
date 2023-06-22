const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: [true, "excerpt is required"],
        trim: true

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required"],
        trim: true,
        ref: 'User'
    },
    ISBN: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
              // Custom validation logic for ISBN
              const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
              return isbnRegex.test(value);
            },
            message: "Invalid ISBN"
          }
    },
    category: {
        type: String,
        required: [true, "category is required"],
        trim: true,

    },
    subcategory: {
        type: String,
        required: [true, "subcategory is required"],
        trim: true
    },
    reviews: {
        type: Number,
        default: 0,
        comment: 'Holds number of reviews of this book',
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    releasedAt: {
        type: Date,
        required: [true, "releasedAt is required"],
        // format: 'YYYY-MM-DD',
        validator: function (value) {
            // Custom validation logic for date format
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateFormatRegex.test(value);
        },
        message: "releasedAt must be in the format 'YYYY-MM-DD'"
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