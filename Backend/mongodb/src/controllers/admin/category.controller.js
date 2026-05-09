const database = require('../../../dbConnection.js')

const create = async (request, response) => {

    const saveData = {
        name: 'Mens',
        image: '1.jpg',
        status: 1,
        order: 5
    }

    const db = await database();
    db.collection('categories').insertOne(saveData)
        .then((result) => {
            const data = {
                _status: true,
                _message: 'Record created succussfully.',
                _data: result
            }
            response.send(data)
        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong.',
                _data: null
            }
            response.send(data)
        })
}

const view = async (request, response) => {

    const db = await database();
    db.collection('categories').find().toArray()
        .then((result) => {
            if (result.length > 0) {
                const data = {
                    _status: true,
                    _message: 'Record found succussfully.',
                    _data: result
                }
                response.send(data)
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record found.',
                    _data: []
                }
                response.send(data)
            }
        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong.',
                _data: null
            }
            response.send(data)
        })



}

module.exports = { create, view }