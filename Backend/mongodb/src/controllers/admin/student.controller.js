const database = require('../../../dbConnection.js')
const mongodb = require('mongodb');

const studentCreate = async (request, response) => {

    // //For get Method
    // const saveData = {
    //     name: request.query.student_name,
    //     email : request.query.email,
    //     mobile_number : request.query.mobile_number,
    //     status : 1
    // }

    //For Post Method
    // const saveData = {
    //     name: request.body.student_name,
    //     email : request.body.email,
    //     mobile_number : request.body.mobile_number,
    //     status : 1
    // }

    const saveData = request.body;
    saveData.status = 1;

    const db = await database();
    db.collection('students').insertOne(saveData)
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

const studentView = async (request, response) => {

    var limit = 5;
    var skip = 0;

    var sorting = {
        _id : 'desc'
    }

    if(request.query){
        if(request.query.limit != undefined && request.query.limit != ''){
            limit = parseInt(request.query.limit);
        }

        if(request.query.skip != undefined && request.query.skip != ''){
            skip = parseInt(request.query.skip);
        }

        if(request.query.sorting == 1){
            var sorting = {
                name : 'asc',
                _id : 'desc'
            }
        }
        if(request.query.sorting == 2){
            var sorting = {
                name : 'desc'
            }
        }
    }

    

    const db = await database();
    db.collection('students').find().limit(limit).skip(skip).sort(sorting).toArray()
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

const studentUpdate = async (request, response) => {

    const db = await database();
    db.collection('students').updateOne({
        _id :  new mongodb.ObjectId(request.params.id)
    }, {
        $set : request.body
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record update succussfully.',
            _data : result
        }

        response.send(data);
    })
    .catch((error) => {
        console.log(error)
        const data = {
            _status : false,
            _message : 'Something went wrong.',
            _data : null
        }

        response.send(data);
    })
}

const studentDelete = async (request, response) => {

    const db = await database();
    db.collection('students').deleteOne({
        _id :  new mongodb.ObjectId(request.params.id)
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record delete succussfully.',
            _data : result
        }

        response.send(data);
    })
    .catch((error) => {
        console.log(error)
        const data = {
            _status : false,
            _message : 'Something went wrong.',
            _data : null
        }

        response.send(data);
    })
}

module.exports = { studentCreate, studentView, studentUpdate, studentDelete }