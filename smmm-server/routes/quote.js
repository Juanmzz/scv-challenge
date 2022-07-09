const express = require('express');
const router = express.Router();

const quoteController = require('../controllers/quote');

//GET /quote/
router.get("/", quoteController.getAll);


module.exports = router;