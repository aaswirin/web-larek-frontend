/**
 * Типы и интерфейсы для отображения "Корзина"
 */

/**
 * Интерфейс для отображения "Корзина"
 */
interface IBasketView {
  basketList: HTMLElement[];
  basketEmpty: string;
  totalSum: string;
}
