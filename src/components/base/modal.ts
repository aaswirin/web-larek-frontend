/**
 * Класс для модальных окон
 */

import { Component } from "./component";
import {ensureElement, isEmpty} from "../../utils/utils";
import { IEvents } from "./events";

interface IModalData {
  content: HTMLElement;
}

type TModalElements = {
  modalContent: string;
  modalActive: string;
  closeButton: string;
};

export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;
  // Настройка на разметку по умолчанию
  protected _elements: TModalElements = {
    modalContent: '.modal__content',         // Внутренности модального окна
    modalActive: 'modal_active',             // Активное модальное окно
    closeButton: '.modal__close',            // Кнопка закрытия
  };

  // Настройка на клавиши по умолчанию
  protected _keys: string[] = [                                 // Список клавиш, по которым закрываем окно
    'Escape',
  ];

  protected funcKeyDown = this.closeWindowKey.bind(this);

  constructor(container: HTMLElement, protected events: IEvents, elements?: TModalElements, keys?: string[]) {
    super(container);

    // Настройка на разметку
    if (!isEmpty(elements)) {
      this._elements = elements;
    }

    // Настройка на клавиши для закрытия окна
    if (!isEmpty(keys)) {
      this._keys = keys;
    }

    this._closeButton = ensureElement<HTMLButtonElement>(this._elements.closeButton, container);
    this._content = ensureElement<HTMLElement>(this._elements.modalContent, container);

    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add(this._elements.modalActive);
    this.events.emit('modal:open');

    // Для снятия открытого окна по клавише
    document.addEventListener('keydown', this.funcKeyDown);
  }

  close() {
    this.container.classList.remove(this._elements.modalActive);
    this.content = null;
    this.events.emit('modal:close');

    // Для снятия открытого окна по клавише
    document.removeEventListener('keydown', this.funcKeyDown);
  }

  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }

  /**
   * Закрывашка для всех окон по клавише
   */
  closeWindowKey(event: KeyboardEvent) {
    // Поискать клавишу в списке
    if (!(this._keys.findIndex(function (element) {
      return element === event.key;
    }) !== -1)) return;

    this.close();
  }
}
