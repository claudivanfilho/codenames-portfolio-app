describe("Use Cases Of Redirects", () => {
  before(() => {
    return cy.exec("npx supabase db reset");
  });
  it("When the user is logged should not be able to access the login page", () => {
    cy.visitRoute("/login");
    cy.login("usertest2");
    cy.expectPathname("/");
    cy.visitRoute("/login");
    cy.expectPathname("/");
  });

  it("When a user is in a room and attempts to access any other route, they should be redirected", () => {
    cy.visitRoute("/login");
    cy.login("usertest2");
    cy.createRoom("room 1").then(async (room) => {
      cy.expectPathname(`/room/${room.id}`);
      cy.visitRoute("/login");
      cy.expectPathname(`/room/${room.id}`);
      cy.visitRoute("/");
      cy.expectPathname(`/room/${room.id}`);
      cy.visitRoute("/invalid-route");
      cy.expectPathname(`/room/${room.id}`);
    });
  });

  it("When a user leave the room he should not be able to return throght the URL", () => {
    cy.visitRoute("/login");
    cy.login("usertest2");
    cy.createRoom("room 1").then(async (room) => {
      cy.expectPathname(`/room/${room.id}`);
      cy.leaveRoom(room.id);
      cy.expectPathname("/");
      cy.visitRoute(`/room/${room.id}`);
      cy.expectPathname("/");
    });
  });
});
