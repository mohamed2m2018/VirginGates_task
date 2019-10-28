const Result = require('../Result');

class TextResult extends Result {
  constructor(customerName) {
    super(customerName);
    this.result = '';
  }
  outputResult() {
    let {
      result,
      customerName,
      makeAndModelList,
      feeForVehicleRentalList,
      totalRental,
      rewardPoints,
    } = this;

    result = `Rental Record for:${customerName}\n`;

    //for each model calculate its already calculated rental value

    makeAndModelList.forEach((makeAndModel, index) => {
      result += `\t"${makeAndModel}"\tLE ${feeForVehicleRentalList[
        index
      ].toFixed(2)}\n`;
    });

    result += `Amount owed is LE ${totalRental.toFixed(
      2
    )}\nYou earned: ${rewardPoints} new Reward Points\n\n`;

    return result;
  }
}

module.exports = TextResult;
