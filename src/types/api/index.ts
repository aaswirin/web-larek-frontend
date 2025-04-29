import {IGood} from "../good";

/**
 * Интерфейс для списка товаров из API
 *
 * @interface IGoodApi
 *   @property {number} total количество товаров
 *   @property {IGood[]} index список товаров
 *  @example
 *   {total: 2
 *    items[
 *     {
 *       id: '854cef69-976d-4c2a-a18c-2aa45046c390',
 *       description: 'Если планируете решать задачи в тренажёре, берите два.',
 *       image: '/5_Dots.svg',
 *       title: '+1 час в сутках',
 *       category: 'софт-скил',
 *       price: 750,
 *     },
 *     {
 *       "id": "54df7dcb-1213-4b3c-ab61-92ed5f845535",
 *       "description": "Измените локацию для поиска работы.",
 *       "image": "/Polygon.svg",
 *       "title": "Портативный телепорт",
 *       "category": "другое",
 *       "price": 100000
 *     },
 *   ]}
 */
export interface IGoodApi {
  total: number;            // количество товаров
  items: IGood[];           // список товаров
}
