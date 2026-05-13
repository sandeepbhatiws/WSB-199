const categoryModal = require("../../models/category");
var slugify = require('slugify')
require('dotenv').config()

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.create = async(request, response) => {

    var dataSave = {};

    // For Single Image 
    console.log(request.file)
    
    if(request.body){
        dataSave = request.body;
    }

    if(request.file){
        dataSave.image = request.file.filename;
    }

    if(request.body){
        if(request.body.slug == undefined || request.body.slug == ''){
            var slug = slugify(request.body.name, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(categoryModal, slug);
        } else {
            var slug = slugify(request.body.slug, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(categoryModal, slug);
        }
    }

    categoryModal(dataSave).save()
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record created succussfully.',
            _data : result
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
}

exports.view = async(request, response) => {
    
    var sorting = {
        _id : 'desc'
    }

    var limit = 15;
    var skip = 0;
    var page = 1;

    if(request.body){
        if(request.body.limit != undefined && request.body.limit != ''){
            limit = request.body.limit;
        }

        if(request.body.page != undefined && request.body.page != ''){
            page = request.body.page;
            skip = (page - 1) * limit;
        }
    }

    var andCondition = [{
        deleted_at : null,
    }];

    var orCondition = [];

    if(request.body){
        if(request.body.name != undefined && request.body.name != ''){
            var nameRegex = new RegExp(request.body.name, 'i');
            andCondition.push({ name : nameRegex })
        }

        if(request.body.order != undefined && request.body.order != ''){
            andCondition.push({ order : request.body.order })
        }
    }

    filter = {};

    if(andCondition.length > 0){
        filter.$and = andCondition;
    }
    
    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var totalRecords = await categoryModal.find(filter).countDocuments();
    
    categoryModal.find(filter).select("name slug image order status").limit(limit).skip(skip).sort(sorting)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : `${ process.env.image_url }categories`,
                _paginate : {
                    total_records : totalRecords,
                    current_page : page,
                    total_pages : Math.ceil(totalRecords/limit)
                },
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }
            response.send(data);
        }
        
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong.',
            _data : [],
        }
        response.send(data);
    })
}

exports.details = async(request, response) => {

    categoryModal.findOne({
        _id : request.params.id,
        deleted_at : null
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : `${ process.env.image_url }categories`,
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }
            response.send(data);
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong.',
            _data : null,
        }
        response.send(data);
    })
}

exports.update = async(request, response) => {
    const dataSave = request.body;

    if(request.file){
        dataSave.image = request.file.filename;
    }

    var getDetails = await categoryModal.findOne({ _id : request.params.id });

    if(getDetails.slug != request.body.slug){
        if(request.body.slug == undefined || request.body.slug == ''){
            var slug = slugify(request.body.name, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(categoryModal, slug);
        } else {
            var slug = slugify(request.body.slug, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(categoryModal, slug);
        }
    }

    dataSave.updated_at = Date.now()

    categoryModal.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : dataSave
        }
    )
    .then((result) => {
        if(result.matchedCount > 0){
            const data = {
                _status : true,
                _message : 'Record updated succussfully.',
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }
            response.send(data);
        }
        
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
}

exports.changeStatus = async(request, response) => {

    categoryModal.updateMany(
        {
            _id : request.body.ids
        },
        [
            {
                $set : {
                    status : { $not: "$status" },
                    updated_at : Date.now()
                }
            }
        ],
        {
            updatePipeline: true
        }
    )
    .then((result) => {
        if(result.matchedCount > 0){
            const data = {
                _status : true,
                _message : 'Change Status succussfully.',
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }
            response.send(data);
        }
        
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
}

exports.destroy = async(request, response) => {

    categoryModal.updateMany(
        {
            _id : request.body.ids
        },
        {
            $set : {
                deleted_at : Date.now()
            }
        }
    )
    .then((result) => {
        if(result.matchedCount > 0){
            const data = {
                _status : true,
                _message : 'Record delete succussfully.',
                _data : result
            }
            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }
            response.send(data);
        }
        
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
}