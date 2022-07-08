const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Investment', investmentSchema);