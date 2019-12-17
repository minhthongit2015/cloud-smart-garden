

export default {
  algorithm: [
    { value: 'neural-network', label: 'Neural Network' },
    { value: 'linear-regression', label: 'Linear Regression' },
    { value: 'polynomial-regression', label: 'Polynomial Regression' }
  ],
  optimizer: [
    { value: 'adam', label: 'Adam' },
    { value: 'sgd', label: 'SGD' }
  ],
  loss: [
    { value: 'sparseCategoricalCrossentropy', label: 'Sparse Categorical Crossentropy' }
  ],
  activation: [
    { value: 'relu', label: 'Relu' },
    { value: 'softmax', label: 'Softmax' }
  ]
};
