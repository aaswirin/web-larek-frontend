/**
 * Модуль для хранения данных в локальном хранилище
 * @module
 */
import { IBasketModel } from "../../types/basket/model";
import { IOrderModel } from "../../types/order";

/**
 * Класс для хранилища
 *
 * @class Storage
 *   @property {string} keyBasket Ключ данных корзины
 *   @property {string} keyOrder Ключ данных покупателя
 */
export class LarekStorage {
  static keyBasket: string = "larekBasket";
  static keyOrder: string = "larekOrder";

  // Корзина
  loadBasket(): IBasketModel | null {
    return JSON.parse(localStorage.getItem(LarekStorage.keyBasket)) as IBasketModel;
  }

  saveBasket(basket: object) {
    localStorage.setItem(LarekStorage.keyBasket, JSON.stringify(basket));
  }

  // Заказ
  loadOrder(): Partial<IOrderModel> | null {
    return JSON.parse(localStorage.getItem(LarekStorage.keyOrder)) as Partial<IOrderModel>;
  }

  saveOrder(order: object) {
    localStorage.setItem(LarekStorage.keyOrder, JSON.stringify(order));
  }

}
