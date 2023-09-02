describe("Use Cases Of The Helper Gamming", () => {
  before(() => {
    return cy.exec("npm run reset");
  });
  it("when following the correct steps should win the game", () => {
    cy.visitRoute("/login");
    cy.login("userhelper");
    cy.createRoom("room 1").then(async (room) => {
      await (cy as any).expectPathname("/room/[0-9]+$");
      await (cy as any).logout();
      await (cy as any).login("userguesser");
      await (cy as any).enterRoom(room.id);
      await (cy as any).logout();
      await (cy as any).login("userhelper");
      await (cy as any).enterRoom(room.id);
      await (cy as any).makeTip(room.id, "Dica 1", 1);
      await (cy as any).logout();
      await (cy as any).login("userguesser");
      await (cy as any).enterRoom(room.id);
      await (cy as any).makeGuess(room.id, [room.correct_words[0]]);
      await (cy as any).logout();
      await (cy as any).login("userhelper");
      await (cy as any).enterRoom(room.id);
      await (cy as any).makeTip(room.id, "Dica 2", 5);
      await (cy as any).logout();
      await (cy as any).login("userguesser");
      await (cy as any).enterRoom(room.id);
      await (cy as any).makeGuess(room.id, room.correct_words.slice(1, 6)!);
      cy.get("[data-testid=game-alert]").should("contain", "Congratulations!! You won!!! 🎉");
    });
  });
});
