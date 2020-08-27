const fs = require('fs')


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// 2A) TOURS CONTROLLERS
exports.getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    results: tours.length,
    data: {
      tours //variable tours
    }
  })
};

exports.getOneTour = (request, response) => {
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

exports.createTour = (request, response) => {
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

exports.updateTour = (request, response) => {
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

exports.deleteTour = (request, response) => {
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
