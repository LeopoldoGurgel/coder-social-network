const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const {seedDb} = require('./utils/seed.js')


const PORT = 3001;
const app = express();

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

const db = client.db('coder_sn_DB');

seedDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
