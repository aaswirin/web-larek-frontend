/**
 * Модуль описывает отображение "ТоварЫ"
 */

import { ensureElement, isEmpty } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { CDN_URL, settings } from "../../utils/constants";
import { IGoodView } from "../../types/good/view"
import { TIdGoodType } from "../../types";
import { priceToString } from "../function/function";

/**
 * Класс для отображения карты товара
 */
export class CardGood extends Component<IGoodView> {
  protected elementNumber: HTMLElement;               // Номер
  protected elementCategory: HTMLElement;             // Категория
  protected elementTitle: HTMLElement;                // Название
  protected elementDescription: HTMLElement;          // Название
  protected elementImage: HTMLImageElement;           // Картинка
  protected elementPrice: HTMLElement;                // Цена
  protected basketButton: HTMLButtonElement;          // Кнопка "В корзину", если карта товара в детальном просмотре
  protected basketDelete: HTMLButtonElement;          // Кнопка "Удалить", если карта товара в корзине
  protected goodId: TIdGoodType;                      // Id товара

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.elementCategory = container.querySelector(settings.elements.card.category) as HTMLElement;
    this.elementImage = container.querySelector(settings.elements.card.image) as HTMLImageElement;
    this.elementNumber = container.querySelector(settings.elements.card.number) as HTMLElement;
    this.elementTitle = ensureElement(settings.elements.card.title, this.container) as HTMLElement;
    this.elementDescription = container.querySelector(settings.elements.card.description) as HTMLElement;
    this.elementPrice = ensureElement(settings.elements.card.price, this.container) as HTMLElement;
    this.basketButton = container.querySelector(settings.elements.modal.basketButton) as HTMLButtonElement;
    this.basketDelete = container.querySelector(settings.elements.card.buttonDelete) as HTMLButtonElement;

    // Слушатели и доп элементы
    // Для карты в каталоге
    if (!isEmpty(this.elementImage)) {
      this.container.addEventListener('click', () =>
        this.events.emit(settings.events.card.cardDetail, {id: this.goodId}));
    }
    // Для карты в детальном просмотре
    if (!isEmpty(this.basketButton)) {
      this.basketButton.addEventListener('click', () =>
        this.events.emit(settings.events.card.cardBasket, {id: this.goodId}));
    }
    // Для карты в корзине
    if (!isEmpty(this.basketDelete)) {
      this.basketDelete.addEventListener('click', () =>
        this.events.emit(settings.events.basket.goodDelete, {id: this.goodId}));
    }
  }

  /**
   * Сеттер для номера карты
   */
  set number(value: number) {
    this.setText(this.elementNumber, value);
  }

  /**
   * Сеттер для категории
   */
  set category(value: string) {
    this.setText(this.elementCategory, value);
    // Удалить что было и добавить нужный
    settings.elements.card.catClass.forEach((classCategory, key) => {
      if (key === value) {
        this.toggleClass(this.elementCategory, classCategory, true);
      } else {
        this.toggleClass(this.elementCategory, classCategory, false);
      }
    });
  }

  /**
   * Сеттер для названия
   */
  set title(value: string) {
    this.setText(this.elementTitle, value);
  }

  /**
   * Геттер для названия
   */
  get title() {
    return this.elementTitle.textContent;
  }

  /**
   * Сеттер для описания
   */
  set description(value: string) {
    this.setText(this.elementDescription, value);
  }

  /**
   * Геттер для названия
   */
  get description() {
    return this.elementDescription.textContent;
  }

  /**
   * Сеттер для изображения
   */
  set image(value: string) {
    this.setImage(this.elementImage, CDN_URL + value.replace(".svg", ".png"), this.title);
  }

  /**
   * Сеттер для номера цены
   */
  set price(value: number | null) {
    // Если цены нет, то "Бесценно"
    this.setText(this.elementPrice,
                 isEmpty(value) ? settings.case.synapse.get(0) : priceToString(settings.case.synapse, value));
  }

  /**
   * Сеттер для id
   */
  set id(value: TIdGoodType) {
    this.goodId = value;
  }

  /**
   * Сеттер для кнопки
   */
  set buttonText(value: string) {
    this.setText(this.basketButton, value);
  }

  /**
   * Сеттер для видимости кнопки
   */
  set buttonDisabled(value: boolean) {
    this.setDisabled(this.basketButton, value);
  }

}
