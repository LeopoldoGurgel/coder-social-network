// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally

const { connect, connection} = require('mongoose');

// The reason you don't see db being declared in the connection.js file is because it's being implicitly defined as the default connection to MongoDB using Mongoose.

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coder_sn_DB';

try {
    connect(connectionString);
    console.log("connected to db")
}catch(err){
    console.error("error:", err.message)
}

module.exports = connection;