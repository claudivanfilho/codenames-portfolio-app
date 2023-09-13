describe("Use Cases Of The Authentication", () => {
  it("when initiated without a user logged should redirect to the login page", () => {
    cy.visitRoute("/");
    cy.expectPathname("/login");
  });

  it("when logged with a username should redirect to main page", () => {
    cy.visitRoute("/login");
    cy.login("usertest");
    cy.expectPathname("/");
  });

  it("when lougged out should redirect to login page", () => {
    cy.visitRoute("/login");
    cy.login("usertest");
    cy.logout();
    cy.expectPathname("/login");
  });
});
