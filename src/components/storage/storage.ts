/**
 * Модуль для хранения данных в локальном хранилище
 */

import { IBasketModel } from "../../types/basket/model";
import { IOrderModel } from "../../types/order/model";
import { IStorage } from "../../types/storage/storage";
import { isEmpty } from "../../utils/utils";

/**
 * Класс для хранилища
 *
 * @class Storage
 *   @property {string} keyBasket Ключ данных корзины
 *   @property {string} keyOrder Ключ данных покупателя
 */
export class LarekStorage implements IStorage {
  static keyBasket: string = "larekBasket";
  static keyOrder: string = "larekOrder";

  /**
   * Прочитать корзину
   * !!! JSON.parse не умеет работать с Set
   */
  loadBasket(): Partial<IBasketModel> | null {
    const saveBasket = JSON.parse(localStorage.getItem(LarekStorage.keyBasket));

    if (isEmpty(saveBasket)) {
      return null;
    } else {
      return {
        editDate: saveBasket.editDate,
        goods: new Set(saveBasket.goods),
      };
    }
  }

  /**
   * Записать корзину
   !!! JSON.stringify не умеет работать с Set
   */
  saveBasket(basket: Partial<IBasketModel>) {
    const saveBasket = {
      editDate: basket.editDate,
      goods: Array.from(basket.goods),
    }
    localStorage.setItem(LarekStorage.keyBasket, JSON.stringify(saveBasket));
  }

  /**
   * Очистить корзину
   */
  clearBasket() {
    localStorage.removeItem(LarekStorage.keyBasket);
  }

  /**
   * Прочитать заказ
   */
  loadOrder(): IOrderModel {
    return JSON.parse(localStorage.getItem(LarekStorage.keyOrder)) as IOrderModel;
  }

  /**
   * записать заказ
   */
  saveOrder(order: IOrderModel) {
    localStorage.setItem(LarekStorage.keyOrder, JSON.stringify(order));
  }

  /**
   * Очистить заказ
   */
  clearOrder() {
    localStorage.removeItem(LarekStorage.keyOrder);
  }

}
