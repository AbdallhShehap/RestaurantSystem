const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/restaurants', restaurantController.getAllRestaurants);
router.post('/restaurants', restaurantController.createRestaurant);

module.exports = router;
