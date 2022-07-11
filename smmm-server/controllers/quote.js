const Quote = require("../models/quote");

exports.getAll = async (req, res, next) => {
  try {
    const quotes = await Quote.find().populate('investment');

    res.status(200).json(quotes);
  } catch (err) {
    throw err;
  }
};


exports.post = async (req, res, next) => {
  try {
    const investmentId = req.body.investmentId;
    const value = req.body.value;

    let date = new Date()
    const dateFormatted = date.toISOString();

    const newQuote = new Quote({
      investment: investmentId,
      value: value,
      date: dateFormatted
    });

    await newQuote.save();
    
    res.status(201).json({
      message: "New Quote created successfully!",
      investment: newQuote,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


