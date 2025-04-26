import { IBayerModel } from '../bayer';

/**
 * Тип для типа оплаты
 *
 * @type { 'online' | 'offline' } TPaymentType online - безналичные, offline - наличные,
 */
export type TPaymentType = 'online' | 'offline';

/**
 * Интерфейс для заказов
 *
 * @interface IOrderModel
 *   @property {TPaymentType} payment тип оплаты
 *   @property {number} total сумма заказа
 *   @property {string[]} items id заказанных товаров
 *   @property {IBayerModel} bayer покупатель
 *  @example
 *    {
 *      payment: "online",
 *      total: 2200,
 *      items: [
 *           "854cef69-976d-4c2a-a18c-2aa45046c390",
 *           "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
 *       ],
 *       bayer: {
 *         email: 'boss@grandfather.ru',
 *         phone: '+71234567890',
 *         address: 'На деревню дедушке',
 *       },
 *     }
 */
export interface IOrderModel {
  payment: TPaymentType;  // тип оплаты
  total: number;          // сумма заказа
  items: string[];        // id заказанных товаров
  bayer: IBayerModel;     // покупатель
}
