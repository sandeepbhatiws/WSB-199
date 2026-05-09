const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match: /^[a-z A-Z]{2,15}$/,
        validate: {
            validator: async function(v) {
                const name = await this.constructor.findOne({ name: v, deleted_at : null });
                return !name;
            },
            message: props => `The specified name is already in use.`
        }
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

const materialModal = mongoose.model('materials', schema);

module.exports = materialModal;
