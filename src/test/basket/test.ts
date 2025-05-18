/**
 * Тесты для корзины
 */

import { Test } from "../abstract/test";
import { IBasketModel } from "../../types/basket/model";
import { BasketModel } from "../../components/model/basketModel";
import {TIdGoodType} from "../../types/good/model";
import {EventEmitter} from "../../components/base/events";

export class BasketTest extends Test {
  protected today:Date = new Date();

  protected testData: IBasketModel = {
    startDate: new Date(),
    goods: new Set([
      "854cef69-976d-4c2a-a18c-2aa45046c390",
      "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]),
  };

  test() {
    try {
      const events = new EventEmitter();                // Брокер событий

      // 1. Создание и последующее чтение
      const objBasket = new BasketModel(events, this.testData);
      let data =
      {
        startDate: objBasket.startDate,           // Дата и время начала формирования корзины
        goods: new Set(objBasket.getGoods()),
      }

      if (!this.compareResult(data)) {
        this.result = {
          code: 2,
          message: 'После создания объекта и чтении объекта данные не совпали',
        }

        return;
      }

      // 2. Запись и последующее чтение
      objBasket.setGoods(Array.from(this.testData.goods));
      data =
        {
          startDate: objBasket.startDate,           // Дата и время начала формирования корзины
          goods: new Set(objBasket.getGoods()),
        }

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
