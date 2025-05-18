import {IGoodModel, TIdGoodType} from "../good/model";
import {TPaymentType} from "../order";

/**
 * Интерфейс для списка товаров из API
 *
 * @view IGoodApi
 *   @property {number} total количество товаров
 *   @property {IGoodModel[]} index список товаров
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
  items: IGoodModel[];      // список товаров
}

/**
* Интерфейс для отправки заказа в API
*
* @interface IOrderApi
*  @property {TPaymentType} payment Тип оплаты
*  @property {string} email Электронная почта
*  @property {string} phone Телефон
*  @property {string} address Адрес доставки
*  @property {number} total Сумма заказа
*  @property {TIdGoodType[]} items Список товаров
*  @example
*   {
*     "payment": "online",
*     "email": "test@test.ru",
*     "phone": "+71234567890",
*     "address": "Spb Vosstania 1",
*     "total": 2200,
*     "items": [
*         "854cef69-976d-4c2a-a18c-2aa45046c390",
*         "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
*     ]
*   }
*/
export interface IOrderApi {
  payment: TPaymentType;  // Тип оплаты
  email: string;          // Электронная почта
  phone: string;          // Телефон
  address: string;        // Адрес доставки
  total: number;          // Сумма заказа
  items: TIdGoodType[];   // Список товаров
}

/**
 * Интерфейс для ответа после отправки заказа в API
 *
 * @interface IAnswerOrderApi
 *  @property {string} id Id заказа
 *  @property {number} total Сумма списано
 *  @property {string} error Текст ошибки
 *  @example
 *   {
 *     "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
 *     "total": 2200
 *   }
 */
export interface IAnswerOrderApi {
  id?: string;             // Id заказа
  total?: number;          // Сумма списано
  error?: string;          // Текст ошибки
}
