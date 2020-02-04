

module.exports = {
  dontChange: { key: '', message: 'Nên để mặc định' },
  inRange: { key: '', message: (a, b) => `Thay đổi trong khoảng: ${a} -> ${b}` },
  decrese: { key: '', message: (a, b, step) => `Giảm dần từ ${a} -> ${b}, mỗi lần giảm khoảng ${step}` },
  increse: { key: '', message: (a, b, step) => `Tăng dần dần từ ${a} -> ${b}, mỗi lần tăng khoảng ${step}` },
  learningRate: { key: '', message: 'Giảm nhỏ hơn nếu thấy sai số không giảm, hoặc tăng lên nếu thấy có giảm nhưng giảm rất chậm' }
};
