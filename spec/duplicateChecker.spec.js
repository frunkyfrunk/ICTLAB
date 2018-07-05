const service = require("../services/Analyzer/duplicateChecker.js");
describe("Function duplicatechecker", function() {
  it("should find a duplicate", function() {
    let result = service([
      "As a developer, I want to finalize the database table changes and additions for the release so that we don’t have to make changes to the model later.",
      "As a developer, I want to finalize the database table changes and additions for the release so that we don’t have to make changes to the model later."
    ], 0.8);
    if(result.length != 1){
      throw new Error('test failed');
    }
  });
  it("should not find a duplicate", function() {
    let result = service([
      "As a developer, I want to finalize the database table changes and additions for the release so that we don’t have to make changes to the model later.",
      "As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant."
    ], 0.8);
    if(result.length != 0){
      throw new Error('test failed');
    }
  });
});
