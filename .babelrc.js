const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-flow'
];

// if (process.env["ENV"] === "prod") {
//   plugins.push(...);
// }


module.exports = {
  presets,
  plugins: ["react-hot-loader/babel", '@babel/plugin-proposal-class-properties']
};
