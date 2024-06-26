const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const auth = require('./routes/auth');
const course = require('./routes/course');
const cors = require('cors');

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/v1/auth', auth);
app.use('/api/v1/course', course);

app.use('/',(req,res)=>{
    res.send("This is Earthed backend");
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server runnig in ',process.env.NODE_ENV, 'mode on ' + process.env.HOST + '/api/v1'));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`);
    server.close(()=>process.exit(1));
})