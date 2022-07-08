// const fs = require("fs");
// const investmentsDataPath = "./mocks/investments.json";

const Investment = require("../models/investment");

exports.getAll = async (req, res, next) => {
  try {
    const investments = await Investment.find();

    res.status(200).json(investments);
  } catch (err) {
    throw err;
  }
};

exports.create = async (req, res, next) => {

  try {
    
    const name = req.body.name;
    const type = req.body.type;
    const quantity = req.body.quantity;

    const investment = new Investment({
        name: name,
        type: type,
        quantity: quantity
    });

    await investment.save();

    res.status(201).json({
        message: 'created!',
        investment: investment
    });
    // const error = new Error("Validation failed, entered data is incorrect");

    // error.statusCode = 422;
    // throw error;
  

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
