const express = require('express');
const tourController = require('./../controllers/tourController')
// tourRouter is a middleware
const router = express.Router();

router.param('id', tourController.checkID)

router.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour)

router.route('/:id')
.get(tourController.getOneTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)


module.exports = router;
