const express =require('express');
const morgan = require('morgan');
const helmet =require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp = require('hpp');
const globalErrorHandler= require('./controllers/errorController');
const usersRouter =require('./routers/userRouter');
const toursRouter =require('./routers/tourRouter');
const AppError = require('./utils/appErorr');



const app =express();

//set security http header
app.use(helmet());

//limit requests from the same IP
const limiter =rateLimit({
    max:100,
    window:60*60*1000,
    message: 'To many requests from the same IP , please try again in an hour'
})
app.use('/api',limiter)

//parse incoming request with json
app.use(express.json({limit:'10kb'})) 

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist :[ 'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price']
}));


if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
}

//Test middelwares
app.use((req ,res ,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


//Routes
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