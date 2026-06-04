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
    sub_category_id : {
        type : String,
        required : [true, 'Sub category is required'],
        ref : 'sub_categories'
    },
    sub_sub_category_id : {
        type : String,
        // required : [true, 'Sub Sub category is required'],
        ref : 'sub_sub_categories'
    },
    color_id : {
        type : String,
        // required : [true, 'Color is required'],
        ref : 'colors',
        default : ''
    },
    material_id : {
        type : String,
        required : [true, 'Material is required'],
        ref : 'materials'
    },
    actual_price : {
        type : Number,
        required : [true, 'Actual price is required'],
    },
    sale_price : {
        type : Number,
        required : [true, 'Sale price is required'],
    },
    product_type : {
        type : Number, // 1 - Featured 2 - New Arrivals 3 - On Sale
        required : [true, 'Product type is required'],
    },
    is_trending : {
        type : Number, // 1 - Yes 2 - No
        required : [true, 'Is Trending is required'],
        default : 1
    },
    is_best_sellings : {
        type : Number, // 1 - Yes 2 - No
        required : [true, 'in best sellings is required'],
        default : 1
    },
    image : {
        type : String,
        default : ''
    },
    images : {
        type : Array,
        default : []
    },
    short_description : {
        type : String,
        required : [true, 'Short Description is required'],
    },
    long_description : {
        type : String,
        required : [true, 'Long Description is required'],
    },
    product_code : {
        type : String,
        required : [true, 'Product Code is required'],
    },
    dimension : {
        type : String,
        required : [true, 'Dimension is required'],
    },
    estimate_delivery_days : {
        type : String,
        required : [true, 'Extimate delivery days is required'],
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

const productModal = mongoose.model('products', schema);

module.exports = productModal;
