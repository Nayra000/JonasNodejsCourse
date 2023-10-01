const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});



const app =require('./index');








app.listen(process.env.PORT ||8000 ,()=>{
    console.log(`Server is running on port ${process.env.PORT}` )
})





