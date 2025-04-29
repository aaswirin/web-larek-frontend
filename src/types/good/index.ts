/**
 * Тип для категории товара
 *
 * @type { 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил' } TCategoryType
 */
export type TCategoryType = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

/**
 * Тип для id товара
 *
 * @type {string} TIdGoodType
 */
export type TIdGoodType = string;


/**
 * Интерфейс для товара
 *
 * @interface IGood
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
export interface IGood {
  id: TIdGoodType;          // id
  description: string;      // описание
  image: string;            // URL картинки
  title: string;            // наименование
  category: TCategoryType;  // категория
  price: number | null;     // цена, может быть null (зачем? для аукциона?)
}
