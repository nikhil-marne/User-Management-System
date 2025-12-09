import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  // 1. GLOBAL CONFIG (Default to Node.js for the whole project)
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  // 2. BROWSER OVERRIDE (Only for files in public/scripts)
  {
    files: ["public/scripts/**/*.js"], // <--- Matches your client-side folder
    languageOptions: {
      globals: {
        ...globals.browser, // <--- Adds document, window, alert, etc.
      },
    },
  },
];
