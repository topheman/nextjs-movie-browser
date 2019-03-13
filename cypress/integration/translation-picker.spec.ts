/// <reference types="cypress" />
/// <reference types="cypress-testing-library" />

describe("TranslationPicker", () => {
  describe("default language (ui) - switching + preserve via cookie", () => {
    before(() => {
      cy.log("clearing cookies");
      cy.clearCookies();
    });
    beforeEach(() => {
      Cypress.Cookies.preserveOnce(
        "i18nDefaultLanguageFullCode",
        "i18nDefaultLanguageShortCode",
        "i18next"
      );
    });
    it("should init with en-US as default language (ui) when no cookie set yet", () => {
      cy.visit("/movie/11-star-wars");
      cy.getByTestId("movie-preview-title").contains("Star Wars (1977)");
      cy.getByTestId("movie-preview-title-synopsis").contains("Synopsis");
      cy.getByTestId("translation-picker-btn").contains("en-US");
      cy.getByTestId("translation-picker-btn").click();
      cy.getByTestId("switch-default-language").should("have.value", "en-US");
    });
    it('should change default language (ui) to "fr-FR"', () => {
      cy.visit("/movie/11-star-wars");
      cy.getByTestId("movie-preview-title").contains("Star Wars (1977)");
      cy.getByTestId("movie-preview-title-synopsis").contains("Synopsis");
      cy.getByTestId("translation-picker-btn").contains("en-US");
      cy.getByTestId("translation-picker-btn").click();
      cy.getByTestId("switch-default-language").select("French");
      cy.getByTestId("movie-preview-title").contains(
        "La Guerre des étoiles (1977)"
      );
      cy.getByTestId("movie-preview-title-synopsis").contains("Résumé");
      cy.getByTestId("translation-picker-btn").contains("fr-FR");
    });
    it("should reload with the default language (ui) from the cookie", () => {
      cy.visit("/movie/11-star-wars");
      cy.getByTestId("translation-picker-btn").contains("fr-FR");
      cy.getByTestId("movie-preview-title").contains(
        "La Guerre des étoiles (1977)"
      );
      cy.getByTestId("movie-preview-title-synopsis").contains("Résumé");
    });
  });
  describe("translations language", () => {
    before(() => {
      cy.log("clearing cookies");
      cy.clearCookies();
    });
    beforeEach(() => {
      Cypress.Cookies.preserveOnce(
        "i18nDefaultLanguageFullCode",
        "i18nDefaultLanguageShortCode",
        "i18next"
      );
    });
    it("should expose language options", () => {
      cy.visit("/movie/11-star-wars");
      cy.getByTestId("movie-preview-title").contains("Star Wars (1977)");
      cy.getByTestId("translation-picker-btn").contains("en-US");
      cy.getByTestId("translation-picker-btn").click();
      cy.get("[data-testid=switch-translation-language]")
        .invoke("html")
        .then(text => {
          expect(text.toString().split("</option><option").length).to.above(1);
        });
    });
  });
});
