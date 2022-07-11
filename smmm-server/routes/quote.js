const express = require('express');
const router = express.Router();

const quoteController = require('../controllers/quote');

//GET /quote/
router.get("/", quoteController.getAll);

//POST /quote/
router.post("/", quoteController.post);


module.exports = router;