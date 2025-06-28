/**
 * Модуль описывает модель данных "Заказ"
 */

import { IOrderModel, TPaymentType } from "../../types/order/model";
import { IEvents } from "../base/events";

/**
 * Класс для заказа
 */
export class OrderModel implements IOrderModel {

  protected _payment: TPaymentType;    // тип оплаты
  protected _email: string;            // почта
  protected _phone: string;            // телефон
  protected _address: string;          // адрес

  constructor(protected events: IEvents) {
    this.events = events;
  }

  /**
   * Сеттер для типа оплаты
   */
  set payment(value: TPaymentType) {
    this._payment = value;
  }

  /**
   * Геттер для типа оплаты
   */
  get payment() {
    return this._payment;
  }

  /**
   * Сеттер для почты
   */
  set email(value: string) {
    this._email = value;
  }

  /**
   * Геттер для почты
   */
  get email() {
    return this._email;
  }

  /**
   * Сеттер для телефона
   */
  set phone(value: string) {
    this._phone = value;
  }

  /**
   * Геттер для телефона
   */
  get phone():string {
    return this._phone;
  }

  /**
   * Сеттер для адреса
   */
  set address(value: string){
   this._address = value;
  }

  /**
   * Геттер для адреса
   */
  get address() {
    return this._address;
  }

}
