// @ts-check

import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    ignores: ["node_modules", "dist", ".*"],
  },
  {
    plugins: {
      "@stylistic": stylistic,
    },
  },
  {
    rules: {
      "no-extra-semi": "off",
      "no-mixed-spaces-and-tabs": "off",
      "no-unexpected-multiline": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      indent: ["error", 2],
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
        },
      ],
      camelcase: ["error", { properties: "always" }],
      "max-len": ["error", { code: 120 }],
      "eol-last": ["error", "always"],
      "prefer-const": "error",
      "func-style": ["error", "declaration"],
      "prefer-arrow-callback": "error",
    },
  },
  eslintConfigPrettier,
);
