const Investment = require("../models/investment");
const Quote = require("../models/quote");
const SavingAccount = require("../models/saving-account");


const setCurrentQuotes = async (investments) => {
  const invesmentsIds = investments.map((i) => i._id);
  //find investments quotes order desc by date
  const quotes = await Quote.find({
    investment: { $in: invesmentsIds },
  }).sort({ date: -1 });

  investments.forEach((i) => {
    // get the last quote
    const lastQuote = quotes.find((x) => {
      return x.investment.equals(i._id);
    });

    // get current value from the last quote
    const currentQuote = lastQuote ? lastQuote.value : 0;

    i.currentQuote = currentQuote;
  });

  return investments;
};

exports.getDetail = async (req, res, next) => {

  try {

    const investmentId = req.params.investmentId;
    const investment = await Investment.findById(investmentId)
      .catch(err => {
        const error = new Error('Investment not found!')
        error.statusCode = 404;
        throw error;
      });

    const lastQuotes = await Quote.find({
      investment: investmentId,
    }).sort({ date: -1 });

    const currentQuote = lastQuotes && lastQuotes.length > 0 ? lastQuotes[0].value : 0;

    investment.currentQuote = currentQuote;

    res.status(200).json(investment);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const currentQuotes = req.query?.currentQuotes
      ? req.query?.currentQuotes === "true"
      : false
      ;
    const investments = await Investment.find();

    if (currentQuotes == true) {
      await setCurrentQuotes(investments);
    }

    res.status(200).json(investments);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.buy = async (req, res, next) => {
  try {
    const invesmentId = req.body.investmentId;
    const quantityToBuy = req.body.quantity;
    const currentQuote = req.body.currentQuote;

    const savingAccount = await SavingAccount.findOne();
    const investment = await Investment.findById(invesmentId);

    const totalToBuy = quantityToBuy * currentQuote;

    if (quantityToBuy < 0) {
      const error = new Error('Invalid quantity!! ')
      error.statusCode = 422;
      throw error;
    }

    if (totalToBuy > savingAccount.value) {
      const error = new Error('Limit of saving account money exceed!!')
      error.statusCode = 422;
      throw error;
    }



    savingAccount.value -= totalToBuy;
    const result = await savingAccount.save();

    if (result) {
      investment.quantity += quantityToBuy;
      await investment.save();
    }

    res.status(200).json({ message: 'Buy done!' });


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

exports.sell = async (req, res, next) => {
  try {
    const invesmentId = req.body.investmentId;
    const quantityToSell = req.body.quantity;
    const currentQuote = req.body.currentQuote;

    const savingAccount = await SavingAccount.findOne();
    const investment = await Investment.findById(invesmentId);

    const totalToSell = quantityToSell * currentQuote;

    if (quantityToSell < 0) {
      const error = new Error('Invalid quantity!! ')
      error.statusCode = 422;
      throw error;
    }

    if (investment.quantity < quantityToSell) {
      const error = new Error('Limit Exceed! You dont have that quantity to sell :( ')
      error.statusCode = 422;
      throw error;
    }

    savingAccount.value += totalToSell;
    const result = await savingAccount.save();

    if (result) {
      investment.quantity -= quantityToSell;
      await investment.save();
    }



    res.status(200).json({ message: 'Sell done!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

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
