/// <reference types="cypress" />
/// <reference types="cypress-testing-library" />

describe("Miscellaneous", () => {
  beforeEach(() => {
    // make sure to start from a blank page for each test
    cy.visit("/about");
  });
  it("should have correct title", () => {
    cy.title().should("eq", "NextJS Movie Browser");
  });
  describe("accessibility (a11y)", () => {
    beforeEach(() => {
      // make sure to start from a blank page for each test
      cy.visit("/about");
    });
    // use https://github.com/Bkucera/cypress-plugin-tab
    it("should navigate with tab (drawer closed)", () => {
      cy.get("body")
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "aria-label", "Menu"))
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "href", "/"))
        .tab()
        .then(el =>
          cy
            .wrap(el)
            .should("have.attr", "data-testid", "translation-picker-btn")
        )
        .tab()
        .then(el =>
          cy.wrap(el).should("have.attr", "title", "@topheman on twitter")
        )
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "title", "Fork on github"))
        .tab()
        .then(el =>
          cy
            .wrap(el)
            .should("have.attr", "aria-labelledby", "resources-search-label")
        );
    });
    // use https://github.com/Bkucera/cypress-plugin-tab
    it("should navigate with tab (drawer open)", () => {
      cy.get("[aria-label=Menu]").click(); // todo - should tab and press enter
      cy.getByTestId("sidebar").should("be.visible");
      cy.get("body")
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "aria-label", "Menu"))
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "href", "/"))
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "href", "/about"))
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "href", "/qrcode"))
        .tab()
        .then(el =>
          cy
            .wrap(el)
            .should(
              "have.attr",
              "href",
              "https://github.com/topheman/nextjs-movie-browser"
            )
        )
        .tab()
        .then(el =>
          cy
            .wrap(el)
            .should("have.attr", "href", "https://twitter.com/topheman")
        )
        .tab()
        .then(el =>
          cy.wrap(el).should("have.attr", "href", "http://labs.topheman.com")
        )
        .tab()
        .then(el => cy.wrap(el).should("have.attr", "href", "/"));
    });
  });
});
