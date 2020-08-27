const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// creating middleware: a function that can modify the incoming request data; added to request object; in between the request and response; returns a function

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());


app.use((request, response, next) => {
  // console.log('Hello from the middleware!')
  // NEVER FORGET TO USE NEXT
  next();
})

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
})

// mount middleware routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
