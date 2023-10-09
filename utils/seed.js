// populate database with seed data from data.js

const {userData} = require('./utils/data')

async function seedDb(){
    try{
        await client.connect();
        console.log('Connected to mongoDB');
        
        if(userData.length === 0){
            db.collection('users').insertMany(userData);
        }
    }catch(err){
        console.log('Error:', err.message)
    }
}

module.exports = seedDb;