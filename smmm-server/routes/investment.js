const express = require('express');
const router = express.Router();

const invesmentController = require('../controllers/investment');

//GET /invesment/
router.get("/", invesmentController.getAll);

module.exports = router;