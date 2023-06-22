const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        enum: {
            values: ["Mr", "Mrs", "Miss"],
            message: "{VALUE} is not a valid title"
        },
        trim: true
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be at least 8 characters"],
        maxlength: [15, "password must be at most 15 characters"]
      
    },
    address: {
        street: {
            type: String,
            trim: true

        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true
        },
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