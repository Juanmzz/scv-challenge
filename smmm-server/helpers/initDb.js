const fs = require("fs");
const Investment = require("../models/investment");
const investmentsDataPath = "./mocks/investments.json";
const SavingAccount = require("../models/saving-account");
const Quote = require("../models/quote");
const quotesDataPath = "./mocks/quotes.json";

module.exports = {

    async InitDb() {
    const investments = await Investment.find();

    if (investments.length === 0) {
        const jsonData = fs.readFileSync(investmentsDataPath);

        console.log("Creating data for Investments......");

        Investment.collection.insertMany(JSON.parse(jsonData));
        console.log("Done!");
    }

    const savingAccount = await SavingAccount.find();

    if (savingAccount.length === 0) {
        const newSavingAccount = new SavingAccount({
        currency: "AR$",
        value: 50000,
        });

        console.log("Creating data for SavingAccount......");

        Investment.collection.insertOne(newSavingAccount);
        console.log("Done!");
    }

    const quotes = await Quote.find();

    if (quotes.length === 0) {
        const investments = await Investment.find();

        const jsonData = JSON.parse(fs.readFileSync(quotesDataPath));

        for (let i = 0; i < jsonData.length; i++) {
        const quote = jsonData[i];
        const auxIndex = quote.investment;
        quote.investment = { _id: investments[auxIndex - 1]._id };
        }

        console.log("Creating data for Quotes......");

        Quote.collection.insertMany(jsonData);
        console.log("Done!");
    }
    }

};