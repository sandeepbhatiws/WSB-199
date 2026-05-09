const express = require('express');
const { view, create } = require('./src/controllers/admin/category.controller');
const { studentCreate, studentView, studentUpdate, studentDelete } = require('./src/controllers/admin/student.controller');

// To Make it Executable
const server = express();

server.use(express.json());

server.use(express.urlencoded({ extended : true }));

server.get('/', (request, response) => {
    response.send('Server is working fine!')
})

server.get('/api/category/create', create);
server.get('/api/category/view', view);

server.post('/api/student/create', studentCreate);
server.get('/api/student/view', studentView);
server.put('/api/student/update/:id', studentUpdate);
server.delete('/api/student/delete/:id', studentDelete);

server.listen(5000, () => {
    console.log('Server is working fine.')
})