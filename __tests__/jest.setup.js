// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "whatwg-fetch";

import { setupServer } from "msw/node";

export const mockedServer = setupServer(...[]);

beforeAll(() => mockedServer.listen());
afterEach(() => mockedServer.resetHandlers());
afterAll(() => mockedServer.close());
