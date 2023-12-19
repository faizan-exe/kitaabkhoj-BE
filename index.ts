
import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { dbObj } from './config'; // Your database configuration
import { notFoundHandler } from './helpers'
import routes from './routes'
const http = require('http')
const cors = require('cors');


import dbInit from './db/init'

const app = express();
const port = process.env.PORT || 3000; // Port to listen on



// await dbInit();
app.use(express.json()); // Add this middleware to parse JSON request bodies
app.use('/uploads', express.static('uploads'));
app.use(cors());


 app.use('/v1', routes)
 app.use('*', notFoundHandler) 


 const server = http.createServer(app);

 async function initializeApp() {
  try {
    await dbInit(); 
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

initializeApp();

// Create Sequelize instance and authenticate 
const sequelize = new Sequelize({
  username: dbObj.user,
  password: dbObj.password,
  database: dbObj.database,
  host: dbObj.host,
  port: dbObj.port,
  dialect: 'postgres', // Specify the dialect
  models: [], // Define your models here
});

server.listen(port, (_error: any) => {
  if (_error) {
    return console.error('Error: ', _error)
  }
  sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  const appBaseUrl = '127.0.0.1:' + port
  console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ '${appBaseUrl}'`)

})



