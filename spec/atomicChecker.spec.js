const service = require ("../services/Analyzer/atomicChecker.js");
describe("Function atomicchecker", () => {
    it("to check if story is not atomic", () => {
        let result = service(
            "As a developer, I want to finalize the database table changes and additions for the release."
        );
        expect(!result.isAtomic)
    })
    it("to check if story is atomic", () => {
        let result = service(
            "As a developer, I want to finalize the database."
        )
        expect(result.isAtomic)
    })

})