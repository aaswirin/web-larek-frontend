/**
 * Типы и интерфейсы для Хранилища
 */

import {IBasketModel} from "../basket/model";
import {IOrderModel} from "../order/model";

/**
 * Интерфейс для класса "Хранилище"
 */
export interface IStorage {
  loadBasket(): Partial<IBasketModel> | null;
  saveBasket(basket: object): void;
  clearBasket(): void;
  loadOrder(): IOrderModel;
  saveOrder(order: object): void
  clearOrder(): void;
}
