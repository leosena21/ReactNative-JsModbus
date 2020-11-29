import api from '../services/api';

export default class ModBusService {
  static GetData() {
    return api.get(`/mod`);
  }

  static WriteCoil(address, type) {
    return api.post(`/mod/coil/${address}/value/${type}`);
  }

  static WriteRegister(address, type) {
    return api.post(`/mod/reg/${address}/value/${type}`);
  }
}
