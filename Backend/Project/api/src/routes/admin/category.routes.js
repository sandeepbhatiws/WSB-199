const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/category.controller');

const route = express.Router();

module.exports = server => {

    route.post('/create', create);

    route.post('/view', view);

    route.post('/details/:id', details);

    route.put('/update/:id', update);

    route.put('/change-status', changeStatus);

    route.put('/delete', destroy);

    server.use('/api/admin/category', route);
}