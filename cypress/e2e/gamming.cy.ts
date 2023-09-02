describe("Use Cases Of The Gamming", () => {
  it("when guessing all the correct words should win the game", () => {
    cy.visitRoute("/login");
    cy.login("userhelper");
    cy.createRoom("room 1").then(async (room) => {
      cy.expectPathname(`/room/${room.id}`);
      cy.logout();
      cy.login("userguesser");
      cy.enterRoom(room.id);
      cy.logout();
      cy.login("userhelper");
      cy.enterRoom(room.id);
      cy.makeTip(room.id, "Dica 1", 1);
      cy.logout();
      cy.login("userguesser");
      cy.enterRoom(room.id);
      cy.makeGuess(room.id, [room.correct_words[0]]);
      cy.logout();
      cy.login("userhelper");
      cy.enterRoom(room.id);
      cy.makeTip(room.id, "Dica 2", 5);
      cy.logout();
      cy.login("userguesser");
      cy.enterRoom(room.id);
      cy.makeGuess(room.id, room.correct_words.slice(1, 6)!);
      cy.get("[data-testid=game-alert]").should("contain", "Congratulations!! You won!!! 🎉");
    });
  });

  it("when guessing an incorrect word should lose the game", () => {
    cy.visitRoute("/login");
    cy.login("userhelper");
    cy.createRoom("room 1").then(async (room) => {
      cy.expectPathname(`/room/${room.id}`);
      cy.logout();
      cy.login("userguesser");
      cy.enterRoom(room.id);
      cy.logout();
      cy.login("userhelper");
      cy.enterRoom(room.id);
      cy.makeTip(room.id, "Dica 1", 1);
      cy.logout();
      cy.login("userguesser");
      cy.enterRoom(room.id);
      const incorrectWord = room.words.find((word) => !room.correct_words.includes(word));
      cy.makeGuess(room.id, [incorrectWord!]);
      cy.get("[data-testid=game-alert]").should("contain", "You made a mistake 😔");
    });
  });
});
