/**
 * Типы и интерфейсы для отображения "Товар"
 */

import { TCategoryType, TIdGoodType } from "./model";

/**
 * Тип для статуса товара
 *
 * @type { 'basket' | 'free' | 'no_price' } TCardGoodStatus
 */
export type TCardGoodStatus = 'basket' | 'free' | 'no_price';

/**
 * Интерфейс для отображения "Товар"
 *
 * @interface IGoodView
 *   @property {number} number номер товара в списке
 *   @property {TCategoryType} category категория
 *   @property {string} title наименование
 *   @property {string} image URL картинки
 *   @property {number | null} price цена
 *   @property {TIdGoodType} id id товара
 *   @property {string} buttonText надпись на кнопке
 */
export interface IGoodView {
  number: number;
  category: TCategoryType;
  title: string;
  image: string;
  price: number | null;
  id: TIdGoodType;
  buttonText: string;
}
