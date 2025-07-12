/**
 * Модуль описывает представление "Заказ. Первая страница"
 */

import { Component } from "../base/component";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";
import { TPaymentType } from "../../types/order/model";
import { isEmpty, ensureElement } from "../../utils/utils";
import { IOrderView } from "../../types/order/view";

/**
 * Класс для отображения первой страницы оформления заказа
 */
export class OrderViewPay extends Component<IOrderView> {
  protected buttonCard: HTMLButtonElement;         // Кнопка "Онлайн"
  protected buttonCash: HTMLButtonElement;         // Кнопка "При получении"
  protected inputAddress: HTMLInputElement;        // Поле ввода "Адрес"
  protected buttonOrder: HTMLButtonElement;        // Кнопка "Далее"
  protected errorOrder: HTMLElement;               // Поле для вывода ошибок валидации

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.buttonCard = ensureElement<HTMLButtonElement>(settings.elements.order.buttonCard, container);
    this.buttonCash = ensureElement<HTMLButtonElement>(settings.elements.order.buttonCash, container)
    this.inputAddress = ensureElement<HTMLInputElement>(settings.elements.order.inputAddress, container);
    this.buttonOrder = ensureElement<HTMLButtonElement>(settings.elements.order.buttonOrder, container);
    this.errorOrder = ensureElement<HTMLButtonElement>(settings.elements.order.errorOrder, container);

    // Слушатели
    this.buttonCard.addEventListener('click', () =>
        this.render({payment: 'online'}));

    this.buttonCash.addEventListener('click', () =>
        this.render({payment: 'offline'}));

    // Кнопка "Далее"
    container.addEventListener('submit', (event) => {
        event.preventDefault();

        this.events.emit(settings.events.order.changeOrder, {
          payment: this.buttonCard.classList.contains(settings.elements.order.buttonClassActive) ? 'online' : 'offline',
          address: this.inputAddress.value,
        });

      });

    // Изменение данных
    const func = this.changeData.bind(this);
    this.buttonCash.addEventListener('click', func);
    this.buttonCard.addEventListener('click', func);
    this.inputAddress.addEventListener('input', func);

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

  set address(value: string) {
    if (isEmpty(this.inputAddress)) return;
    this.inputAddress.value = value;
  }

  set errorValidation(value: string) {
    this.setText(this.errorOrder, value);

    this.setDisabled(this.buttonOrder, value !== '');
  }

  /**
   * Изменение данных на форме
   */
  changeData() {
    console.log(this.inputAddress.value);
    this.events.emit(settings.events.order.changeValueOrder, {
      payment: this.buttonCard.classList.contains(settings.elements.order.buttonClassActive),
      address: this.inputAddress.value,
    })
  }

}
