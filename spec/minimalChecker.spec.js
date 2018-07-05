const service = require("../services/Analyzer/minimalChecker.js");
describe('Function minimal checker', () => {
    it("to check if function is minimal", () => {
        let result = service(
            "As a developer, I want to finalize the database table changes"
        )
        expect(result.length == 0)
    })
    it("to check if function is not minimal", () => {
        let result = service(
            "As a developer, I want [to] finalize [the] database table."
        )
        expect(result.length < 0)
    })
})