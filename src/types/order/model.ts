/**
 * Типы и интерфейсы для модели данных "Заказ"
 */

/**
 * Тип для типа оплаты
 */
export type TPaymentType = 'offline' | 'online';

/**
 * Интерфейс для заказа
 */
export interface IOrderModel {
  payment: TPaymentType;   // тип оплаты
  address: string;         // адрес
  email: string;           // почта
  phone: string;           // телефон
}
