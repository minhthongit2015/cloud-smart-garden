
let tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

let colors = require("colors");

async function test() {
  let model = tf.sequential();
  
  model.add(
    tf.layers.dense({ units: 1, inputShape: [1] })
  );
  
  model.compile({
    optimizer: 'sgd',
    loss: 'meanSquaredError'
  });
  
  const xs = tf.tensor1d([1.2, 2.4, 3.5, 4.71, 5.98, 6.168, 7.779, 8.182, 9.59, 2.16, 7.042, 10.71, 5.313, 7.97, 5.654, 9.7, 3.11]);
  const ys = tf.tensor1d([4.6, 5.7, 6.9, 9.19, 10.684, 12.53, 23.366, 32.596, 42.53, 1.22, 2.87, 3.45, 1.65, 2.904, 2.42, 2.4, 1.31]);
  
  model.fit(xs, ys)
  
  await model.save("file://./src/AI-ML/assets/test")
    .catch((err) => console.log(err))
    .then((rs) => console.log(rs));
}

test();

console.log("tfnode");
