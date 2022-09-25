
const express = require('express');
const route = express.Router();

const tarefasController = require('./src/controllers/tarefasController');

route.get('/api/tarefas', tarefasController.index);
route.post('/api/tarefas/nova', tarefasController.register);
route.get('/api/tarefas/edit/:id', tarefasController.editIndex);
route.put('/api/tarefas/edit/:id', tarefasController.edit);
route.delete('/api/tarefas/delete/:id', tarefasController.delete);

module.exports = route;