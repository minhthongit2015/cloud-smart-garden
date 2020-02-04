
const { Optimizers, Losses, Activations } = require('./SupportedAlgorithms');


module.exports = (algorithmKey) => {
  if (!algorithmKey) return null;
  return (algorithmKey in Losses && Losses[algorithmKey].func)
    || (algorithmKey in Activations && Activations[algorithmKey].func)
    || (algorithmKey in Optimizers && Optimizers[algorithmKey].func());
};
