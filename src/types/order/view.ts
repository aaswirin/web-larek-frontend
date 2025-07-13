/**
 * Типы и интерфейсы для отображения "Заказ"
 */

import { TPaymentType } from "./model";

export interface IOrderView {
  payment: TPaymentType,
  address: string,
  email: string,
  phone: string,
  total: number,
  goods: TPaymentType[],
  errorValidation: string,
}
