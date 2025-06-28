/**
 * Модуль для функций
 */

import {cloneTemplate, isEmpty} from "../../utils/utils";
import {settings} from "../../utils/constants";
import {CardGood} from "../view/cardGood";
import {IBasketModel} from "../../types/basket/model";
import {IGoodsModel} from "../../types/good/model";

/**
 * Падежометр для цены в синапсах
 * ... надо будет в тугриках, сделаем и в тугриках
 */
export function priceToString(value: number | null): string {
  let stringPrice: string;

  if (isEmpty(value)) {
    stringPrice = 'Бесценно';
  } else {
    stringPrice = value.toString();
    // Разбить на разряды
    stringPrice = stringPrice.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

    // Падежометр
    const remains:number = value % 10;
    let suffix: string;
    if (value > 10 && value < 15) suffix = 'ов'
    else if (remains === 1) suffix = ''
    else if (remains > 1 && remains < 5) suffix = 'а'
    else suffix = 'ов';

    stringPrice = `${stringPrice} синапс${suffix}`;
  }

  return stringPrice;
}

/**
 *  Показать модальное окно
 */
export function showModal(displayedModal: boolean, windowModal: HTMLElement): boolean {
  if (displayedModal) return  displayedModal;

  displayedModal = true;
  windowModal.classList.add(settings.elements.modal.modalActive);

  return  displayedModal;
}

/**
 *  Скрыть модальное окно
 */
export function closeModal(displayedModal: boolean, windowModal: HTMLElement, contentModal: HTMLElement): boolean {
  if (!displayedModal) return  displayedModal;

  displayedModal = false;
  windowModal.classList.remove(settings.elements.modal.modalActive);
  contentModal.replaceChildren('');

  return  displayedModal;
}
