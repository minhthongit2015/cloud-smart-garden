

export function getParameters(event, radiusPercent) {
  const [x, y] = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];
  const w = event.currentTarget.width.animVal.value;
  const h = event.currentTarget.height.animVal.value;
  const r = h * radiusPercent;
  const [cx, cy] = [w / 2, h / 2];
  const dx = x - cx;
  const dy = cy - y;
  const d = Math.sqrt(dx * dx + dy * dy);

  return {
    x,
    y,
    w,
    h,
    r,
    cx,
    cy,
    dx,
    dy,
    d
  };
}

export default {
  getParameters
};
