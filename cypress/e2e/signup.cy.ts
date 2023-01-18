// import currentProvider from "@rsksmart/mock-web3-provider";
// import { mock } from 'depay-web3-mock'

describe("Signup flow", () => {
  // const address = "0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D";
  // const privateKey =
  //     "de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3";
  // beforeEach(() => {
  //     cy.on("window:before:load", (win) => {
  //         win.ethereum = new currentProvider({
  //           address,
  //           privateKey,
  //           networkVersion: 31,
  //           debug: true
  //         })
  //       })
  // });
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should display the signup form", () => {
    cy.get("form").should("be.visible");
    cy.get('input[type="file"]').selectFile("./public/assets/example.png", {
      force: true,
    });
    cy.get('[data-testid="fullname"]').type("John doe");
    cy.get('[data-testid="username"]').type("Johndoe");
    cy.get('[data-testid="email"]').type("user@example.com");
    cy.get('[data-testid="password"]').type("password");
    cy.get('[data-testid="confirmPassword"]').type("password");
    cy.get('[data-testid="gender"]').click();
    cy.get('[data-testid="dob"]').type("2000-01-01");
    cy.get('[data-testid="submit"]').should("contain", "Sign up");
  });

  // it('redirects to Google sign-in page', () => {
  //     cy.get('[data-testid=google]').click();
  //     cy.should('open', 'https://accounts.google.com/signin');
  //     // cy.visit('/signup');
  // });
});
export {};
