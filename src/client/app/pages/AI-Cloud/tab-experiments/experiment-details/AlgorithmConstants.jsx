

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
    { value: 'meanSquaredError', label: 'Mean Squared Error' },
    { value: 'absoluteDifference', label: 'Absolute Difference' },
    { value: 'categoricalCrossentropy', label: 'Categorical Crossentropy' }
    // { value: 'sparseCategoricalCrossentropy', label: 'Sparse Categorical Crossentropy' }
  ],
  activations: [
    { value: 'linear', label: 'Linear' },
    { value: 'relu', label: 'Relu' },
    { value: 'softmax', label: 'Softmax' },
    { value: 'sigmoid', label: 'Sigmoid' }
  ]
};
