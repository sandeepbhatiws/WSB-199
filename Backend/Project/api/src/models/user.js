const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match: /^[a-z A-Z]{2,15}$/,
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        validate: {
            validator: async function(v) {
                const email = await this.constructor.findOne({ email: v, deleted_at : null, role_type : 'User' });
                return !email;
            },
            message: props => `The specified email is already in use.`
        }
    },
    image : {
        type : String,
        default : ''
    },
    mobile_number : {
        type : Number,
        default : '',
        match: /^[0-9]{8,15}$/,
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
    },
    gender : {
        type : String,
        default : '',
        enum : ['', 'Male', 'Female']
    },
    address : {
        type : String,
        default : ''
    },
    role_type : {
        type : String,
        required : [true, 'Role Type is required'],
        enum : ['User', 'Admin']
    },
    order : {
        type : Number,
        required : [true, 'Order is required'],
        min : [0, 'Minimum value must be atleast 0'],
        max : [1000, 'Maximum value must be atleast 1000']
    },
    status : {
        type : Boolean,
        default : 1
    },
    created_at : {
        type : Date,
        default : Date()
    },
    updated_at : {
        type : Date,
        default : Date()
    },
    deleted_at : {
        type : Date,
        default : null
    },
});

const categoryModal = mongoose.model('categories', schema);

module.exports = categoryModal;
