

export default class {
  static recordsToLine(records,
    keys = ['temperature', 'humidity', 'light'],
    colors = [
      'hsl(227, 70%, 50%)', 'hsl(240, 70%, 50%)',
      'hsl(170, 70%, 50%)', 'hsl(93, 70%, 50%)',
      'hsl(322, 70%, 50%)'
    ]) {
    const defaultColor = 'hsl(227, 70%, 50%)';
    return keys.map((key, i) => this.splitToLine(records, key, colors[i] || defaultColor));
  }

  static splitToLine(records, key, color) {
    return {
      id: key,
      color,
      data: records.map(record => ({
        x: record.createdAt,
        y: record.state[key]
      }))
    };
  }
}
