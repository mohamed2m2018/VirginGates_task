const assert = require('chai').assert;
const Rental = require('../Rental.js');
const Customer = require('../Customer.js');
const {VehicleFactory,VEHICLES}=require('../factoryPattern/VehicleFactory');
const {FORMATS}=require('../factoryPattern/resultFactory');

describe('The Statement should:', () => {
  it('Match current behavior', () => {

    const factory=new VehicleFactory();
    const blueHonda =factory.createVehicle('Blue Honda 2008', VEHICLES.SEDAN);
    const greyJeep = factory.createVehicle('Grey Jeep 2013', VEHICLES.FOURxFOUR);
    const RedSunny = factory.createVehicle('Red Sunny 2014', VEHICLES.SEDAN);
    const BlueBMW = factory.createVehicle('Blue X3 2017', VEHICLES.SUV);
    

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
      virginGates.getCustomerRentalRecord(FORMATS.TEXT),
      'Rental Record for:Virgin Gates\n\t"Blue Honda 2008"\tLE 912.00\n\t"Grey Jeep 2013"\tLE 850.00\n\t"Red Sunny 2014"\tLE 1268.96\nAmount owed is LE 3030.96\nYou earned: 4 new Reward Points\n\n'
    );
    assert.equal(
      sharmDreams.getCustomerRentalRecord(FORMATS.TEXT),
      'Rental Record for:Sharm Dreams\n\t"Blue X3 2017"\tLE 760.00\nAmount owed is LE 760.00\nYou earned: 1 new Reward Points\n\n'
    );
  });
});
