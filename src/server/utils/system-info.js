
const os = require('os');
const colors = require('colors/safe');

module.exports = class SystemInfo {
  static listInterfaces() {
    return os.networkInterfaces();
  }

  static listAllLocalIP() {
    const localIPs = [];
    const interfaces = SystemInfo.listInterfaces();
    Object.keys(interfaces).forEach((interfaceName) => {
      interfaces[interfaceName].forEach((iface) => {
        if (iface.family !== 'IPv4' || iface.internal !== false) {
          return;
        }
        localIPs.push(iface.address);
      });
    });
    return localIPs;
  }

  static getFirstLocalIP() {
    return SystemInfo.listAllLocalIP()[0];
  }

  static showServerPorts(port, serverDebug) {
    const interfaces = SystemInfo.listInterfaces();
    serverDebug(colors.underline('[Server running at] > '));
    Object.keys(interfaces).forEach((interfaceName) => {
      let alias = 0;
      interfaces[interfaceName].forEach((iface) => {
        if (iface.family !== 'IPv4' || iface.internal !== false) {
          return;
        }
        if (alias >= 1) {
          serverDebug('  + ', `(${interfaceName}/${alias}) ${colors.red(iface.address)}:${colors.red(port)}`);
        } else {
          serverDebug('  + ', `(${interfaceName}) ${colors.red(iface.address)}:${colors.red(port)}`);
        }
        alias += 1;
      });
    });
  }
};
