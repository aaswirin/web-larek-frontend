/**
 * Типы и интерфейсы для модели данных "Корзина"
 */

import {TIdGoodType} from "../good/model";

/**
 * Интерфейс для корзины
 *
 * @interface IBasketModel
 *   @property {Date} startDate Дата и время начала формирования корзины
 *   @property {Set<TIdGoodType>} goods список товаров в корзине
 *  @example
 *    {startDate: new Date(),
 *      goods: ['854cef69-976d-4c2a-a18c-2aa45046c390',
 *              '854cef69-976d-4c2a-a18c-2aa45046c391']}
 */
export interface IBasketModel {
  startDate: Date;           // Дата и время начала формирования корзины
  goods: Set<TIdGoodType>;   // список товаров в корзине
}
