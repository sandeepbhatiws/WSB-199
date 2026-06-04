const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// To Make it Executable
const server = express();

server.use(bodyParser.json());

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended : true }));

server.get('/', (request, response) => {
    response.send('Server is working fine!')
})

server.use('/uploads', express.static('uploads'));

// Website Routes
require('./src/routes/website/user.routes')(server)

// Admin Routes
require('./src/routes/admin/material.routes')(server)
require('./src/routes/admin/category.routes')(server)
require('./src/routes/admin/subCategory.routes')(server)
require('./src/routes/admin/product.routes')(server)


// Application Routes

server.listen(5000, async() => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce').then(
        () => console.log('Connected!')
    );
    console.log('Server is working fine.')
})