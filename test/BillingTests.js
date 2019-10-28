const assert = require('chai').assert;
const Rental = require('../Rental.js');
const Customer = require('../Customer.js');
const {
  VehicleFactory,
  VEHICLES,
} = require('../factoryPattern/VehicleFactory');
const { FORMATS } = require('../factoryPattern/resultFactory');

//creating vehicles
const factory = new VehicleFactory();
const blueHonda = factory.createVehicle('Blue Honda 2008', VEHICLES.SEDAN);
const greyJeep = factory.createVehicle('Grey Jeep 2013', VEHICLES.FOURxFOUR);
const RedSunny = factory.createVehicle('Red Sunny 2014', VEHICLES.SEDAN);
const BlueBMW = factory.createVehicle('Blue X3 2017', VEHICLES.SUV);

//Test JSON output

describe('The JSON output should', () => {
  it('satisfy current JSON expectation', () => {
    const hondaRental = new Rental(blueHonda, 431, 4, false);
    const jeepRental = new Rental(greyJeep, 744, 4, false);
    const sunnnyRental = new Rental(RedSunny, 591, 3, true);
    const x3Rental = new Rental(BlueBMW, 240, 5, false);

    const virginGates = new Customer('Virgin Gates');
    const sharmDreams = new Customer('Sharm Dreams');

    virginGates.addRental(hondaRental);
    virginGates.addRental(jeepRental);
    virginGates.addRental(sunnnyRental);

    sharmDreams.addRental(x3Rental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: {
          'Blue Honda 2008': '912 L.E',
          'Grey Jeep 2013': '850 L.E',
          'Red Sunny 2014': '1268.96 L.E',
        },
        totalRental: '3030.96 L.E',
        rewardPoints: '4 points',
      })
    );

    assert.equal(
      sharmDreams.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Sharm Dreams',
        customerRecords: { 'Blue X3 2017': '760 L.E' },
        totalRental: '760 L.E',
        rewardPoints: '1 points',
      })
    );
  });
});

//Test fourxfour rental calculations

describe('The FourxFour output should', () => {
  it('match current expectation in case days rented > 10 ', () => {
    const jeepRental = new Rental(greyJeep, 744, 11, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(jeepRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Grey Jeep 2013': '2137.5 L.E' },
        totalRental: '2137.5 L.E',
        rewardPoints: '2 points',
      })
    );
  });

  it('match current expectation in case days rented < 10', () => {
    const jeepRental = new Rental(greyJeep, 744, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(jeepRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Grey Jeep 2013': '450 L.E' },
        totalRental: '450 L.E',
        rewardPoints: '2 points',
      })
    );
  });

  it('match current expectation in case of customer being late', () => {
    const jeepRental = new Rental(greyJeep, 3939, 14, true);
    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(jeepRental);
    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Grey Jeep 2013': '2788.725 L.E' },
        totalRental: '2788.725 L.E',
        rewardPoints: '0 points',
      })
    );
  });

  it('match current expectation in case of customer is not late', () => {
    const jeepRental = new Rental(greyJeep, 3939, 14, false);
    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(jeepRental);
    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Grey Jeep 2013': '2707.5 L.E' },
        totalRental: '2707.5 L.E',
        rewardPoints: '2 points',
      })
    );
  });
});

//Test SEDAN rental calculations

describe('The SEDAN output should', () => {
  it('match current expectation in case mileage > daysRented * 50 ', () => {
    const hondaRental = new Rental(blueHonda, 744, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(hondaRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue Honda 2008': '1538 L.E' },
        totalRental: '1538 L.E',
        rewardPoints: '1 points',
      })
    );
  });

  it('match current expectation in case days mileage < daysRented * 50', () => {
    const hondaRental = new Rental(blueHonda, 30, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(hondaRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue Honda 2008': '250 L.E' },
        totalRental: '250 L.E',
        rewardPoints: '1 points',
      })
    );
  });

  it('match current expectation in case of customer being late', () => {
    const hondaRental = new Rental(blueHonda, 744, 2, true);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(hondaRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue Honda 2008': '1584.14 L.E' },
        totalRental: '1584.14 L.E',
        rewardPoints: '0 points',
      })
    );
  });

  it('match current expectation in case of customer is not late', () => {
    const hondaRental = new Rental(blueHonda, 744, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(hondaRental);
    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue Honda 2008': '1538 L.E' },
        totalRental: '1538 L.E',
        rewardPoints: '1 points',
      })
    );
  });
});

//Test SUV rental calculations

describe('The SUV vehicle output should', () => {
  it('match current expectation in case mileage > daysRented * 70 ', () => {
    const bmwRental = new Rental(BlueBMW, 744, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '1480.1 L.E' },
        totalRental: '1480.1 L.E',
        rewardPoints: '1 points',
      })
    );
  });

  it('match current expectation in case days mileage < daysRented * 70', () => {
    const bmwRental = new Rental(BlueBMW, 10, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '350 L.E' },
        totalRental: '350 L.E',
        rewardPoints: '1 points',
      })
    );
  });

  it('match current expectation in case of customer being late', () => {
    const bmwRental = new Rental(BlueBMW, 744, 2, true);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '1524.503 L.E' },
        totalRental: '1524.503 L.E',
        rewardPoints: '0 points',
      })
    );
  });

  it('match current expectation in case of customer is not late', () => {
    const bmwRental = new Rental(BlueBMW, 744, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '1480.1 L.E' },
        totalRental: '1480.1 L.E',
        rewardPoints: '1 points',
      })
    );
  });

  it('match current expectation in case of customer is not late and days rented > 5', () => {
    const bmwRental = new Rental(BlueBMW, 744, 7, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '1527.6 L.E' },
        totalRental: '1527.6 L.E',
        rewardPoints: '3 points',
      })
    );
  });

  it('match current expectation in case of mileage>200', () => {
    const bmwRental = new Rental(BlueBMW, 744, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '1480.1 L.E' },
        totalRental: '1480.1 L.E',
        rewardPoints: '1 points',
      })
    );
  });

  it('match current expectation in case of mileage < 200', () => {
    const bmwRental = new Rental(BlueBMW, 10, 2, false);

    const virginGates = new Customer('Virgin Gates');

    virginGates.addRental(bmwRental);

    assert.equal(
      virginGates.getCustomerRentalRecord(FORMATS.JSON),
      JSON.stringify({
        customerName: 'Virgin Gates',
        customerRecords: { 'Blue X3 2017': '350 L.E' },
        totalRental: '350 L.E',
        rewardPoints: '1 points',
      })
    );
  });
});
