const validate = (request, response, next) => {
    if(request.body){
        console.log(request.body.name)
        if(request.body.name == undefined || request.body.name == ''){
            const data = {
                _status : false,
                _message : 'Name is required',
                _data : null,
            }
            response.send(data);
        }
    } else {
        console.log(request.body)
        const data = {
            _status : false,
            _message : 'Required field missings.',
            _data : null,
        }
        response.send(data);
    }

    next();
}

module.exports = validate;