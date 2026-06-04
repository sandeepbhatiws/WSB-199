const express = require('express');
const { parentCategory, subCategory, colors, materials, create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/product.controller');
const multer = require('multer')
multer({ dest: 'uploads/products' })
const path = require('path');

const route = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+extension)
        }
    })

    const upload = multer({ storage: storage })

    const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 12 }])

    route.post('/parent-category', upload.none(), parentCategory);

    route.post('/sub-category', upload.none(), subCategory);

    route.post('/materials', upload.none(), materials);

    route.post('/create', uploadMiddleware, create);

    route.post('/view', upload.none(), view);

    route.post('/details/:id', upload.none(), details);

    route.put('/update/:id', uploadMiddleware, update);

    route.put('/change-status', upload.none(), changeStatus);

    route.put('/delete', upload.none(), destroy);

    server.use('/api/admin/product', route);
}