const jsonResult = require('../ResultTypes/jsonResult');
const textResult = require('../ResultTypes/textResult');

const resultsConstructors = {
  JSON: jsonResult,
  TEXT: textResult,
};


//strings' constants that represents format types to be used by createResultFormat method

const FORMATS = {
  JSON: 'JSON',
  TEXT: 'TEXT',
};

class resultFactory {
  createResultFormat(format,customerName) {
    //pick the suitable constructor
    const resultConstructor = resultsConstructors[format];
    
    const result = new resultConstructor(customerName);
    return result;
  }
}

module.exports = { resultFactory, FORMATS };
