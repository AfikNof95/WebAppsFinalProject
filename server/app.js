const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const Scraper = require('./scraper/main');
const { webSocketServer: wsServer } = require('./middlewares/webSocketServer');
require('dotenv').config({ path: path.join(__dirname, './.env') });
process.env.rootDir = __dirname;

const PORT = process.env.PORT || 2308;
const app = express();
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.resolve(__dirname, './public')));
app.use(mongoSanitize());
// app.use(logger('combined'));
app.use('/', require('./routes/index'));
app.use(errorHandler);

const runScraper = async () => {
  try {
    console.log('Scraping Amazon: ');
    const response = await Scraper();
  } catch (ex) {
    console.error('Failed scraping Amazon');
    console.error(ex.message);
  }
};

const startServer = async () => {
  try {
    console.log('\nTrying to connect to mongoDB');
    await mongoose.connect(process.env.MONGOURI);
    console.log('MongoDB connected successfully');
    wsServer();
  } catch (ex) {
    console.error(ex.message);
    console.log(ex.stack);
  }

  if (process.argv.indexOf('run-scraper=true') !== -1) {
    await runScraper();
  }

  app.use('/', require('./routes/index'));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    res.status(404).send(createError(404));
  });

  app.listen(PORT, () => {
    console.log(`\nServer is listening on port: ${PORT} \n`);
  });
};

startServer();
module.exports = app;
