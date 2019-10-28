const Vehicle = require('../Vehicle');

class FOURxFOUR extends Vehicle {
  constructor(makeAndModel) {
    super(makeAndModel);
    this.feeForVehicleRental = 50.0;
  }

  calculateRentalRecord(_mileage, daysRented, isLate, rewardPoints) {
    let { feeForVehicleRental } = this;
    feeForVehicleRental += 200 * daysRented;
    if (daysRented > 10) feeForVehicleRental -= feeForVehicleRental * 0.05;

    if (!isLate) rewardPoints = ++rewardPoints * 2;
    else feeForVehicleRental += feeForVehicleRental * 0.03;

    return { feeForVehicleRental, editedRewardPoints: rewardPoints };
  }
}

module.exports = FOURxFOUR;
