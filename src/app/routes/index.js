const express = require('express');
const router = express.Router();

const dependencyController = require('../controller/dependencyController')
const categoryController = require('../controller/categoryController')

router.get('/dependencies/', dependencyController.list);
router.post('/dependencies/create', dependencyController.create);
router.post('/dependencies/edit/:id', dependencyController.edit);
router.get('/dependencies/delete/:id', dependencyController.delete);

router.get('/categories/', categoryController.list);
router.post('/categories/create', categoryController.create);
router.post('/categories/edit/:id', categoryController.edit);
router.get('/categories/delete/:id', categoryController.delete);

router.get('/', dependencyController.index);

module.exports = router;