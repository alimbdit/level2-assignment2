// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";

// import js from "@eslint/js";
// import ts from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser";

// export default [
//   js.configs.recommended,
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     files: ["*.ts", "*.tsx"],
//     languageOptions: {
//       parser: tsParser,
//       globals: {
//         ...globals.browser,
//         process: "readonly",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": ts,
//     },
//     rules: {
//       ...ts.configs.recommended.rules,
//     },
//   },
//   {
//     files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
//     ignores: ["**/node_modules/", ".dist/"],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         process: "readonly",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": ts,
//     },

//     rules: {
//       "no-unused-vars": "error",
//       "no-undef": "error",
//       "no-unused-expressions": "error",
//       "prefer-const": "error",
//       "no-console": "warn",
//     },
//   },
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import ts from "@typescript-eslint/eslint-plugin";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["**/*.env/", "**/dist/", "**/node_modules/"],
  },
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
  },
  {
    plugins: {
      "@typescript-eslint": ts,
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
];
