/* eslint-disable no-underscore-dangle */
class Rental {
  constructor(vehicle, mileage, daysRented, lateFee) {
    // private members
    const _vehicle = vehicle;
    const _kilometersRented = mileage;
    const _daysRented = daysRented;
    const _lateFee = lateFee;

    this.getMileage = () => _kilometersRented;
    this.getVehicle = () => _vehicle;
    this.getDaysRented = () => _daysRented;
    this.isLate = () => _lateFee;
  }
}

module.exports = Rental;
