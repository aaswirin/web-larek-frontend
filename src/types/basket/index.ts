/**
 * Интерфейс для корзины
 *
 * @interface IBasketModel
 *   @property {Date} startDate Дата и время начала формирования корзины
 *   @property {string[]} goods список товаров в корзине
 *  @example
 *    {startDate: new Date(),
 *      total: 2200,
 *      goods: [
 *        '854cef69-976d-4c2a-a18c-2aa45046c390',
 *      ]}
 */
export interface IBasketModel {
  startDate: Date | null;     // Дата и время начала формирования корзины
  goods: string[];     // список товаров в корзине
}
