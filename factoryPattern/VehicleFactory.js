const SUV = require('../vehicleTypes/SUV');
const SEDAN = require('../vehicleTypes/SEDAN');
const FOURxFOUR = require('../vehicleTypes/FOURxFOUR');


const VehiclesConstructors = {
  SUV,
  SEDAN,
  FOURxFOUR,
};

//strings' constants that represents vehicles types to be used by createVehicle method

const VEHICLES = {
  SUV: 'SUV',
  SEDAN: 'SEDAN',
  FOURxFOUR: 'FOURxFOUR',
};

class VehicleFactory {
  createVehicle(makeAndModel, vehicletype) {
    //pick the suitable constructor
    const vehicleConstructor = VehiclesConstructors[vehicletype];

    const vehicle = new vehicleConstructor(makeAndModel);
    return vehicle;
  }
}

module.exports = { VehicleFactory, VEHICLES };
