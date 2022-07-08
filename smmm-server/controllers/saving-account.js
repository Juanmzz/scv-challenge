
const SavingAccount = require("../models/saving-account");

exports.get = async (req, res, next) => {
    try {
      const savingAccount = await SavingAccount.find();
  
      res.status(200).json(savingAccount);
    } catch (err) {
      throw err;
    }
  };