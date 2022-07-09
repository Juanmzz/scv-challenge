 const express = require('express');
 const cors = require('cors');
 const mongoose = require('mongoose');
 const errorController = require('./controllers/error');
 const helpers = require('./helpers/initDb');
 
 var env = process.env.NODE_ENV || 'development';
 var config = require('./app.conf.json')[env];

 const app = express();
 app.use(cors());
 app.use(express.json());

 // Routes Middleware
const investmentRoutes = require('./routes/investment');
const savingAccountRoutes = require('./routes/saving-account');
const quoteRoutes = require('./routes/quote');
app.use('/investment', investmentRoutes);
app.use('/saving-account', savingAccountRoutes);
app.use('/quote', quoteRoutes)

// Errors  Middleware
app.use((error,req,res, next) => {
    console.log(error);
    const status =  error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data});

});


app.use(errorController.get404);


// MongoDb Connection
mongoose
  .connect(config.db.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () =>  {
    console.log('Connected!');
    console.log(`Server listening on ${config.server.host}:${config.server.port}`);
    
    // Initialization of db data if it's empty
    await helpers.InitDb();

    app.listen(config.server.port);
  })
  .catch((err) => {
    console.log(err);
  });
