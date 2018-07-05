const service = require('../services/Analyzer/nlpChecker.js');
describe("Function nlpchecker", function () {

  it("to return the right amount of verbs and nouns", function () {
    
    //3 verbs: need, save, edit
    //2 nouns: service, customer
    let result = service("As a Manny’s food service customer, I need to save my list so that I can edit it again.");
    expect(result.verbs == 3)
    expect(result.nouns == 2)
  });

});