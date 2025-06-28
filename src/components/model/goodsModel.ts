/**
 * Модуль описывает модель данных "ТоварЫ"
 */

import { TGood, IGoodsModel, TListGoods } from "../../types/good/model"
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { TIdGoodType } from "../../types";

/**
 * Класс для товара
 */
export class GoodsModel implements IGoodsModel {
  protected _goods: TListGoods;   // Список товаров

  constructor(protected events: IEvents) {
    this.events = events;
    this._goods = new Map();
  }

  /**
   * Сеттер для списка товаров
   */
  set goods(data: TListGoods) {
    this.clear();
    data.forEach(good => {
      this._goods.set(good.id, good);
    })
    this.events.emit(settings.events.card.goodsAllChange)
  }

  /**
   * Геттер для списка товаров
   */
  get goods(): TListGoods {
    return new Map(this._goods);
  }

  /**
   * Очистить список товаров
   */
  protected clear(): void {
    this._goods.clear();
  }

  /**
   * Отдать один товар
   */
  getGood(id: TIdGoodType): TGood {
    return this._goods.get(id);
  }

  /**
   * Записать один товар
   */
  setGood(good: TGood): void {
    this._goods.set(good.id, good);
  }

}
