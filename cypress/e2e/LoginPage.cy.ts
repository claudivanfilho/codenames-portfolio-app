describe("Use cases of the Login Page", () => {
  // before((done) => {
  //   cy.exec("npm run reset").then(() => {
  //     done();
  //   });
  // });
  it("when initiated without a user logged should redirect to the login page", () => {
    cy.visit(`${Cypress.config().baseUrl}/`);
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("when logged with a username should redirect to main page", () => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
    cy.get("#username").type("usertest2");
    cy.intercept("POST", "/auth/login").as("loginRequest");
    cy.get("button").contains("Log in with username").click();
    cy.wait("@loginRequest").then((res) => {
      if (res.response.statusCode !== 200) {
        throw new Error(`Found an error on request: ${JSON.stringify(res.response.body)}`);
      }
    });
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
