const express = require('express');
const connection = require('./config/db');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req,res)=>{
    res.send('welcome to cointab backend')
})

app.use('/register', userController)

app.listen(5000, async ()=>{
    try{
        await connection;
        console.log('database is connected')
    }
    catch(err){
        console.log('connection error',err)
    }
    console.log('server is started')
})