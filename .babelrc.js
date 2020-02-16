const presets = [
  '@babel/preset-env',
  '@babel/preset-flow',
  '@babel/preset-react',
];

module.exports = {
  presets,
  plugins: ["lodash", "react-hot-loader/babel", '@babel/plugin-proposal-class-properties']
};
