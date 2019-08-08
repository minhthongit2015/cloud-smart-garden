const presets = [
  '@babel/preset-env',
  '@babel/preset-react'
];

module.exports = {
  presets,
  plugins: ["react-hot-loader/babel", '@babel/plugin-proposal-class-properties']
};
