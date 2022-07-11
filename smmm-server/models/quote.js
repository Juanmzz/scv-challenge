const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema(
    {
      investment: {
        type: Schema.Types.ObjectId,
        ref:'Investment',
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Quote', quoteSchema);