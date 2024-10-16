module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@testing-library/jest-dom$":
      "<rootDir>/node_modules/@testing-library/jest-dom/dist/index.js",
    "^.+\\.(css|scss)$": "identity-obj-proxy", // Mock para archivos CSS/SCSS
    "^.+\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub", // Mock para imágenes y SVGs
  },
};
