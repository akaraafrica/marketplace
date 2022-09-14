const { _ } = Cypress;

describe("Create Item", function () {
  beforeEach(function () {
    cy.visit("/item/create");
  });

  it("create single item flow", function () {
    cy.contains("Create single item", { matchCase: false });
    cy.get('[data-cy="main-image-upload"]').selectFile(
      "cypress/fixtures/ape.png",
      { force: true }
    );
    cy.get('[data-cy="optional1-image-upload"]').selectFile(
      "cypress/fixtures/ape.png",
      { force: true }
    );
    cy.get('[data-cy="optional2-image-upload"]').selectFile(
      "cypress/fixtures/ape.png",
      { force: true }
    );
    cy.get('[data-cy="optional3-image-upload"]').selectFile(
      "cypress/fixtures/ape.png",
      { force: true }
    );
    cy.get('[data-cy="title-input"]').type("NFT title");
    cy.get('[data-cy="title-preview"]').contains("NFT title");
    cy.get("#description-input").type("NFT description");
    cy.get('[data-cy="royalties-select"]').select("10%");
    cy.get('[data-cy="price-input"]').type("3");
    cy.get('[data-cy="price-preview"]').contains("3");
    cy.get('[data-cy="published-checkbox"]').click();
    cy.get('[data-cy="submit-input"]').click();
    cy.get('[data-cy="action-dialog"]').should("be.visible");
    cy.get('[data-cy="dialog-header"]').contains("Follow steps");
    cy.get('[data-cy="dialog-close"]').should("be.visible");
    cy.contains("Upload files", { matchCase: false });
    cy.contains("Mint token", { matchCase: false });
    cy.contains("Upload files", { matchCase: false });
    cy.contains("sign sell order", { matchCase: false });
    cy.contains("agree terms and condition", { matchCase: false });
    cy.get('[data-cy="dialog-start-action"]').should("have.length", 3);
    cy.get('[data-cy="dialog-start-action"]').eq(0).should("not.be.disabled");
    cy.get('[data-cy="dialog-start-action"]').eq(1).should("be.disabled");
    cy.get('[data-cy="dialog-start-action"]').eq(2).should("be.disabled");
    cy.get('[data-cy="dialog-submit"]').should("be.disabled");
    cy.get('[data-cy="dialog-start-action"]').eq(0).click();
  });

  // it("test error message", () => {
  //     cy.get('[data-cy="submit-input"]').click()
  //     cy.get('[data-cy="image-error"]').should("be.visible")
  //     cy.get('[data-cy="title-error"]').should("be.visible")
  //     cy.get('[data-cy="price-error"]').should("be.visible")
  // })
});

export {};
