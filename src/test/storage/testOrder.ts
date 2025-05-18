/**
 * Тест для хранилища Покупатель
 */

import { Test } from "../abstract/test";
import { LarekStorage } from "../../components/storage/storage";
import { IOrderModel } from "../../types/order";
import {isEmpty} from "../../utils/utils";

export class StorageOrderTest extends Test {
  protected testData: Partial<IOrderModel>  = {
    payment: 'offline',
    total: 333,
    email: 'boss@grandfather.ru',
    phone: '+71234567890',
    address: 'На деревню дедушке'
  };

  test() {
    const storage = new LarekStorage();
    // Предохранить что было в хранилище
    const oldOrder: Partial<IOrderModel> = storage.loadOrder();

    try {
      // 1. Запись и последующее чтение
      storage.saveOrder(this.testData);
      const data: Partial<IOrderModel> = storage.loadOrder();

      if (!this.compareResult(data)) {
        this.result = {
          code: 2,
          message: 'После создания объекта и чтении объекта данные не совпали',
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
    } finally {
      // Восстановить хранилище
      if (!isEmpty(oldOrder)) storage.saveOrder(oldOrder);
    }

    this.consoleResult();
  }
}
