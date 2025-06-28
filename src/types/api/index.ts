/**
 * Типы и интерфейсы для API
 */

import { TIdGoodType } from "../index";

/**
 * Тип товара из API
 */
export type TGoodApi = {
  id: TIdGoodType,
  description: string,
  image: string,
  title: string,
  category: string,
  price: number | null,
}

/**
 * Тип для списка товаров из API
 */
export type TListGoodsApi = {
  total: number;            // количество товаров
  items: TGoodApi[];        // список товаров
}

/**
 * Тип для отправки заказа в API
 */
export type TOrderApi = {
  payment: string,        // Тип оплаты
  email: string;          // Электронная почта
  phone: string;          // Телефон
  address: string;        // Адрес доставки
  total: number;          // Сумма заказа
  items: TIdGoodType[];   // Список товаров
}

/**
 * Тип для ответа после отправки заказа в API
 */
export type TAnswerOrderApi = {
  id?: string;             // Id заказа
  total?: number;          // Сумма списано
  error?: string;          // Текст ошибки
}

/**
 * Интерфейс для класса взаимодействия с API
 */
export interface ILarekAPI {
  getGoods(): Promise<TListGoodsApi>;
  sendOrder(order: TOrderApi): Promise<TAnswerOrderApi>;
}
