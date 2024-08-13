const Restaurant = require('../models/restaurantModel');

exports.getAllRestaurants = (req, res) => {
  Restaurant.getAll((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    results.forEach(restaurant => {
      try {
        restaurant.menuItems = JSON.parse(restaurant.menuItems);
        restaurant.selectedItems = JSON.parse(restaurant.selectedItems);
        restaurant.servingTimes = JSON.parse(restaurant.servingTimes);
        restaurant.landmarks = JSON.parse(restaurant.landmarks);
      } catch (parseErr) {
        return res.status(500).send('Error parsing JSON fields');
      }
    });

    res.json(results);
  });
};

exports.createRestaurant = (req, res) => {
  const newRestaurant = {
    ...req.body,
    menuItems: JSON.stringify(req.body.menuItems),
    selectedItems: JSON.stringify(req.body.selectedItems),
    servingTimes: JSON.stringify(req.body.servingTimes),
    landmarks: JSON.stringify(req.body.landmarks)
  };

  Restaurant.create(newRestaurant, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, ...newRestaurant });
  });
};
