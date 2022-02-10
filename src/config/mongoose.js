import mongoose from 'mongoose';

// set mongoose Promise to Bluebird
mongoose.Promise = global.Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = (uri) => {
    // print mongoose logs in dev env
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    return mongoose.connection;
};