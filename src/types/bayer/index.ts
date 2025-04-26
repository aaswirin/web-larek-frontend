/**
 * Модуль описывает интерфейс "Покупатель"
 * @module
 */

/**
 * Интерфейс для покупателя
 *
 * @interface IBayerModel
 *   @property {string} email почта
 *   @property {string} phone телефон
 *   @property {string} address адрес покупателя
 *  @example
 *   {email: 'boss@grandfather.ru',
 *    phone: '+71234567890',
 *    address: 'На деревню дедушке'}
 */
export interface IBayerModel {
  email: string;     // почта
  phone: string;     // телефон
  address: string;   // адрес
}
