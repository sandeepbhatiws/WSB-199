const express = require('express');
const { orderPlaced, orderStatus, myOrders } = require('../../controllers/website/order.controller');
const multer = require('multer')
const upload = multer({ dest: 'uploads' })

const route = express.Router();

module.exports = server => {

    route.post('/place-order', upload.none(), orderPlaced);

    route.post('/order-status', upload.none(), orderStatus);

    route.post('/my-orders', upload.none(), myOrders);

    server.use('/api/website/checkout', route);
}