module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": {
        "browsers": [">0.25%", "not ie 11", "not op_mini all"]
      }
    }],
    ["@babel/preset-react", {
      "runtime": "automatic" // This is the key setting
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "automatic" // This ensures React is auto-imported
    }]
  ]
};