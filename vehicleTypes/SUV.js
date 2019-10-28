const Vehicle = require('../Vehicle');

class SUV extends Vehicle {
  constructor(makeAndModel) {
    super(makeAndModel);
    this.feeForVehicleRental = 50.0;
  }

  calculateRentalRecord(mileage, daysRented, isLate, rewardPoints) {
    let { feeForVehicleRental } = this;
    feeForVehicleRental += 150 * daysRented;
    if (mileage > daysRented * 70)
      feeForVehicleRental += (mileage - daysRented * 70) * 2;
    if (mileage > 200) feeForVehicleRental -= feeForVehicleRental * 0.05;

    if (!isLate) {
      rewardPoints = rewardPoints + 1;
      if (daysRented > 5) rewardPoints += daysRented - 5;
    } else feeForVehicleRental += feeForVehicleRental * 0.03;

    return { feeForVehicleRental, editedRewardPoints: rewardPoints };
  }
}
module.exports = SUV;
