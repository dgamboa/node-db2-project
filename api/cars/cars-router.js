// DO YOUR MAGIC
const router = require('express').Router();
const Car = require('./cars-model');
const { checkCarId,
        checkCarPayload,
        checkVinNumberUnique,
        checkVinNumberValid } = require('./cars-middleware');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.getAll();
    res.json(cars);
  } catch(err) { next(err) }
});

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch(err) { next(err) }
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try {
    console.log("here")
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch(err) { next(err) }
});

module.exports = router;