const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const mongoDB = require('./server/database/connection')


dotenv.config({path:'.env'});
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

//database connection

mongoDB();



//parse request 
app.use(bodyparser.urlencoded({extended:true}))
//view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/image',express.static(path.resolve(__dirname,"assets/image")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load router

app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)})