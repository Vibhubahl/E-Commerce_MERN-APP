const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const cors = require ('cors');
const { readdirSync } = require("fs");
require('dotenv').config();

const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const app = express();

mongoose.connect('mongodb://localhost:27017/ecom',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connected Successfully"))
.catch(err=>console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors());

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.listen(4000,()=>{
    console.log("Server Started On Port 4000")
})