/**
 * Модуль описывает представление "Заказ"
 */

import { Component } from "../base/component";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { TPaymentType } from "../../types/order/model";
import { isEmpty, ensureElement } from "../../utils/utils";
import { IOrderView } from "../../types/order/view";
import { priceToString } from "../function/function";

/**
 * Класс для отображения первой страницы оформления заказа
 */
export class OrderViewOrder extends Component<IOrderView> {
  protected buttonCard: HTMLButtonElement;         // Кнопка "Онлайн"
  protected buttonCash: HTMLButtonElement;         // Кнопка "При получении"
  protected inputAddress: HTMLInputElement;        // Поле ввода "Адрес"
  protected buttonOrder: HTMLButtonElement;        // Кнопка "Далее"

  //protected inputEMail: HTMLInputElement;          // Поле ввода "Почта"
  //protected inputPhone: HTMLInputElement;          // Поле ввода "Телефон"
  //protected buttonContacts: HTMLButtonElement;     // Кнопка "Оплатить"
  //protected buttonSuccess: HTMLButtonElement;      // Кнопка "За новыми покупками!"
  //protected elementTotal: HTMLParagraphElement;    // Элемент для вывода суммы

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.buttonCard = ensureElement<HTMLButtonElement>(settings.elements.order.buttonCard, container);
    this.buttonCash = ensureElement<HTMLButtonElement>(settings.elements.order.buttonCash, container)
    this.inputAddress = ensureElement<HTMLInputElement>(settings.elements.order.inputAddress, container);
    this.buttonOrder = ensureElement<HTMLButtonElement>(settings.elements.order.buttonOrder, container);

    // Слушатели
    this.buttonCard.addEventListener('click', () =>
      this.render({payment: 'online'}));
    this.buttonCash.addEventListener('click', () =>
      this.render({payment: 'offline'}));

    // Доделать! Кнопку открыть только после валидации
    this.setDisabled(this.buttonOrder, false);

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

  set payment(value: TPaymentType) {
    if (isEmpty(value)) return;

    const force: boolean = value === 'online';
    this.toggleClass(this.buttonCard, settings.elements.order.buttonClassActive, force);
    this.toggleClass(this.buttonCash, settings.elements.order.buttonClassActive, !force);
  }
 /*
  set total(value: number) {
    const sum: string = priceToString(value)
    this.setText(this.elementTotal, this.showPage === 'success' ? `Списано ${sum}` : sum);
  }

  set email(value: string) {
    if (isEmpty(this.inputEMail)) return;
    this.inputEMail.value = value;
  }

  set phone(value: string) {
    if (isEmpty(this.inputPhone)) return;
    this.inputPhone.value = value;
  }
*/
  set address(value: string) {
    if (isEmpty(this.inputAddress)) return;
    this.inputAddress.value = value;
  }

}
