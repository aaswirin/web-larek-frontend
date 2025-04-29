/**
 * Модуль описывает модель данных "ТоварЫ"
 * @module
 */
import { IGood, TIdGoodType} from "../../types/good"
import {isEmpty} from "../../utils/utils";

/**
 * Класс для товара
 *
 * @class GoodsModel
 *   @property {Map} goods Список товаров
 */
export class GoodsModel {
  protected goods: Map<TIdGoodType, IGood> = new Map();   // Список товаров

  constructor(data: IGood[] | null) {
    if (!isEmpty(data)) this.setGoods(data);
  }

  getGoods(): IGood[] {
    return Array.from(this.goods, ([key, value]) => value);
  }

  setGoods(data: IGood[]): void {
    this.goods = new Map();
    data.forEach(good => {
      this.goods.set(good.id, good);
    })
  }
}
