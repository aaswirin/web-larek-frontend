/**
 * Модуль описывает модель данных "Корзина"
 * @module
 */
import { IBasketModel } from "../../types/basket/model";
import { isEmpty } from "../../utils/utils";
import {IGoodModel, TIdGoodType} from "../../types/good/model";
import {IEvents} from "../base/events";
import {settings} from "../../utils/constants";

/**
 * Класс для корзины
 *
 * @class Basket
 *   @property {Date} startDate Дата и время начала формирования корзины
 *   @property {Set<TIdGoodType>} goods список товаров в корзине
 */
export class BasketModel {
  protected events: IEvents;           // Список товаров
  public startDate: Date | null;       // Дата и время начала формирования корзины
  protected goods: Set<TIdGoodType>;   // Список товаров в корзине

  constructor(events: IEvents, data: IBasketModel) {
    this.events = events;
    this.goods = new Set<TIdGoodType>();
    if (!isEmpty(data)) {
      this.startDate = data.startDate;
      this.goods = new Set(data.goods);
    }
  }

  start() {
    if (isEmpty(this.startDate)) this.startDate = new Date();
  }

  clear() {
    this.goods.clear();
    this.events.emit(settings.events.basket.goodChangeBasket);
  }

  getGoods(): TIdGoodType[] {
    return Array.from(this.goods);
  }

  setGoods(data: TIdGoodType[]): void {
    this.goods = new Set(data);
    this.start();
  }

  addGood(data: Partial<IGoodModel>): void {
    this.goods.add(data.id);
    this.start();
  }

  deleteGood(data: Partial<IGoodModel>): void {
    this.goods.delete(data.id);
    if (this.getCount() === 0) this.startDate = null;
  }

  getCount(): number {
    return this.goods.size;
  }

  isBasket(data: Partial<IGoodModel>): boolean {
    return this.goods.has(data.id);
  }

  calcTotal(): number {
    let total = 0;
    this.goods.forEach(item => {

      }
    )
    return total;
  }
}
