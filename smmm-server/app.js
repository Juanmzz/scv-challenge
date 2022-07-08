 const express = require('express');

 var env = process.env.NODE_ENV || 'development';
 var config = require('./app.conf.json')[env];

 const app = express();

 // Routes Middleware
const investmentRoutes = require('./routes/investment');
app.use('/investment', investmentRoutes);


// Errors  Middleware
const errorController = require('./controllers/error');
app.use(errorController.get404);

app.listen(config.server.port);

