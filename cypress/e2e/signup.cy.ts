// import { mock } from '@depay/web3-mock'
const { _ } = Cypress;
const address = "0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D";
const privateKey =
  "de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3";

describe("signup flow", function () {
  beforeEach(function () {
    // mock('ethereum')
    cy.visit("/signup");
  });

  it("render signup page", function () {
    cy.contains("Sign Up");
    cy.contains("Sign up with your email and password");
    cy.get('[data-cy="signup-label-Email"]');
    cy.get('[data-cy="signup-label-Password"]');

    cy.get('[data-cy="signup-email"]').type("user@test.com");
    cy.get('[data-cy="signup-password"]').type("user@test.com");
    cy.get('[data-cy="signup-submit-button"]').click();
    // const responsePromise = this.provider.request({ method: 'eth_requestAccounts', params: [] })
    //     .then((accounts: any) => expect(accounts[0]).toEqual(address))

    // this.provider.answerEnable(true)
  });
});

export {};
