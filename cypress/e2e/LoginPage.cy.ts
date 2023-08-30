describe("Use cases of the Login Page", () => {
  before((done) => {
    // cy.exec("supabase status").then((res) => {
    //   const anonKey = res.stdout.match(/anon key:(.*)\n/)[0].slice(10, -1);
    //   expect(anonKey).eq(4);
    //   done();
    // });
    cy.exec("npm run reset").then(() => {
      done();
    });
  });
  it("when initiated without a user logged should redirect to the login page", () => {
    cy.visit(`${Cypress.config().baseUrl}/`);
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("when logged with a username should redirect to main page", () => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
    cy.get("#username").type("usertest2");
    cy.get("button").contains("Log in with username").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
