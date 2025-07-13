/**
 * Типы и интерфейсы для отображения "Товар"
 */

import { TCategoryType, TIdGoodType } from "../index";

/**
 * Интерфейс для отображения "Товар"
 */
export interface IGoodView {
  number: number;
  category: TCategoryType;
  title: string;
  image: string;
  price: number | null;
  id: TIdGoodType;
  buttonText: string;
  buttonDisabled: boolean;
}
