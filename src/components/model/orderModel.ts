/**
 * Модуль описывает модель данных "Заказ"
 * @module
 */
import { IOrderModel, TPaymentType } from "../../types/order";
import { IBayerModel } from "../../types/bayer";

/**
 * Класс для заказа
 *
 * @class Order
 *   @property {TPaymentType} payment тип оплаты
 *   @property {number} total сумма заказа
 *   @property {string[]} items id заказанных товаров
 *   @property {IBayerModel} bayer покупатель
 */
export class Order {
  protected payment: TPaymentType;  // тип оплаты
  protected total: number;          // сумма заказа
  protected items: string[];        // id заказанных товаров
  protected bayer: IBayerModel;     // покупатель

  constructor(data: IOrderModel) {
    this.setOrder(data);
  }

  getOrder(): IOrderModel {
    return {
      payment: this.payment,
      total: this.total,
      items: this.items.slice(),
      bayer: {...this.bayer},
    }
  }

  setOrder(data: IOrderModel): void {
    this.payment = data.payment;
    this.total = data.total;
    this.items = data.items.slice();
    this.bayer = {...data.bayer};
  }

}
