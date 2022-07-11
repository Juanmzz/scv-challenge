const express = require('express');
const router = express.Router();

const savingAccountController = require('../controllers/saving-account');

//GET /saving-account/
router.get("/", savingAccountController.get);

//PUT /saving-account/
router.put("/", savingAccountController.addMoney)

module.exports = router;