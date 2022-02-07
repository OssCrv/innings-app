const express = require('express');
const router = express.Router();

const dependencyController = require('../controller/dependencyController')

router.get('/dependencies/', dependencyController.list);
router.post('/dependencies/create', dependencyController.create);
router.post('/dependencies/edit/:id', dependencyController.edit);
router.get('/dependencies/delete/:id', dependencyController.delete);




module.exports = router;