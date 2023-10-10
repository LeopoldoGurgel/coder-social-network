const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

const userData = [
  {username: 'Leo Gurgel', email: 'leogurgel@hotmail.com'},
  {username: 'Sal Hobby', email: 'salhobby@hotmail.com'},
  {username: 'Will Smith', email: 'willsmith@hotmail.com'},
  {username: 'Mark Alfano', email: 'markalfano@hotmail.com'},
  {username: 'John Doe', email: 'johndoe@hotmail.com'},
  {username: 'Bilbo Baggins', email: 'bilbobaggins@hotmail.com'},
  {username: 'Mickey Mouse', email: 'mickeymouse@hotmail.com'},
  {username: 'Ariana Grande', email: 'arianagrande@hotmail.com'},
  {username: 'Max Verstappen', email: 'maxverstappen@hotmail.com'},
  {username: 'Peter Parker', email: 'peterparker@hotmail.com'},
]

async function seedDb(){
    try{
        if(userData.length === 0){
            db.collection('users').insertMany(userData);
            const result = await db.collection('users').insertMany;(userData);
            console.log(result)
        }
    }catch(err){
        console.log('Error:', err.message)
    }
}

seedDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
