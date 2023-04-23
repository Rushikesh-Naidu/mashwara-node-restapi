const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Customer Name...!"]
        },
        phoneNumber: {
            type: String,
            required: [true],
        },
        password: {
            type: String,
            required: [true],
        },
        email: {
            type: String,
            required: [false],
            default: null
        },
        age: {
            type: Number,
            required: [false],
            default: null
        },
        gender: {
            type: String, //Gender Value 1 For Male, 2 For Female, 3 For Others
            required: [false],
            default: null
        },
        diet: {
            type: String,
            required: [false],
            default: "ANY"
        },
        profilePic: {
            type: String,
            required: [false],
            default: null
        }
    },
    {
        timestamps : true
    }
)


const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;