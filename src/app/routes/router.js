const express = require('express');
const router = express.Router();

const dependencyController = require('../controller/dependencyController')
const categoryController = require('../controller/categoryController')
const inningController = require('../controller/inningController')

router.get('/', dependencyController.index);

router.get('/dependencia/:fk', categoryController.getByDependency); //
router.get('/dependencia/:fkDependency/categoria/:fkCategory', inningController.arrive); //
router.post('/dependencia/:fkDependency/categoria/:fkCategory', inningController.getInning); //

router.get('/innings/', inningController.list);


router.get('/dependencies/', dependencyController.list);
router.post('/dependencies/create', dependencyController.create);
router.post('/dependencies/edit/:id', dependencyController.edit);
router.get('/dependencies/delete/:id', dependencyController.delete);

router.get('/categories/', categoryController.list);
router.post('/categories/create', categoryController.create);
router.post('/categories/edit/:id', categoryController.edit);
router.get('/categories/delete/:id', categoryController.delete);


module.exports = router;