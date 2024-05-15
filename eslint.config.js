// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["node_modules", "dist"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_"
        }
      ],
      "camelcase": ["error", {properties: "always"}],
      "max-len": ["error", {code: 120}],
      "eol-last": ["error", "always"],
      "prefer-const": "error",
      "func-style": ["error", "declaration"],
      "prefer-arrow-callback": "error",
      "no-console": "error"
    }
  }
);
