import * as os from 'os';

const DEFAULT_IP_REG = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

/**
 * 获取当前设备的ip数组 默认的参数为检测ip的正则表达式,若不加入则使用默认的正则表达式
 * @param ipReg ip地址的正则表达式(可选)
 */
export const getIpAddressArray = (ipReg = DEFAULT_IP_REG): string[] => {
  const addressList = new Set<string>();
  const networkInterfaces = os.networkInterfaces();

  Object.keys(networkInterfaces).forEach((key) => {
    const networkAdapters = networkInterfaces[key];
    if (!networkAdapters) return;
    networkAdapters.forEach((networkAdapter) => {
      const { address } = networkAdapter;
      if (address && ipReg.test(address)) {
        addressList.add(address);
      }
    });
  });

  return Array.from(addressList);
};

export default {};
