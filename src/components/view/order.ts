import {Component} from "../base/component";
import {settings} from "../../utils/constants";
import {EventEmitter, IEvents} from "../base/events";
import {TPaymentType} from "../../types/order";
import {isEmpty, ensureElement, priceToString} from "../../utils/utils";

export type TShowPage = 'order' | 'contacts' | 'success';

export interface IOrderView {
  payment: TPaymentType,
  address: string,
  email: string,
  phone: string,
  total: number,
  goods: TPaymentType[],
}

/**
 * Класс для отображения заказа
 * @class Order
 *   @property {HTMLElement} elementCategory Элемент для отображения категории
 *   @property {HTMLElement} elementTitle Элемент для отображения заголовка
 *   @property {HTMLImageElement} elementImage Элемент для отображения картинки
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 */
export class Order extends Component<IOrderView> {
  public showPage: 'order' | 'contacts' | 'success';  // Тип данных в окне
  // Элементы страниц
  // Первая страница
  static templatePageOrder =
    ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageOrder);
  protected buttonCard: HTMLButtonElement;         // Кнопка "Онлайн"
  protected buttonCash: HTMLButtonElement;         // Кнопка "При получении"
  protected inputAddress: HTMLInputElement;        // Поле ввода "Адрес"
  protected buttonOrder: HTMLButtonElement;        // Кнопка "Далее"
  // Вторая страница
  static templatePageContacts =
    ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageContacts);
  protected inputEMail: HTMLInputElement;          // Поле ввода "Почта"
  protected inputPhone: HTMLInputElement;          // Поле ввода "Телефон"
  protected buttonContacts: HTMLButtonElement;     // Кнопка "Оплатить"
  // Третья страница
  static templatePageSuccess =
    ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageSuccess);
  protected buttonSuccess: HTMLButtonElement;      // Кнопка "За новыми покупками!"
  protected elementTotal: HTMLParagraphElement;    // Элемент для вывода суммы

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    // Определить страницу
    const buttonCard = container.querySelector(settings.elements.order.buttonCard);
    const inputEMail = container.querySelector(settings.elements.order.inputEMail);
    const buttonSuccess = container.querySelector(settings.elements.order.buttonSuccess);
    if (!isEmpty(buttonCard)) {            // Это первая страница
      this.showPage = 'order';

      this.buttonCard = buttonCard as HTMLButtonElement;
      this.buttonCard.addEventListener('click', () =>
        this.render({payment: 'online'}));

      this.buttonCash = ensureElement(settings.elements.order.buttonCash, container) as HTMLButtonElement;
      this.buttonCash.addEventListener('click', () =>
        this.render({payment: 'offline'}));

      this.inputAddress = ensureElement(settings.elements.order.inputAddress, container) as HTMLInputElement;
      this.buttonOrder = ensureElement(settings.elements.order.buttonOrder, container) as HTMLButtonElement;
      container.addEventListener('submit', (event) => {
        event.preventDefault();

        this.events.emit(settings.events.order.changeOrder, {
          payment: this.buttonCard.classList.contains(settings.elements.order.buttonClassActive) ? 'online' : 'offline',
          address: this.inputAddress.value,
        });
        //
      });
      // Доделать! Кнопку открыть только после валидации
      this.setDisabled(this.buttonOrder, false);
    } else if (!isEmpty(inputEMail)) {     // Это вторая страница
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
    }
  }

  set content(content: HTMLElement) {
    this.container.replaceChildren(content);
  }

  set payment(value: TPaymentType) {
    if (isEmpty(this.buttonCard)) return;
    if (isEmpty(value)) return;

    const force: boolean = value === 'online';
    this.toggleClass(this.buttonCard, settings.elements.order.buttonClassActive, force);
    this.toggleClass(this.buttonCash, settings.elements.order.buttonClassActive, !force);
  }

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

  set address(value: string) {
    if (isEmpty(this.inputAddress)) return;
    this.inputAddress.value = value;
  }

}
