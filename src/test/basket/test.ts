/**
 * Тесты для корзины
 */

import { Test } from "../abstract/test";
import { BasketModel } from "../../components/model/basketModel";
import {EventEmitter} from "../../components/base/events";
import {TIdGoodType} from "../../types";

export class BasketTest extends Test {
  protected today:Date = new Date();

  protected testData = {
    editDate: this.today,
    goods: new Set<TIdGoodType>([
      "854cef69-976d-4c2a-a18c-2aa45046c390",
      "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]),
  };

  test() {
    try {
      const events = new EventEmitter();                // Брокер событий

      // 1. Создание и последующее чтение
      const objBasket = new BasketModel(events);
      objBasket.editDate = this.today;
      objBasket.addGood("854cef69-976d-4c2a-a18c-2aa45046c390");
      objBasket.addGood("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");

      const data = {
        editDate: objBasket.editDate,
        goods: objBasket.goods,
      }

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
