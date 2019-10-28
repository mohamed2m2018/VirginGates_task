class Vehicle {
  constructor(makeAndModel) {
   // private members
    const _makeAndModel = makeAndModel;

    this.getMakeAndModel=()=>_makeAndModel;
  }

  calculateRentalRecord() {
    throw new Error("This method must be overwritten!");
  }


 
}

module.exports = Vehicle;