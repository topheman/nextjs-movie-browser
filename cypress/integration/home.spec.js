describe("Home", () => {
  beforeEach(() => {
    // make sure to start from a blank page for each test
    cy.visit("/");
  });
  it("should at correct title", () => {
    cy.title().should("eq", "NextJS Movie Browser");
  });
});
