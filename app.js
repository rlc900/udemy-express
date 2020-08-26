const fs = require('fs')
const express = require('express');

const app = express();

// creating middleware: a function that can modify the incoming request data; added to request object
app.use(express.json());

// app.get('/', (request, response) => {
//   response
//   .status(200)
//   .json(
//     {message: 'Hello from the server side!',
//     app: 'Natours'}
//   )
// })
//
// app.post('/', (request, response) => {
//   response.send('You can post to this URL!')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours //variable tours
    }
  });
});

app.get('/api/v1/tours/:id', (request, response) => {
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
});

app.post('/api/v1/tours', (request, response) => {
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
});

app.patch('/api/v1/tours/:id', (request, response) => {
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
})

app.delete('/api/v1/tours/:id', (request, response) => {
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
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on${port}`)
});
