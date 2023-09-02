/// <reference types="cypress" />

import { Interception } from "cypress/types/net-stubbing";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
//
declare global {
  namespace Cypress {
    interface Chainable {
      visitRoute(route: string): Chainable<AUTWindow>;
      login(username: string): Chainable<Interception>;
      logout(): Chainable<Interception>;
      expectPathname(path: string): Chainable<string>;
      createRoom(name: string): Chainable<{ id: number; correct_words: string[] }>;
      enterRoom(id: number): Chainable<Interception>;
      leaveRoom(id: number): Chainable<Interception>;
      makeTip(id: number, tip: string, tipNumber: number): Chainable<Interception>;
      makeGuess(id: number, words: string[]): Chainable<Interception>;
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {};

Cypress.Commands.add("visitRoute", (route) => {
  return cy.visit(`${Cypress.config().baseUrl}${route}`);
});

Cypress.Commands.add("login", (username) => {
  cy.get("#username").type(username);
  cy.intercept("POST", "/auth/login").as("loginRequest");
  cy.get("button").contains("Log in with username").click();
  return cy.wait("@loginRequest").then((res) => {
    if (res?.response?.statusCode !== 200) {
      throw new Error(`Found an error on request: ${JSON.stringify(res?.response?.body)}`);
    }
  });
});

Cypress.Commands.add("logout", () => {
  cy.intercept("POST", "/auth/logout").as("logoutRequest");
  cy.get("button").contains("Logout").click();
  return cy.wait("@logoutRequest").then((res) => {
    if (res?.response?.statusCode !== 200) {
      throw new Error(`Found an error on request: ${JSON.stringify(res?.response?.body)}`);
    }
  });
});

Cypress.Commands.add("expectPathname", (pathname) => {
  return cy.url().should("match", new RegExp(`${Cypress.config().baseUrl}${pathname}`));
});

Cypress.Commands.add("createRoom", (roomName) => {
  cy.get("#room").type(roomName);
  cy.intercept("POST", "/api/room").as("roomCreate");
  cy.get("button").contains("Create").click();
  return cy.wait("@roomCreate").then((res) => {
    if (res?.response?.statusCode !== 200) {
      throw new Error(`Found an error on request: ${JSON.stringify(res?.response?.body)}`);
    }
    return res?.response?.body;
  });
});

Cypress.Commands.add("enterRoom", (roomId) => {
  cy.intercept("POST", `/api/room/${roomId}/enter`).as("roomEnter");
  cy.get(`[data-testid=row-${roomId}] button`).contains("Enter").click();
  return cy.wait("@roomEnter").then((res) => {
    if (res?.response?.statusCode !== 200) {
      throw new Error(`Found an error on request: ${JSON.stringify(res?.response?.body)}`);
    }
  });
});

Cypress.Commands.add("makeTip", (roomId, tip, tipNumber) => {
  cy.intercept("POST", `/api/room/${roomId}/tip`).as("roomTip");
  cy.get("input[name=Clue]").type(tip);
  cy.get(`[data-testid=input-number-${tipNumber}]`).click();
  cy.get("button").contains("Confirm").click();
  return cy.wait("@roomTip").then((res) => {
    if (res?.response?.statusCode !== 200) {
      throw new Error(`Found an error on request: ${JSON.stringify(res?.response?.body)}`);
    }
  });
});

Cypress.Commands.add("makeGuess", (roomId: number, words: string[]) => {
  cy.intercept("POST", `/api/room/${roomId}/guess`).as("roomGuess");
  words.forEach((word) => {
    cy.get(`[data-testid=card-${word}]`).click();
  });
  cy.get("button").contains("Confirm").click();
  return cy.wait("@roomGuess").then((res) => {
    if (res?.response?.statusCode !== 200) {
      throw new Error(`Found an error on request: ${JSON.stringify(res?.response?.body)}`);
    }
  });
});
