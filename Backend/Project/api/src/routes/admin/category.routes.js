const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/category.controller');
const multer = require('multer')
multer({ dest: 'uploads/categories' })
const path = require('path');

const route = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/categories')
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+extension)
        }
    })

    const upload = multer({ storage: storage })

    route.post('/create', upload.single('image'), create);

    route.post('/view', upload.none(), view);

    route.post('/details/:id', upload.none(), details);

    route.put('/update/:id', upload.none(), update);

    route.put('/change-status', upload.none(), changeStatus);

    route.put('/delete', upload.none(), destroy);

    server.use('/api/admin/category', route);
}