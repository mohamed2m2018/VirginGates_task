const Vehicle = require('../Vehicle');
class SEDAN extends Vehicle {
  constructor(makeAndModel) {
    super(makeAndModel);
    this.feeForVehicleRental = 50.0;
  }
  calculateRentalRecord(mileage, daysRented, isLate, rewardPoints) {
    let { feeForVehicleRental } = this;
    feeForVehicleRental += 100 * daysRented;
    if (mileage > daysRented * 50)
      feeForVehicleRental += (mileage - daysRented * 50) * 2;

    !isLate
      ? rewardPoints++
      : (feeForVehicleRental += feeForVehicleRental * 0.03);

    return { feeForVehicleRental, editedRewardPoints: rewardPoints };
  }
}

module.exports = SEDAN;
