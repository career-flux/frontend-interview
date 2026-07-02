import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "**/*.d.ts",
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    ".turbo/**",
    ".vercel/**",
  ]),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2015,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  prettier,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      "no-var": "error",
      "no-implicit-coercion": "error",
      "no-unused-vars": "off",
      "no-unused-expressions": "warn",
      "no-duplicate-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-object-has-own": "error",
      "no-warning-comments": [
        "warn",
        { terms: ["TODO", "FIXME", "XXX", "BUG"], location: "anywhere" },
      ],

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$"],
            ["^@?\\w"],
            ["^node:"],
            ["^@/"],
            [
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
            ],
            [
              "^.+\\.module\\.s?css$",
              "^.+\\.s?css$",
              "^.+\\.(png|jpe?g|svg|gif|webp)$",
            ],
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/html-has-lang": "warn",
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true, caughtErrors: "none" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          selector: "variable",
          leadingUnderscore: "allow",
        },
        { format: ["camelCase", "PascalCase"], selector: "function" },
        { format: ["PascalCase"], selector: "interface" },
        { format: ["PascalCase"], selector: "typeAlias" },
        { format: ["PascalCase"], selector: "enum" },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "private-static-field",
            "public-instance-field",
            "private-instance-field",
            "public-constructor",
            "private-constructor",
            "public-instance-method",
            "private-instance-method",
          ],
        },
      ],
    },
  },
]);
