const { _ } = Cypress;
// import { MockProvider } from '@rsksmart/mock-web3-provider'

const address = "0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D";
const privateKey =
  "de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3";

describe("Create Item", function () {
  beforeEach(function () {
    // cy.on("window:before:load", (win) => {
    //     // @ts-expect-error
    //     win.ethereum = new MockProvider({
    //         address,
    //         privateKey,
    //         networkVersion: 31,
    //         debug: true
    //     })
    // })

    // @ts-expect-error
    cy.signupUserAndLogin();
    cy.visit("/item/create");
  });

  it("create single item flow", async () => {
    cy.intercept("/api/items").as("createItem");
    cy.intercept("/api/s3").as("getAwsUrl");
    cy.intercept("https://ak-marketplace.s3.eu-west-3.amazonaws.com/**").as(
      "uploadToAws"
    );
    cy.intercept("/api/items/nftStorage").as("ipfsupload");
    cy.intercept("/api/items/update").as("updateItem");

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
    cy.wait("@createItem");
    cy.wait("@getAwsUrl");
    cy.wait("@uploadToAws");
    cy.wait("@uploadToAws");
    cy.wait("@uploadToAws");
    cy.wait("@createItem");
    cy.wait("@updateItem");
    cy.wait(1000);
    cy.get('[data-cy="dialog-start-action"]').eq(1).click();
    cy.wait("@ipfsupload");
    cy.wait("@updateItem");

    cy.get('[data-cy="dialog-start-action"]').eq(2).click();
    // // @ts-expect-error
    // const responsePromise = win.ethereum.request({ method: 'eth_requestAccounts', params: [] })
    //     .then((accounts: any) => expect(accounts[0]).equal(address))
    // // @ts-expect-error
    // win.ethereum.answerEnable(true)
    // await responsePromise
    cy.get('[data-cy="dialog-checkbox"]').click();
    cy.get('[data-cy="dialog-submit"]').click();
  });

  // it("test error message", () => {
  //     cy.get('[data-cy="submit-input"]').click()
  //     cy.get('[data-cy="image-error"]').should("be.visible")
  //     cy.get('[data-cy="title-error"]').should("be.visible")
  //     cy.get('[data-cy="price-error"]').should("be.visible")
  // })
});

export {};
