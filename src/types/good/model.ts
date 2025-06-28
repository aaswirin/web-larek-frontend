/**
 * Типы и интерфейсы для модели данных "Товар"
 */

import { TCategoryType, TIdGoodType } from "../index";

/**
 * Тип для данных "Товар"
 */
export type TGood = {
  id: TIdGoodType;                // id
  description: string;            // описание
  image: string;                  // URL картинки
  title: string;                  // наименование
  category: TCategoryType;        // категория
  price: number | null;           // цена, может быть null
  number?:  number;               // Порядковый номер
}

/**
 * Тип для данных "Список товаров"
 */
export type TListGoods = Map<TIdGoodType, TGood>;

/**
 * Интерфейс для класса модели "Товар"
 */
export interface IGoodsModel {
  goods: TListGoods;
  getGood(id: TIdGoodType): TGood;
  setGood(good: TGood): void;
}
