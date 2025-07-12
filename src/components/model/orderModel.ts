/**
 * Модуль описывает модель данных "Заказ"
 */

import { IOrderModel, TPaymentType } from "../../types/order/model";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import {isEmpty} from "../../utils/utils";

/**
 * Класс для заказа
 */
export class OrderModel implements IOrderModel {

  // тип оплаты
  protected _payment: TPaymentType = settings.elements.order.defaultPay as TPaymentType;
  protected _email: string = '';          // почта
  protected _phone: string = '';          // телефон
  protected _address: string = '';        // адрес

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
  /**
   * Геттер для адреса
   */
  validation(data: Partial<IOrderModel>):string {
    let textError: string = '';
    // Тип оплаты
    if (!isEmpty(data.payment) && (data.payment as string === ''))
      textError = textError + 'Необходимо указать тип оплаты. ';
    // Адрес
    console.log(data);

    if (!isEmpty(data.address) && (data.address === ''))
      textError = textError + 'Необходимо указать адрес. ';
    // Почта
    if (!isEmpty(data.email)) {
      if (data.email === '') textError = textError + 'Необходимо указать Email. '
      else if (settings.elements.order.patternEMail.test(data.email))
        textError = textError + 'Укажите действующий Email. '
    }
    // Телефон
    if (!isEmpty(data.phone)) {
      if (data.phone === '') textError = textError + 'Необходимо указать телефон. '
      else if (settings.elements.order.patternPhone.test(data.phone))
        textError = textError + 'Укажите действующий телефон. '
    }
    return textError;
  }
}
