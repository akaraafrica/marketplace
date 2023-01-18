describe("Login flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should display the login form", () => {
    cy.get("form").should("be.visible");
    cy.get('[data-testid="email"]').type("user@example.com");
    cy.get('[data-testid="password"]').type("password");
    cy.get('[data-testid="submit"]').should("contain", "Log in");
  });
});
export {};
