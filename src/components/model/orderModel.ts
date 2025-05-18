/**
 * Модуль описывает модель данных "Заказ"
 * @module
 */
import { IOrderModel, TPaymentType } from "../../types/order";
import { TIdGoodType } from "../../types/good/model";
import { IEvents } from "../base/events";
import { isEmpty } from "../../utils/utils";

/**
 * Класс для заказа
 *
 * @class Order
 *   @property {TPaymentType} payment тип оплаты
 *   @property {number} total сумма заказа
 *   @property {TIdGoodType[]} goods id заказанных товаров
 *   @property {string} email почта
 *   @property {string} phone телефон
 *   @property {string} address адрес
 *  */
export class OrderModel {
  protected payment: TPaymentType;    // тип оплаты
  protected total: number;            // сумма заказа
  protected goods: TIdGoodType[];     // id заказанных товаров
  protected email: string;            // почта
  protected phone: string;            // телефон
  protected address: string;          // адрес

  constructor(protected events: IEvents, data: Partial<IOrderModel>) {
    if (!isEmpty(data)) this.setOrder(data);
  }

  getOrder(): IOrderModel {
    return {
      payment: this.payment,
      total: this.total,
      goods: this.goods,
      email: this.email,
      phone: this.phone,
      address: this.address,
    }
  }

  setOrder(data: Partial<IOrderModel>): void {
    if (!isEmpty(data.payment)) this.payment = data.payment;
    if (!isEmpty(data.total)) this.total = data.total;
    if (!isEmpty(data.goods)) this.goods = data.goods;
    if (!isEmpty(data.email)) this.email = data.email;
    if (!isEmpty(data.phone)) this.phone = data.phone;
    if (!isEmpty(data.address)) this.address = data.address;
  }

  getGoods(): TIdGoodType[] {
    return this.goods;
  }

  setGoods(data: TIdGoodType[]): void {
    this.goods = data;
  }

}
