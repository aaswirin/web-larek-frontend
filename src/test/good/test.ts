/**
 * Тесты для товара
 */

import { Test } from "../abstract/test";
import { IGoodModel } from "../../types/good";
import { Good } from "../../components/goodModel";

export class GoodTest extends Test {
  protected testData: IGoodModel = {
    id: '854cef69-976d-4c2a-a18c-2aa45046c390',
    description: 'Если планируете решать задачи в тренажёре, берите два.',
    image: '/5_Dots.svg',
    title: '+1 час в сутках',
    category: 'софт-скил',
    price: 750,
  };

  test() {
    try {
      // 1. Создание и последующее чтение
      const objGood = new Good(this.testData);
      let data: IGoodModel = objGood.getGood();

      if (!this.compareResult(data)) {
        this.result = {
          code: 2,
          message: 'После создания объекта и чтении объекта данные не совпали',
        }

        return;
      }

      // 2. Запись и последующее чтение
      objGood.setGood(this.testData);
      data = objGood.getGood();

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
        code: -1,
        message: e.message,
      }
    }
  }
}
