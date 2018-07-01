const service = require('../services/storyCalculateService.js');
describe("Function helloWorld", function () {

  it("is defined", function () {
    
    var calculate = service.main("");
    console.log(calculate)
    //expect(calculate.main("As an user i want to login so that i can store my properties ")).not.toBeUndefined();
  });

});