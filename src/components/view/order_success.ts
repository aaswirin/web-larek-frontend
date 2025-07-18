/**
 * Модуль описывает представление "Заказ. Заказ оформлен"
 */

import { Component } from "../base/component";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IOrderView } from "../../types/order/view";
import { priceToString } from "../function/function";

/**
 * Класс для отображения последней страницы оформления заказа
 */
export class OrderViewSuccess extends Component<IOrderView> {
  protected totalSumOff: HTMLElement;          // Сумма списано
  protected buttonSuccess: HTMLButtonElement;  // "За новыми покупками!"

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.totalSumOff = ensureElement<HTMLButtonElement>(settings.elements.order.totalSum, container);
    this.buttonSuccess = ensureElement<HTMLButtonElement>(settings.elements.order.buttonSuccess, container)

    // Слушатели
    this.buttonSuccess.addEventListener('click', () =>
      this.events.emit(settings.events.order.closeOrder));
  }

  set total(value: number) {
    this.setText(this.totalSumOff, `Списано ${priceToString(settings.case.synapse, value)}`);
  }
}
