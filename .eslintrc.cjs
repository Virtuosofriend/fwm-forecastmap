/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier/skip-formatting"
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": ["error", "double"],
        "indent": ["error", 4],
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/comma-dangle": ["error", {
            "arrays": "never",
            "objects": "always-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "never",
        }],
        "@typescript-eslint/no-explicit-any": "off",
        "object-curly-spacing": ["error", "always"],
        "no-unused-vars": 0,
        "vue/no-unused-vars": 0,
        "vue/no-unused-components": 0,
        "vue/require-name-property": ["error"],
        "vue/prop-name-casing": ["error", "camelCase"],

    },
};
