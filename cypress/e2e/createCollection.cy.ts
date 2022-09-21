/*
given I am on the create collection route
I have to be loggedin to access the page

*/

describe("Create a Collection", () => {
  it("Should display the create collection form", () => {
    // @ts-ignore
    cy.signupUserAndLogin().then((user) => {
      cy.visit("/collection/create");
    });
  });
});
export {};
