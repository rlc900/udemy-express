const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const app = express();

// creating middleware: a function that can modify the incoming request data; added to request object; in between the request and response; returns a function

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());


app.use((request, response, next) => {
  console.log('Hello from the middleware!')
  // NEVER FORGET TO USE NEXT
  next();
})

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    results: tours.length,
    data: {
      tours //variable tours
    }
  })
};

const getOneTour = (request, response) => {
  // console.log(request.params);
  // this will create an array which only contains the element if the comparison ends up being true
  const id = request.params.id * 1;
  const tour = tours.find(ele => ele.id === id);

  if (!tour) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID'})
  }

  response.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tour //variable tours
    }
  });
}

const createTour = (request, response) => {
  // console.log(request.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, request.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    // 201 === created
    response.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

const updateTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  response.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here...'
    }
  })
}

const deleteTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  response.status(204).json({
    status: 'success',
    data: null
  })
}


// USER FUNCTIONS
const getAllUsers = (request, response) => {
  response(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const getOneUser = (request, response) => {
  response(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const createUser = (request, response) => {
  response(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const updateUser = (request, response) => {
  response(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const deleteUser = (request, response) => {
  response(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour)

app.route('/api/v1/tours/:id')
.get(getOneTour)
.patch(updateTour)
.delete(deleteTour)

app.route('/api/v1/users')
.get(getAllUsers)
.post(createUser)

api.route('/api/v1/users/:id')
.get(getOneUser)
.patch(updateUser)
.delete(deleteUser)


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`)
});
