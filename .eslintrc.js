module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": "off",
        "semi": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": 0,
        'no-unused-expressions': 'off', // Disable the rule that checks for unused expressions,
        'no-unused-labels': 'error', // Enable the rule that checks for unused labels,
        'no-unused-vars': 0, // Customize the rule for unused variables
    },
}
