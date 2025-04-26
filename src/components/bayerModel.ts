/**
 * Модуль описывает модель данных "Покупатель"
 * @module
 */
import { IBayerModel } from "../types/bayer"

/**
 * Класс для покупателя
 *
 * @class Bayer
 *   @property {string} email почта
 *   @property {string} phone телефон
 *   @property {string} address адрес покупателя
 */
export class Bayer {
  protected email: string;     // почта
  protected phone: string;     // телефон
  protected address: string;   // адрес

  constructor(data: IBayerModel) {
    this.setBayer(data);
  }

  getBayer(): IBayerModel {
    return {
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  setBayer(data: IBayerModel): void {
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
  }
}
