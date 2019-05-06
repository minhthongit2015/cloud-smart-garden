const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-flow'
];

module.exports = {
  presets,
  plugins: ['@babel/plugin-proposal-class-properties']
};
