/**
 * Типы и интерфейсы для отображения "Корзина"
 */

/**
 * Интерфейс для отображения "Корзина"
 *
 * @interface IBasketView
 *   @property {Date} startDate Дата и время начала формирования корзины
 *   @property {HTMLElement[]} basketList список элементов карт товаров
 *   @property {string} totalSum сумма товаров в корзине
 *  @example
 *    {startDate: new Date(),
 *     goods: ['854cef69-976d-4c2a-a18c-2aa45046c390',
 *              '854cef69-976d-4c2a-a18c-2aa45046c391'],
 *     totalSum: '1 синапс'}
 */
interface IBasketView {
  basketList: HTMLElement[];
  basketEmpty: string;
  startDate: Date;
  totalSum: string;
}
