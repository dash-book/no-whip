import { defineConfig } from "cypress";

const config = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

export default config;
