import {TIdGoodType} from "../good/model";

/**
 * Тип для типа оплаты
 *
 * @type { 'offline' | 'online' } TPaymentType online - безналичные, offline - наличные,
 */
export type TPaymentType = 'offline' | 'online';

/**
 * Интерфейс для заказов
 *
 * @view IOrderModel
 *   @property {TPaymentType} payment тип оплаты
 *   @property {number} total сумма заказа
 *   @property {TIdGoodType[]} goods id заказанных товаров
 *   @property {string} email почта
 *   @property {string} phone телефон
 *   @property {string} address адрес покупателя *  @example
 *    {
 *      payment: "online",
 *      total: 2200,
 *      goods: [
 *           "854cef69-976d-4c2a-a18c-2aa45046c390",
 *           "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
 *      ],
 *      email: 'boss@grandfather.ru',
 *      phone: '+71234567890',
 *      address: 'На деревню дедушке',
 *     }
 */
export interface IOrderModel {
  payment: TPaymentType;   // тип оплаты
  total: number;           // сумма заказа
  goods: TIdGoodType[];    // id'ы заказанных товаров
  email: string;           // почта
  phone: string;           // телефон
  address: string;         // адрес
}
