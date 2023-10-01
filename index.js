const express =require('express');
const morgan = require('morgan');
const app =express();

const usersRouter =require('./routers/userRouter');
const toursRouter =require('./routers/tourRouter');




app.use(express.json()) //parse incoming request with json



if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
}
app.use((req ,res ,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/users' ,usersRouter);
app.use('/api/v1/tours' ,toursRouter);

module.exports =app;