const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match: /^[a-z A-Z]{2,15}$/,
    },
    slug : {
        type : String,
        required : [true, 'Slug is required'],
        validate: {
            validator: async function(v) {
                const slug = await this.constructor.findOne({ slug: v, deleted_at : null });
                return !slug;
            },
            message: props => `The specified slug is already in use.`
        }
    },
    parent_category_id : {
        type : String,
        required : [true, 'Parent category is required'],
        ref : 'categories'
    },
    image : {
        type : String,
        default : ''
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

const subCategoryModal = mongoose.model('sub_categories', schema);

module.exports = subCategoryModal;
