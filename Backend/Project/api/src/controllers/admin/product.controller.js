const categoryModal = require("../../models/category");
var slugify = require('slugify');
const subCategoryModal = require("../../models/subCategory");
const materialModal = require("../../models/material");
const productModal = require("../../models/product");
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

exports.parentCategory = async(request, response) => {
    
    var sorting = {
        _id : 'desc'
    }

    var andCondition = [{
        deleted_at : null,
    }];

    var orCondition = [];

    if(request.body){
        if(request.body.status != undefined && request.body.status != ''){
            orCondition.push({ status : request.body.status })
        }

        if(request.body.id != undefined && request.body.id != ''){
            orCondition.push({ _id : request.body.id })
        }
    }

    filter = {};

    if(andCondition.length > 0){
        filter.$and = andCondition;
    }
    
    if(orCondition.length > 0){
        filter.$or = orCondition;
    }
    
    categoryModal.find(filter).select("name").sort(sorting)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
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

exports.subCategory = async(request, response) => {
    
    var sorting = {
        _id : 'desc'
    }

    var andCondition = [{
        deleted_at : null,
    }];

    var orCondition = [];

    if(request.body){
        if(request.body.status != undefined && request.body.status != ''){
            orCondition.push({ status : request.body.status })
        }

        if(request.body.parent_category_id != undefined && request.body.parent_category_id != ''){
            andCondition.push({ parent_category_id : request.body.parent_category_id })
        }

        if(request.body.id != undefined && request.body.id != ''){
            orCondition.push({ _id : request.body.id })
        }
    }

    filter = {};

    if(andCondition.length > 0){
        filter.$and = andCondition;
    }
    
    if(orCondition.length > 0){
        filter.$or = orCondition;
    }
    
    subCategoryModal.find(filter).select("name").sort(sorting)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
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

exports.materials = async(request, response) => {
    
    var sorting = {
        _id : 'desc'
    }

    var andCondition = [{
        deleted_at : null,
    }];

    var orCondition = [];

    if(request.body){
        if(request.body.status != undefined && request.body.status != ''){
            orCondition.push({ status : request.body.status })
        }

        if(request.body.id != undefined && request.body.id != ''){
            orCondition.push({ _id : request.body.id })
        }
    }

    filter = {};

    if(andCondition.length > 0){
        filter.$and = andCondition;
    }
    
    if(orCondition.length > 0){
        filter.$or = orCondition;
    }
    
    materialModal.find(filter).select("name").sort(sorting)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
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

exports.create = async(request, response) => {

    var dataSave = {};
    
    if(request.body){
        dataSave = request.body;
    }

    if(request.files != undefined){
   
        if(request.files.image != undefined){
            dataSave.image = request.files.image[0].filename;
        }

        if(request.files.images != undefined){
            var images = [];

            request.files.images.forEach((v) => {
                images.push(v.filename);
            })

            dataSave.images = images;
        }
    }

    if(request.body){
        if(request.body.slug == undefined || request.body.slug == ''){
            var slug = slugify(request.body.name, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(productModal, slug);
        } else {
            var slug = slugify(request.body.slug, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(productModal, slug);
        }
    }

    productModal(dataSave).save()
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

        if(request.body.parent_category_id != undefined && request.body.parent_category_id != ''){
            andCondition.push({ parent_category_id : request.body.parent_category_id })
        }

        if(request.body.sub_category_id != undefined && request.body.sub_category_id != ''){
            andCondition.push({ sub_category_id : request.body.sub_category_id })
        }
    }

    filter = {};

    if(andCondition.length > 0){
        filter.$and = andCondition;
    }
    
    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var totalRecords = await productModal.find(filter).countDocuments();
    
    productModal.find(filter)
    .populate('parent_category_id', 'name')
    .populate('sub_category_id', 'name')
    .populate('material_id', 'name')
    .limit(limit).skip(skip).sort(sorting)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : `${ process.env.image_url }products`,
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

    productModal.findOne({
        _id : request.params.id,
        deleted_at : null
    })
    .populate('parent_category_id', 'name')
    .populate('sub_category_id', 'name')
    .populate('material_id', 'name')
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : `${ process.env.image_url }products`,
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

    if(request.files != undefined){
   
        if(request.files.image != undefined){
            dataSave.image = request.files.image[0].filename;
        }

        if(request.files.images != undefined){
            var images = [];

            request.files.images.forEach((v) => {
                images.push(v.filename);
            })

            dataSave.images = images;
        }
    }

    var getDetails = await productModal.findOne({ _id : request.params.id });

    if(getDetails.slug != request.body.slug){
        if(request.body.slug == undefined || request.body.slug == ''){
            var slug = slugify(request.body.name, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(productModal, slug);
        } else {
            var slug = slugify(request.body.slug, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(productModal, slug);
        }
    }

    dataSave.updated_at = Date.now()

    productModal.updateOne(
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

    productModal.updateMany(
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

    productModal.updateMany(
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