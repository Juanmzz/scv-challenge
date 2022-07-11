const SavingAccount = require("../models/saving-account");

exports.get = async (req, res, next) => {
  try {
    const savingAccount = await SavingAccount.findOne();

    res.status(200).json(savingAccount);
  } catch (err) {
    throw err;
  }
};

exports.addMoney = async (req, res, next) => {
  try {
    const value = req.body.value;

    if (!value || value < 0) {
      const error = new Error("Incorrect value");
      error.statusCode = 422;
      throw error;
    }
    const savingAccount = await SavingAccount.findOne();

    savingAccount.value += value;
    const result = await savingAccount.save();

    res.status(200).json({ message: 'Saving Account updated!', savingAccount: result});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
