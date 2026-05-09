const http = require('http');
const { categories, productDetails } = require('./data');

const server = http.createServer((request, response) => {

    console.log(request.url);
    console.log(request.method);

    if(request.url == '/'){
        response.end('Server is working fine.')
    } else if(request.url == '/category' && request.method == 'GET'){

        if(categories.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch !',
                _data : categories
            }

            response.end(JSON.stringify(data))
        } else {
            const data = {
                _status : false,
                _message : 'No Record fetch !',
                _data : []
            }

            response.end(JSON.stringify(data))
        }
        
    } else if(request.url == '/product-details' && request.method == 'POST'){

        if(productDetails){
            const data = {
                _status : true,
                _message : 'Record fetch !',
                _data : productDetails
            }

            response.end(JSON.stringify(data))
        } else {
            const data = {
                _status : false,
                _message : 'No Record fetch !',
                _data : null
            }

            response.end(JSON.stringify(data))
        }
        
    } else {
        response.end('404 not found !')
    }
})

server.listen(5000, () => {
    console.log('Server is working Fine.')
})