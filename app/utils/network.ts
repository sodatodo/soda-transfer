import * as os from 'os';
import { spawn } from 'cross-spawn';

// eslint-disable-next-line max-len
// const SUB_NET_MASK = /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/;
const STRICT_IP_REG = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // 用于校验字符串整段是否符合IP要求

/**
 * 获取当前设备的ip数组 默认的参数为检测ip的正则表达式,若不加入则使用默认的正则表达式
 * @param ipReg ip地址的正则表达式(可选)
 */
export const getNetworkInterfaceInfoList = (
  ipReg = STRICT_IP_REG,
): os.NetworkInterfaceInfo[] => {
  const addressList = new Set<os.NetworkInterfaceInfo>();
  const networkInterfaces = os.networkInterfaces();

  Object.keys(networkInterfaces).forEach((key) => {
    const networkAdapters = networkInterfaces[key];
    if (!networkAdapters) return;
    networkAdapters.forEach((networkAdapter) => {
      const { address } = networkAdapter;
      if (address && ipReg.test(address)) {
        addressList.add(networkAdapter);
      }
    });
  });

  return Array.from(addressList);
};

export const getNetworkSegment = (address: string, netmask = '255.255.255.0') => {
  if (!address) {
    throw new Error('require address param');
  }
  if (typeof address !== 'string') {
    throw new Error('address must be a string');
  }
  if (typeof netmask !== 'string') {
    throw new Error('address must be a string');
  }

  const addressArr = address.split('.');
  const netmaskArr = netmask.split('.');

  if (addressArr.length !== netmaskArr.length) {
    throw new Error('invalid netmask');
  }
  const networkSegment: any[] = [];
  addressArr.forEach((add, index) => {
    // eslint-disable-next-line no-bitwise
    networkSegment[index] = Number(add) & Number(netmaskArr[index]);
  });
  return {
    address: networkSegment.join('.'),
    netmask,
  };
};

/**
 * 获取 arp 列表信息
 * @return { code: number, data: string }
 * code: 响应码
 * data: arp -a 返回值
 */
export interface ARPData {
  code: number,
  data: Buffer
}
export const getARPData = async () => new Promise<ARPData>((resolve) => {
  const ls = spawn('arp', ['-a']);
  let result: Buffer;

  ls.stdout.on('data', (data: Buffer) => {
    result = data;
  });

  ls.stderr.on('data', (data: Buffer) => {
    result = data;
  });

  ls.on('close', (code: number) => {
    resolve({
      code,
      data: result,
    });
  });
});

const SUB_IP_REG = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])+/;
const SUB_MAC_ADDRESS_REG = /[0-9|a-f|A-F]{1,2}:[0-9|a-f|A-F]{1,2}:[0-9|a-f|A-F]{1,2}:[0-9|a-f|A-F]{1,2}:[0-9|a-f|A-F]{1,2}:[0-9|a-f|A-F]{1,2}/;
/**
 * 按行解析arp返回值
 * @param arpline
 * @param ipReg
 * @param macReg
 */
export const parseArpLine = (
  arpline: string,
  ipReg = SUB_IP_REG,
  macReg = SUB_MAC_ADDRESS_REG,
) => {
  // 当前只做macos的解析
  const arpInfo = {
    address: '',
    mac: '',
  };

  const foundAddress = arpline.match(ipReg);
  const foundMac = arpline.match(macReg);

  if (foundAddress) {
    const address = foundAddress[0];
    if (STRICT_IP_REG.test(address)) {
      arpInfo.address = address;
    }
  }

  if (foundMac && foundMac[0]) {
    // eslint-disable-next-line prefer-destructuring
    arpInfo.mac = foundMac[0];
  }

  return arpInfo;
};

export default {};
