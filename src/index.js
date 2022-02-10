import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import mongoose from './config/mongoose';
import routes from './api/routes/';

// setting port value
const PORT = 3000;

/**
* Express instance
* @public
*/
const app = express();

// open mongoose connection
mongoose.connect(process.env.MONGODB_URI);

// request logging. dev: console | production: file
app.use(morgan('combined'));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.use('/', routes);


// listen to requests
app.listen(process.env.PORT || 3001);

module.exports = app;