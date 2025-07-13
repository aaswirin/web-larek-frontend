/**
 * Тесты для заказа
 */

import { Test } from "../abstract/test";
import { OrderModel } from "../../components/model/orderModel";
import { EventEmitter } from "../../components/base/events";
import { TPaymentType } from "../../types/order/model";

export class OrderTest extends Test {
  protected testData = {
    payment: "offline",
    email: 'boss@grandfather.ru',
    phone: '+71234567890',
    address: 'На деревню дедушке',
  };

  test() {
    try {
      const events = new EventEmitter();

      // 1. Создание и последующее чтение
      const objOrder = new OrderModel(events);
      objOrder.payment = this.testData.payment as TPaymentType;
      objOrder.email = this.testData.email;
      objOrder.phone = this.testData.phone;
      objOrder.address = this.testData.address;

      let data = {
        payment: objOrder.payment,
        email: objOrder.email,
        phone: objOrder.phone,
        address: objOrder.address,
      };

      if (!this.compareResult(data)) {
        this.result = {
          code: 2,
          message: 'После создания объекта и чтении объекта данные не совпали',
        }
      } else {
        // Всё отлично!
        this.result = {
          code: -1,
          message: '',
        }
      }

    } catch (e) {
      this.result = {
        code: 0,
        message: e.message,
      }
    }

    this.consoleResult();
  }
}
