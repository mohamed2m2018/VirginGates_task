const {resultFactory}=require('./factoryPattern/resultFactory');
class Customer {
  constructor(name) {
    this.CustomerName = name;
    this.rentals = [];
  }

  addRental(newRental) {
    this.rentals.push(newRental);
  }

  getCustomerName() {
    return this.CustomerName;
  }

  getCustomerRentalRecord(format) {
    let totalRental = 0;
    let rewardPoints = 0;
    const factory=new resultFactory();
    const resultFormat=factory.createResultFormat(format,this.CustomerName);

    this.rentals.forEach((rental) => {
      const { getMileage, getDaysRented, isLate, getVehicle } = rental;
      let vehicle = getVehicle();
      resultFormat.addToMakeAndModelList(vehicle.getMakeAndModel());
      let {feeForVehicleRental, editedRewardPoints} = vehicle.calculateRentalRecord(
        getMileage(),
        getDaysRented(),
        isLate(),
        rewardPoints
      );

      resultFormat.addToFeeForVehicleRentalList(feeForVehicleRental);

      totalRental+=feeForVehicleRental;
      rewardPoints = editedRewardPoints;


    });

    resultFormat.setTotalRental(totalRental);
    resultFormat.setRewardPoints(rewardPoints);

    return resultFormat.outputResult();
  }
}

module.exports = Customer;
