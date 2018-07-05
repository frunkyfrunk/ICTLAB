const service = require("../services/Analyzer/formChecker.js");
describe("Function formchecker", function() {
  it("to find all the forms", function() {
    let result = service(
      "As a developer, I want to finalize the database table changes and additions for the release so that we don’t have to make changes to the model later."
    );
    expect(result.isWellFormed)
  });
  it("to do not find all the forms", function() {
    let result = service(
      "As a developer, I want to finalize the database table changes and additions for the release."
    );
    expect(!result.isWellFormed)
  });
});
