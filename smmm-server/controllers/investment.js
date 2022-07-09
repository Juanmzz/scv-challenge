const Investment = require("../models/investment");
const Quote = require("../models/quote");

exports.getAll = async (req, res, next) => {
  try {
    const investments = await Investment.find();

    const invesmentsIds = investments.map((i) => i._id);

    //find investments quotes order desc by date
    const quotes = await Quote.find(
      {
        investment: { $in: invesmentsIds }
      })
      .sort({ date: -1 });

    investments.forEach((i) => {
      // get the last quote
      const lastQuote = quotes.find((x) => {
        return x.investment.equals(i._id);
      });

      // get current value from the last quote
      const currentQuote = lastQuote ? lastQuote.value : 0;

      i.currentQuote = currentQuote;
    });

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
      quantity: quantity,
    });

    await investment.save();

    res.status(201).json({
      message: "created!",
      investment: investment,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
