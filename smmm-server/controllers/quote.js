const Quote = require("../models/quote");

exports.getAll = async (req, res, next) => {
  try {
    const quotes = await Quote.find().populate("investment");

    res.status(200).json(quotes);
  } catch (err) {
    throw err;
  }
};

exports.post = async (req, res, next) => {
  try {
    const investmentId = req.body.investmentId;
    const value = req.body.value;

    let date = new Date();
    const dateFormatted = date.toISOString().split("T")[0];

    let quote = await Quote.findOne({ date: dateFormatted });

    //if the qoute exist for the day of the date, it will be update
    if (quote && quote.value != 0) {
      quote.value = value;
       await quote.save();
    } else {

       quote = new Quote({
        investment: investmentId,
        value: value,
        date: dateFormatted,
      });

      await quote.save();
    }

    res.status(201).json({
      message: "New Quote created successfully!",
      quote: quote,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
