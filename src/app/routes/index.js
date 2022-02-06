const express = require('express');
const router = express.Router();

const dependencyController = require('../controller/dependencyController')

router.get('/', dependencyController.list);
router.post('/create', dependencyController.create);

module.exports = router;