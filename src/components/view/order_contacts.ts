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
  //protected buttonSuccess: HTMLButtonElement;      // Кнопка "За новыми покупками!"
  //protected elementTotal: HTMLParagraphElement;    // Элемент для вывода суммы

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.inputEMail = ensureElement<HTMLInputElement>(settings.elements.order.inputEMail, container);
    this.inputPhone = ensureElement<HTMLInputElement>(settings.elements.order.inputPhone, container);
    this.buttonPay = ensureElement<HTMLButtonElement>(settings.elements.order.buttonContacts, container);

    // Слушатели

    // Кнопка "Оплатить"
    container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(settings.events.order.changeContacts, {
        email: this.inputEMail.value,
        phone: this.inputPhone.value,
      });

    });

    // Доделать! Кнопку открыть только после валидации
    this.setDisabled(this.buttonPay, false);

    /*
    const inputEMail = container.querySelector(settings.elements.order.inputEMail);
    const buttonSuccess = container.querySelector(settings.elements.order.buttonSuccess);

      container.addEventListener('submit', (event) => {
        event.preventDefault();

        this.events.emit(settings.events.order.changeOrder, {
          payment: this.buttonCard.classList.contains(settings.elements.order.buttonClassActive) ? 'online' : 'offline',
          address: this.inputAddress.value,
        });
        //
      });

     */
    /*} else if (!isEmpty(inputEMail)) {     // Это вторая страница
      this.showPage = 'contacts';
      this.inputEMail = inputEMail as HTMLInputElement;
      this.inputPhone = ensureElement(settings.elements.order.inputPhone, container) as HTMLInputElement;
      this.buttonContacts = ensureElement(settings.elements.order.buttonContacts, container) as HTMLButtonElement;
      container.addEventListener('submit', (event) => {
        event.preventDefault();

        this.events.emit(settings.events.order.changeOrder, {
          email: this.inputEMail.value,
          phone: this.inputPhone.value,
        });
        //
      });
      // Доделать! Кнопку открыть только после валидации
      this.setDisabled(this.buttonContacts, false);
    } else if (!isEmpty(buttonSuccess)) {  // Это третья страница
      this.showPage = 'success';
      this.elementTotal = ensureElement(settings.elements.order.totalSum, container) as HTMLParagraphElement;
      this.buttonSuccess = buttonSuccess as HTMLButtonElement;
      this.buttonSuccess.addEventListener('click', () =>{
        this.events.emit(settings.events.order.changeOrder);
      });
    }*/
  }

  set content(content: HTMLElement) {
    this.container.replaceChildren(content);
  }

  set email(value: string) {
    this.inputEMail.value = value;
  }

  set phone(value: string) {
    this.inputPhone.value = value;
  }

}
