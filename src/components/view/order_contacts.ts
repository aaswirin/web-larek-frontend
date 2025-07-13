/**
 * Модуль описывает представление "Заказ. Вторая страница"
 */

import { Component } from "../base/component";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IOrderView } from "../../types/order/view";

/**
 * Класс для отображения второй страницы оформления заказа
 */
export class OrderViewContacts extends Component<IOrderView> {
  protected inputEMail: HTMLInputElement;          // Поле ввода "Почта"
  protected inputPhone: HTMLInputElement;          // Поле ввода "Телефон"
  protected buttonPay: HTMLButtonElement;          // Кнопка "Оплатить"
  protected errorContacts: HTMLElement;            // Поле для вывода ошибок валидации

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.inputEMail = ensureElement<HTMLInputElement>(settings.elements.order.inputEMail, container);
    this.inputPhone = ensureElement<HTMLInputElement>(settings.elements.order.inputPhone, container);
    this.buttonPay = ensureElement<HTMLButtonElement>(settings.elements.order.buttonContacts, container);
    this.errorContacts = ensureElement<HTMLButtonElement>(settings.elements.order.errorContacts, container);

    // Слушатели

    // Кнопка "Оплатить"
    container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(settings.events.order.changeContacts, {
        email: this.inputEMail.value,
        phone: this.inputPhone.value,
      });
    });

    // Изменение данных
    const func = this.changeData.bind(this);
    this.inputEMail.addEventListener('input', func);
    this.inputPhone.addEventListener('input', func);

  }

  set email(value: string) {
    this.inputEMail.value = value;
  }

  set phone(value: string) {
    this.inputPhone.value = value;
  }

  set errorValidation(value: string) {
    this.setText(this.errorContacts, value);

    this.setDisabled(this.buttonPay, value !== '');
  }

  /**
   * Изменение данных на форме
   */
  changeData() {
    this.events.emit(settings.events.order.changeValueContacts, {
      email: this.inputEMail.value,
      phone: this.inputPhone.value,
    })
  }

}
