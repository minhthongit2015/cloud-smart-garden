module.exports = {
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  parser: "babel-eslint",
  extends: ["airbnb"],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  plugins: ["react"],
  rules: {
    "indent": ["error", 2],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "import/no-extraneous-dependencies": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/prefer-stateless-function": 0,
    "react/sort-comp": 0,
    "no-plusplus": 0,
    "react/forbid-prop-types": 0,
    "no-param-reassign": 0,
    "no-console": 0,
    "no-alert": 0,
    "no-prompt": 0,
    "jsx-a11y/label-has-associated-control": 0
  }
}
