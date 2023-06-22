const mongoose = require('mongoose');
// require('mongoose-type-email');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        enum: {
            values: ["Mr", "Mrs", "Miss"],
            message: "{VALUE} is not a valid title"
        },
        trim: true,
        minlength: [1, "title must have at least 1 characters"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isMobilePhone(value, "en-IN");
            },
            message: "Phone number is invalid"

        },
        unique: [true, "phone no should not exist twice in the database"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Email is invalid"

        },
        unique: [true, "email should not exist twice in the database"]

    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be at least 8 characters"],
        maxlength: [15, "password must be at most 15 characters"],
        trim: true

    },
    address: {
        // validate: {
        //     validator: function (value) {
        //         return typeof value === 'object' && value !== null;
        //     },
        //     message: 'Address must be an object'
        // },

        type: {
            street: {
                type: String,
                trim: true,
                minlength: [3, 'Street must have at least 3 characters'],
                maxlength: [50, 'Street cannot exceed 50 characters']
            },
            city: {
                type: String,
                trim: true,
                minlength: [3, 'City must have at least 3 characters'],
                maxlength: [30, 'City cannot exceed 30 characters']
            },
            pincode: {
                type: String,
                trim: true,
                minlength: [6, 'Pincode must have at least 6 characters'],
                maxlength: [6, 'Pincode cannot exceed 6 characters']
            },
        }
    }

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);

/* 
{ 
  title: {string, mandatory, enum[Mr, Mrs, Miss]},
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {string},
    city: {string},
    pincode: {string}
  },
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
*/