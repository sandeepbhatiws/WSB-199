const { categories } = require("../../../data")

const create = () => {

}

const view = (request, response) => {
    if(categories.length > 0){
        const data = {
            _status : true,
            _message : 'Record found succussfully.',
            _data : categories
        }
        response.send(data)
    } else {
        const data = {
            _status : false,
            _message : 'No Record found.',
            _data : []
        }
        response.send(data)
    }
}

module.exports = { create, view }