const orderModal = require("../../models/order")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
require('dotenv').config()

var instance = new Razorpay({
  key_id: process.env.razorpay_key_id,
  key_secret: process.env.razorpay_key_secret,
});

exports.orderPlaced = async (request, response) => {

    try {
        // Extract and verify token
        var authHeader = request.headers.authorization;
        
        if (!authHeader) {
            return response.send({
                _status: false,
                _message: 'Authorization token is required',
                _data: null
            });
        }

        var token = authHeader.split(' ');
        
        if (!token[1]) {
            return response.send({
                _status: false,
                _message: 'Invalid token format',
                _data: null
            });
        }

        var verifyToken = await jwt.verify(token[1], process.env.secret_key);

        var totalOrders = await orderModal.find().countDocuments();

        var saveData = request.body;
        saveData.user_id = verifyToken.userData._id;
        saveData.order_number = 'MONSTA_00'+(totalOrders+1);

        var createOrder = await instance.orders.create({
            "amount": request.body.net_amount*100,
            "currency": "INR",
            "receipt": saveData.order_number,
            "partial_payment": false,
        })

        saveData.order_id = createOrder.id;

        orderModal(saveData).save()
        .then(async(result) => {

            const data = {
                _status : true,
                _message : 'Order Placed succussfully.',
                _data : result,
            }
            response.send(data);
        })
        .catch((error) => {

            var errorMessages = {};
            for(key in error.errors){
                errorMessages[key] = error.errors[key].message
            }

            const data = {
                _status : false,
                _message : 'Something went wrong.',
                _data : null,
                _error : errorMessages
            }
            response.send(data);
        })
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return response.send({
                _status: false,
                _message: 'Invalid token',
                _data: null
            });
        }

        if (error.name === 'TokenExpiredError') {
            return response.send({
                _status: false,
                _message: 'Token expired',
                _data: null
            });
        }

        if (error.name === 'ValidationError') {
            var errorMessages = {};
            for (let key in error.errors) {
                errorMessages[key] = error.errors[key].message;
            }

            return response.send({
                _status: false,
                _message: 'Validation error',
                _data: null,
                _error: errorMessages
            });
        }

        var data = {
            _status: false,
            _message: 'Something went wrong!!!',
            _data: null,
            _error: error
        };

        response.send(data);
    }
}

// razorpay_payment_id: 'pay_T5q077JeOJxvvz', razorpay_order_id: 'order_T5pz7wRbLYl6R9',

// {payment_id: 'pay_T5q2GFlT9mNWoJ', order_id: 'order_T5q1yHNgEOTtwr'}
// authorized

exports.orderStatus = async (request, response) => {
    try {
        // Extract and verify token
        var authHeader = request.headers.authorization;
        
        if (!authHeader) {
            return response.send({
                _status: false,
                _message: 'Authorization token is required',
                _data: null
            });
        }

        var token = authHeader.split(' ');
        
        if (!token[1]) {
            return response.send({
                _status: false,
                _message: 'Invalid token format',
                _data: null
            });
        }

        var verifyToken = await jwt.verify(token[1], process.env.secret_key);

        var checkPayment = await instance.payments.fetch(request.body.payment_id);

        if(checkPayment.order_id != request.body.order_id) {
            return response.send({
                _status: false,
                _message: 'Invalid order id',
                _data: null
            });
        }

        if(checkPayment.status == 'authorized'){
            await instance.payments.capture(checkPayment.id, checkPayment.amount, checkPayment.currency);
        }

        if(checkPayment.status == 'failed'){
            var orderStatus = 7;
            var paymentStatus = 3;
        } else {
            var orderStatus = 2;
            var paymentStatus = 2;
        }

        // Update Order Status
        var updatedOrder = await orderModal.updateOne({
            order_id : request.body.order_id,
        },{
            $set : {
                payment_id : request.body.payment_id,
                order_status : orderStatus,
                payment_status : paymentStatus
            }
        });

        if(paymentStatus == 2){
            return response.send({
                _status: true,
                _message: 'Order placed successfully!',
                _payment_status : 1
            });
        } else {
            return response.send({
                _status: true,
                _message: 'Order Status failed!',
                _payment_status : 0
            });
        }

    } catch (error) {
        console.error('Update Profile Error:', error);

        if (error.name === 'JsonWebTokenError') {
            return response.send({
                _status: false,
                _message: 'Invalid token',
                _data: null
            });
        }

        if (error.name === 'TokenExpiredError') {
            return response.send({
                _status: false,
                _message: 'Token expired',
                _data: null
            });
        }

        if (error.name === 'ValidationError') {
            var errorMessages = {};
            for (let key in error.errors) {
                errorMessages[key] = error.errors[key].message;
            }

            return response.send({
                _status: false,
                _message: 'Validation error',
                _data: null,
                _error: errorMessages
            });
        }

        var data = {
            _status: false,
            _message: 'Something went wrong!!',
            _data: null,
            _error: error
        };

        response.send(data);
    }
}

exports.myOrders = async (request, response) => {

    // console.log(request.headers.authorization.split(' '))
    try {
        var token = request.headers.authorization.split(' ');

        var verifyToken = await jwt.verify(token[1], process.env.secret_key);

        userModal.findOne({
            _id : verifyToken.userData._id
        })
        .then((result) => {
            var data = {
                _status : true,
                _message : 'Profile Fetched',
                _data : result
            }

            response.send(data)
        })
        .catch((error) => {
            var data = {
                _status : false,
                _message : 'Something went wrong !!',
                _data : null,
                _error : error
            }

            response.send(data)
        })
    } catch (error) {
        var data = {
            _status : false,
            _message : 'Something went wrong !!'
        }

        response.send(data)
    }

}