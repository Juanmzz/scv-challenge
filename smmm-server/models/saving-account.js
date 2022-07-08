const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savingAccountSchema = new Schema(
    {
      currency: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      }, 
    });
  
  module.exports = mongoose.model('SavingAccount', savingAccountSchema);