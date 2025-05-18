/**
 * Тесты для заказа
 */

import { Test } from "../abstract/test";
import { IOrderModel } from "../../types/order";
import { OrderModel } from "../../components/model/orderModel";
import {EventEmitter} from "../../components/base/events";
import {TIdGoodType} from "../../types/good/model";

export class OrderTest extends Test {
  protected testData: IOrderModel = {
    payment: "offline",
    total: 2200,
    goods: [
      "854cef69-976d-4c2a-a18c-2aa45046c390",
      "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ],
    email: 'boss@grandfather.ru',
    phone: '+71234567890',
    address: 'На деревню дедушке',
  };

  test() {
    try {
      const events = new EventEmitter();

      // 1. Создание и последующее чтение
      const objOrder = new OrderModel(events, this.testData);
      let data: IOrderModel = objOrder.getOrder();

      if (!this.compareResult(data)) {
        this.result = {
          code: 2,
          message: 'После создания объекта и чтении объекта данные не совпали',
        }

        return;
      }

      // 2. Запись и последующее чтение
      objOrder.setOrder(this.testData);
      data = objOrder.getOrder();

      if (!this.compareResult(data)) {
        this.result = {
          code: 3,
          message: 'При записи и чтении объекта данные не совпали',
        }

        return;
      }

      // Всё отлично!
      this.result = {
        code: -1,
        message: '',
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
