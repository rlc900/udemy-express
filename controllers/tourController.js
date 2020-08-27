const fs = require('fs')


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid input'
    })
  }
  next();
}

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
  response.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here...'
    }
  })
}

exports.deleteTour = (request, response) => {
  response.status(204).json({
    status: 'success',
    data: null
  })
}
