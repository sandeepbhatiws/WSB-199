const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        user_id : {
            type : String,
            required : [true, 'User Id is required']
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            match: /^[a-zA-Z ]{2,15}$/,
        },
        mobile_number : {
            type : String,
            required: [true, 'Mobile number is required'],
        },
        order_number : {
            type : String,
            required: [true, 'Order number is required'],
        },
        order_id : {
            type : String,
            default : ''
        },
        payment_id : {
            type : String,
            default : ''
        },
        order_note : {
            type : String,
            default : ''
        },
        billing_address : {
            type : JSON,
            required: [true, 'Billing Address is required'],
        },
        shipping_address : {
            type : JSON,
            required: [true, 'Shipping Address is required'],
        },
        product_info : {
            type : Array,
            required: [true, 'Product Info is required'],
        },
        total_amount : {
            type : Number, 
            required : [true, 'Total Amount is required']
        },
        discount_amount : {
            type : Number, 
            required : [true, 'Discount Amount is required']
        },
        net_amount : {
            type : Number, 
            required : [true, 'Net Amount is required']
        },
        payment_status: {
            type: Number,
            default: 1 // 1 - Pending 2 - Success 3- Failed
        },
        order_status: {
            type: Number,
            default: 1 // 1 - Order Placed 2 - Order Received 3- In Transit 4 - Out for Delivery 5 - Completed 6 - Cancelled 7 - Failed
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            default: Date.now()
        },
        deleted_at: {
            type: Date,
            default: null
        },
    }
);

const orderModal = mongoose.model('orders', schema);

module.exports = orderModal;