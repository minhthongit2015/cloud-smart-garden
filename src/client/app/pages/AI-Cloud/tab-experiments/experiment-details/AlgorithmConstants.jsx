

export default {
  algorithms: [
    { value: 'neural-network', label: 'Neural Network' },
    { value: 'linear-regression', label: 'Linear Regression' },
    { value: 'polynomial-regression', label: 'Polynomial Regression' }
  ],
  optimizers: [
    { value: 'adam', label: 'Adam' },
    { value: 'sgd', label: 'SGD' }
  ],
  losses: [
    { value: 'categoricalCrossentropy', label: 'Categorical Crossentropy' }
    // { value: 'sparseCategoricalCrossentropy', label: 'Sparse Categorical Crossentropy' }
  ],
  activations: [
    { value: 'relu', label: 'Relu' },
    { value: 'softmax', label: 'Softmax' }
  ]
};
