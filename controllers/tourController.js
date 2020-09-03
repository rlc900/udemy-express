const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// 2A) TOURS CONTROLLERS
exports.getAllTours = async (request, response) => {
  try {
    const tours = await Tour.find()

    response.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours //variable tours
      }
    })
  } catch (err) {
    response.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getOneTour = async (request, response) => {
  // this will create an array which only contains the element if the comparison ends up being true
  try {
    const tour = await Tour.findById(request.params.id);
    response.status(200).json({
      status: 'success',
      data: {
        tour //variable tours
      }
    });
  } catch (err) {
    response.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    })
  }
};

exports.updateTour = (request, response) => {
  response.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here...'
    }
  });
};

exports.deleteTour = (request, response) => {
  response.status(204).json({
    status: 'success',
    data: null
  });
};
