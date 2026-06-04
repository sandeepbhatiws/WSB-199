const express = require('express');
const { register, login, viewProfile, updateProfile, changePassword, forgotPassword, resetPassword } = require('../../controllers/website/user.controller');
const multer = require('multer')
multer({ dest: 'uploads/users' })
const path = require('path');

const route = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/users')
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+extension)
        }
    })

    const upload = multer({ storage: storage })

    route.post('/register', upload.single('image'), register);

    route.post('/login', upload.none(), login);

    route.post('/view-profile', upload.none(), viewProfile);

    route.put('/update-profile', upload.single('image'), updateProfile);

    route.put('/change-password', upload.none(), changePassword);

    route.post('/forgot-password', upload.none(), forgotPassword);

    route.put('/reset-password', upload.none(), resetPassword);


    server.use('/api/website/user', route);
}