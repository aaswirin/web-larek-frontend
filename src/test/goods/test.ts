/**
 * Тесты для модели товара
 */

import { Test } from "../abstract/test";
import { TListGoods } from "../../types/good/model";
import { GoodsModel } from "../../components/model/goodsModel";
import { EventEmitter } from "../../components/base/events";


export class GoodTest extends Test {
  protected testData: TListGoods;

  test() {
    try {
      this.testData = new Map();

      this.testData.set(
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        { id: '854cef69-976d-4c2a-a18c-2aa45046c390',
          description: 'Если планируете решать задачи в тренажёре, берите два.',
          image: '/5_Dots.svg',
          title: '+1 час в сутках',
          category: 'софт-скил',
          price: 750,
        });
      this.testData.set(
        "54df7dcb-1213-4b3c-ab61-92ed5f845535",
        { id: "54df7dcb-1213-4b3c-ab61-92ed5f845535",
          description: "Измените локацию для поиска работы.",
          image: "/Polygon.svg",
          title: "Портативный телепорт",
          category: "другое",
          price: 100000
      });

      const events = new EventEmitter();                // Брокер событий

      // 1. Создание и последующее чтение
      const objGoods = new GoodsModel(events);
      objGoods.goods = this.testData
      let data = objGoods.goods;

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
