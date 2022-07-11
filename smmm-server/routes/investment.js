const express = require('express');
const router = express.Router();

const invesmentController = require('../controllers/investment');

//GET /invesment/
router.get("/", invesmentController.getAll);

//GET /invesment/id
router.get("/:investmentId", invesmentController.getDetail);

//POST /invesment/buy
router.post("/buy", invesmentController.buy);

//POST /invesment/sell
router.post("/sell", invesmentController.sell);

//POST /invesment/
router.post("/", invesmentController.create);

module.exports = router;