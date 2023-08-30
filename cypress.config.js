import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "s8kmno",
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  retries: 2,
});
