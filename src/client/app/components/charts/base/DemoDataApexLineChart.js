
let now = Date.now();

const YS = [25, 26, 27, 26.5, 25.5, 24.5, 24, 20, 19, 18.6, 18.4, 18.3, 18.2, 18.1, 18];
const XS = [...new Array(YS.length)].map(() => {
  now += 5 * 60 * 1000;
  return now;
});

export default {
  series: [{
    name: 'Temperature',
    data: XS.map((x, i) => [x, YS[i]])
    // data: y,
  }],
  options: {
    // xaxis: {
    //   categories: x
    // }
  }
};
