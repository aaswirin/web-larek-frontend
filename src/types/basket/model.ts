/**
 * Типы и интерфейсы для модели данных "Корзина"
 */

import { TIdGoodType } from "../index";
import { IGoodsModel, TGood } from "../good/model";

/**
 * Интерфейс для корзины
 */
export interface IBasketModel {
  editDate: Date;
  goods: Map<TIdGoodType, number>;
  addGood(id: TIdGoodType): void;
  deleteGood(id: TIdGoodType): void;
  getCount(): number;
  isBasket(id: TIdGoodType): boolean;
  calcTotal(Goods: IGoodsModel): number;
}
