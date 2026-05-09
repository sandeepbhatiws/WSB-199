const express = require('express');
const { categories, productDetails } = require('./data');
const { view } = require('./src/controllers/admin/category.controller');

// To Make it Executable
const server = express();

server.get('/', (request, response) => {
    response.send('Server is working fine!')
})

server.post('/api/category', view);

server.post('/api/product-details', (request, response) => {
    if(productDetails){
        const data = {
            _status : true,
            _message : 'Record found succussfully.',
            _data : productDetails
        }
        response.send(data)
    } else {
        const data = {
            _status : false,
            _message : 'No Record found.',
            _data : null
        }
        response.send(data)
    }
});

server.listen(5000, () => {
    console.log('Server is working fine.')
})