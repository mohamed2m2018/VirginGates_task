class Result {
  constructor(customerName) {
    this.customerName = customerName;
    this.makeAndModelList = [];
    this.feeForVehicleRentalList = [];
    this.totalRental=0;
    this.rewardPoints=0;
  }

  addToMakeAndModelList (makeAndModel) {
    this.makeAndModelList.push(makeAndModel);
  };

  addToFeeForVehicleRentalList (feeForVehicleRental){
    this.feeForVehicleRentalList.push(feeForVehicleRental);
  };

  setTotalRental (totalRental) {
    this.totalRental = totalRental;
  };

  setRewardPoints (rewardPoints) {
    this.rewardPoints = rewardPoints;
  };

  outputResult() {
    throw new Error('This method must be overwritten!');
  }
}

module.exports=Result;