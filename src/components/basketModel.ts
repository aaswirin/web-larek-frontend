/**
 * Модуль описывает модель данных "Корзина"
 * @module
 */
import { IBasketModel } from "../types/basket";
import { isEmpty } from "../utils/utils";

/**
 * Класс для корзины
 *
 * @class Basket
 *   @property {Date} startDate Дата и время начала формирования корзины
 *   @property {string[]} goods список товаров в корзине
 */
export class Basket {
  protected startDate: Date;    // Дата и время начала формирования корзины
  protected goods: string[];    // Cписок товаров в корзине

  constructor(data: IBasketModel) {
    this.setBasket(data);
  }

  getBasket(): IBasketModel {
    return {
      startDate: this.startDate,
      goods: this.goods.slice(),
    }
  }

  setBasket(data: IBasketModel): void {
    let startDate: Date = data.startDate;
    if (isEmpty(startDate)) startDate = new Date();  // Старт формирования корзины

    this.startDate = startDate;
    this.goods = data.goods.slice();
  }

}
