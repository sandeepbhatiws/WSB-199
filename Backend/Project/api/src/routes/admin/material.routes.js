const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/material.controller');
const validate = require('../../middleware/admin/materialmiddleware');

const route = express.Router();

// route.use(validate);

module.exports = server => {

    route.post('/create', create);

    route.post('/view', view);

    route.post('/details/:id', details);

    route.put('/update/:id', update);

    route.put('/change-status', changeStatus);

    route.put('/delete', destroy);

    server.use('/api/admin/material', route);
}