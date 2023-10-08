const express =require('express');
const morgan = require('morgan');
const globalErrorHandler= require('./controllers/errorController');
const app =express();

const usersRouter =require('./routers/userRouter');
const toursRouter =require('./routers/tourRouter');
const AppErrorRouter =require('./utils/appErorr');
const AppError = require('./utils/appErorr');




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


//To handel unhandeled routes
//all mean all http methods
app.all('*' ,(req ,res ,next)=>{
  /*   res.status(404).json({
        "status":"fail" ,
        "message":"Unhandeled route"
    }) */
    next(new AppError('Unhandeled route' ,404));
})

app.use(globalErrorHandler)
module.exports =app;