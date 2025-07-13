/**
 * Модуль для функций
 */

import { isEmpty } from "../../utils/utils";
import {settings} from "../../utils/constants";

/**
 * Падежометр для чисел прописью в синапсах, штуках и т.д.
 * Настройки см. в settings.case
 * ... надо будет в тугриках, сделаем и в тугриках
 */
export function priceToString(choice: Map<number, string>, value: number | null): string {
  let stringPrice: string;

  if (isEmpty(value)) {
    stringPrice = `0 ${choice.get(3)}`;
  } else {
    stringPrice = value.toString();
    // Разбить на разряды
    stringPrice = stringPrice.replace(settings.case.splitNumber, "$1 ");

    // Падежометр
    const remains:number = value % 10;
    let text: string;
    if (value > 10 && value < 15)        text = choice.get(3)
    else if (remains === 1)              text = choice.get(1)
    else if (remains > 1 && remains < 5) text = choice.get(2)
    else                                 text = choice.get(3);

    stringPrice = `${stringPrice} ${text}`;
  }

  return stringPrice;
}
