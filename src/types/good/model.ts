/**
 * Типы и интерфейсы для модели данных "Товар"
 */

/**
 * Тип для категории товара
 *
 * @type { 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил' } TCategoryType
 */
export type TCategoryType = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

/**
 * Тип для id товара
 *
 * @type {string} TIdGoodType Тип Id товара
 */
export type TIdGoodType = string;


/**
 * Интерфейс для модели "Товар"
 *
 * @interface IGoodModel
 *   @property {TIdGoodType} id id товара
 *   @property {string} description описание
 *   @property {string} image URL картинки
 *   @property {string} title наименование
 *   @property {TCategoryType} category категория
 *   @property {number | null} price цена
 *  @example
 *   {id: '854cef69-976d-4c2a-a18c-2aa45046c390',
 *    description: 'Если планируете решать задачи в тренажёре, берите два.',
 *    image: '/5_Dots.svg',
 *    title: '+1 час в сутках',
 *    category: 'софт-скил',
 *    price: 750,}
 */
export interface IGoodModel {
  id: TIdGoodType;                // id
  description: string;            // описание
  image: string;                  // URL картинки
  title: string;                  // наименование
  category: TCategoryType;        // категория
  price: number | null;           // цена, может быть null (зачем? для аукциона?)
  number?:  number;               // Порядковый номер
}
