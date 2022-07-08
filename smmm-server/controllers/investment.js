const fs = require("fs");
const investmentsDataPath = "./mocks/investments.json";

exports.getAll = async (req, res, next) => {
  try {
    const jsonData = fs.readFileSync(investmentsDataPath);

    return res.status(200).send(jsonData);
  } catch (err) {
    throw err;
  }
};
