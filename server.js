const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const mongoose = require('mongoose');
const app =require('./index');

const url =process.env.DATABASE_URL.replace('<password>' ,process.env.PASSWORD);

mongoose.connect(url).then(()=>console.log("connect to the database success"))





app.listen(process.env.PORT ||8000 ,()=>{
    console.log(`Server is running on port ${process.env.PORT}` )
})





