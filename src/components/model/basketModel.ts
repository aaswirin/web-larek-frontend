/**
 * Модуль описывает модель данных "Корзина"
 */

import { IBasketModel } from "../../types/basket/model";
import { isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { TIdGoodType } from "../../types";
import {IGoodsModel, TGood} from "../../types/good/model";

/**
 * Класс для корзины
 */
export class BasketModel implements IBasketModel {
  protected events: IEvents;                          // Список товаров
  protected _editDate: Date | null;                   // Дата и время последнего изменения корзины
  protected _goods: Map<TIdGoodType, number>;         // Список товаров в корзине

  constructor(events: IEvents) {
    this.events = events;
    this._goods = new Map<TIdGoodType, number>();
  }

  /**
   * Сеттер для даты последнего редактирования корзины
   */
  set editDate(date: Date) {
    this._editDate = date;
  }

  /**
   * Геттер для даты последнего редактирования корзины
   */
  get editDate() {
    return this._editDate;
  }

  /**
   * Факт редактирования корзины
   */
  protected edit() {
    if (isEmpty(this._editDate)) this._editDate = new Date();
  }

  /**
   * Очистка корзины
   */
  protected clear() {
    this._goods.clear();
  }

  /**
   * Сеттер для списка товаров
   */
  get goods(): Map<TIdGoodType, number> {
    return new Map(this._goods);
  }

  /**
   * Геттер для списка товаров
   */
  set goods(data: Map<TIdGoodType, number> | null) {
    this.clear();
    if (!isEmpty(data)) {
      this._goods = new Map<TIdGoodType, number>(data);
    }

    this.events.emit(settings.events.basket.changeBasket);
  }

  /**
   * Добавить товар в корзину
   */
  addGood(id: TIdGoodType): void {
    // Если есть, то просто увеличить количество
    const count = this.isBasket(id) ? this._goods.get(id) + 1 : 1;
    this._goods.set(id, count);
    this.edit();
    this.events.emit(settings.events.basket.changeBasket);
  }

  /**
   * Удалить товар из корзины
   */
  deleteGood(id: TIdGoodType): void {
    this._goods.delete(id);
    if (this.getCount() === 0) this._editDate = null;

    this.events.emit(settings.events.basket.changeBasket);
  }

  /**
   * Получить количество товаров в корзине
   */
  getCount(): number {
    return this._goods.size;
  }

  /**
   * Товар в корзине?
   */
  isBasket(id: TIdGoodType): boolean {
    return this._goods.has(id);
  }

  /**
   * Посчитать стоимость товаров в корзине
   */
  calcTotal(Goods: IGoodsModel): number {
    let total = 0;
    this._goods.forEach((value, key) => {
        total += this.calcGood(Goods.getGood(key));
      }
    )
    return total;
  }

  /**
   * Посчитать стоимость одного товара в корзине
   */
  calcGood(Good: TGood): number {
    // Цена * Количество
    return Good.price * this._goods.get(Good.id);
  }

}
