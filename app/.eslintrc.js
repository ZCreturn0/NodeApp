module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "off"
        ],
        "semi": [
            2, "always"
        ],
        "no-console": [
            "off"
        ],
        'no-unused-vars': 0
    }
};