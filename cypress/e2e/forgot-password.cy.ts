describe("Forgot Password flow", () => {
  beforeEach(() => {
    cy.visit("/forgot-password");
  });
  it("should allow user to enter email and submit", () => {
    cy.get('[data-testid="email"]').type("user@example.com");
    cy.get('[data-testid="submit"]').should("contain", "Reset Password");
    // cy.url().should('include', '/forgot-password')
    // cy.contains('Check your email')
  });
});

export {};
