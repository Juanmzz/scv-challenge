const Quote = require("../models/quote");

exports.getAll = async (req, res, next) => {
  try {
    const quotes = await Quote.find().populate('investment');

    res.status(200).json(quotes);
  } catch (err) {
    throw err;
  }
};