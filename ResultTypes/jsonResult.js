const Result = require('../Result');

class jsonResult extends Result {
  constructor(customerName) {
    super(customerName);
    this.result = {};
    this.individualRecords = {};
    }
  

  outputResult (){
    let {
      result,
      individualRecords,
      customerName,
      makeAndModelList,
      feeForVehicleRentalList,
      totalRental,
      rewardPoints,
    } = this;
    
    result.customerName = customerName;

    //for each model store its already calculated rental value 

    makeAndModelList.forEach((makeAndModel,index)=>{

      individualRecords[makeAndModel] = `${feeForVehicleRentalList[index]} L.E`;

    });

    result.customerRecords = individualRecords;
    result.totalRental = `${totalRental} L.E`;
    result.rewardPoints = `${rewardPoints} points`;
    return JSON.stringify(result);
  };
}

module.exports = jsonResult;
