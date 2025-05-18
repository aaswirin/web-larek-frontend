/**
 * Тест для хранилища Корзина
 */

import { Test } from "../abstract/test";
import {IBasketModel} from "../../types/basket/model";
import {TIdGoodType} from "../../types/good/model";
import {LarekStorage} from "../../components/storage/storage";

export class StorageBasketTest extends Test {
  protected today: Date = new Date();

  protected testData: IBasketModel  = {
      startDate: this.today,
      goods: new Set<TIdGoodType>(['GUID первого товара', 'GUID второго товара']),
  };

  test() {
    const storage = new LarekStorage();
    // Предохранить что было в хранилище
    const oldBasket: IBasketModel = storage.loadBasket()

    try {
      // 1. Запись и последующее чтение
      storage.saveBasket(this.testData);
      const data: IBasketModel = storage.loadBasket();

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
      storage.saveBasket(oldBasket);
    }

    this.consoleResult();
  }
}
