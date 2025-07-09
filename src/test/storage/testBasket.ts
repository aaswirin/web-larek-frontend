/**
 * Тест для хранилища Корзина
 */

import { Test } from "../abstract/test";
import { TIdGoodType } from "../../types";
import { LarekStorage } from "../../components/storage/storage";
import { IBasketModel } from "../../types/basket/model";
import { isEmpty } from "../../utils/utils";

export class StorageBasketTest extends Test {
  protected today:Date = new Date();

  protected testData = {
    editDate: this.today,
    goods: new Map<TIdGoodType, number>([
      ["854cef69-976d-4c2a-a18c-2aa45046c390", 1],
      ["c101ab44-ed99-4a54-990d-47aa2bb4e7d9", 2],
    ]),
  };

  test() {
    const storage = new LarekStorage();
    // Предохранить что было в хранилище
    const oldBasket: Partial<IBasketModel> = storage.loadBasket()

    try {
      // 1. Запись и последующее чтение
      storage.saveBasket(this.testData);
      const data: Partial<IBasketModel> = storage.loadBasket();

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
      if (isEmpty(oldBasket)) {
        storage.clearBasket();
      } else {
        storage.saveBasket(oldBasket);
      }
    }

    this.consoleResult();
  }
}
