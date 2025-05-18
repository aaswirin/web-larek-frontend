import { TIdGoodType } from "../../types/good/model";
import { ensureElement, priceToString } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { CDN_URL, settings } from "../../utils/constants";
import {IGoodView, TCardGoodStatus} from "../../types/good/view"

/**
 * Класс для отображения карты товара
 * @class cardGood
 *   @property {HTMLTemplateElement} template Заготовка под карту
 *   @property {HTMLElement} elementCategory Элемент для отображения категории
 *   @property {HTMLElement} elementTitle Элемент для отображения заголовка
 *   @property {HTMLImageElement} elementImage Элемент для отображения картинки
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 */
export class CardGood extends Component<IGoodView> {
  // Заготовки под карту
  // 1. В каталоге
  static templateCatalog: HTMLTemplateElement = ensureElement(settings.elements.card.templateCatalog) as HTMLTemplateElement;
  // 2. В просмотре товара
  static templateDetails: HTMLTemplateElement = ensureElement(settings.elements.card.templateDetails) as HTMLTemplateElement;
  // 3. В корзине
  static templateBasket: HTMLTemplateElement = ensureElement(settings.elements.card.templateBasket) as HTMLTemplateElement;

  protected elementNumber: HTMLElement;               // Номер
  protected elementCategory: HTMLElement;             // Категория
  protected elementTitle: HTMLElement;                // Заголовок
  protected elementImage: HTMLImageElement;           // Картинка
  protected elementPrice: HTMLElement;                // Цена
  protected basketButton: HTMLButtonElement;          // Кнопка "В корзину", если карта товара в детальном просмотре
  protected basketDelete: HTMLButtonElement;          // Кнопка "Удалить", если карта товара в корзине
  protected goodId: TIdGoodType;                      // Id товара

  constructor(container: HTMLTemplateElement, protected events: IEvents, protected status?: TCardGoodStatus ) {
    super(container);

    /*if (this.owner === 'catalog' || this.owner === 'detail') {
      this.elementCategory = ensureElement(settings.elements.card.category, this.container) as HTMLElement;
      this.elementImage = ensureElement(settings.elements.card.image, this.container) as HTMLImageElement;
    }
    else if (this.owner === 'basket') {
      this.elementNumber = ensureElement(settings.elements.card.number, this.container) as HTMLImageElement;
    }*/

    this.elementTitle = ensureElement(settings.elements.card.title, this.container) as HTMLElement;
    this.elementPrice = ensureElement(settings.elements.card.price, this.container) as HTMLElement;

    // Разбивка по использованию: Слушатели и доп элементы
    /*
    switch (this.owner) {
      case 'catalog':    // Для карты в каталоге
        this.container.addEventListener('click',() =>
          this.events.emit(settings.events.card.cardDetail, {id: this.goodId}));
        break;
      case 'detail':    // Для карты в окне детального просмотра
        this.basketButton = ensureElement(settings.elements.modal.basketButton, this.container) as HTMLButtonElement;
        this.basketButton.addEventListener('click',() =>
          this.events.emit(settings.events.basket.goodChangeBasket, {id: this.goodId}));
        // Кнопка
        switch (status) {
          case 'free':
            this.setText(this.basketButton, 'Добавить в корзину');
            break;
          case 'basket':
            this.setText(this.basketButton, 'Удалить из корзины');
            break;
          case 'no_price':
            this.setText(this.basketButton, 'Нет цены');
            this.setDisabled(this.basketButton, true);
            break;
        }
        break;
      case 'basket':    // Для карты в корзине
        this.basketDelete = ensureElement(settings.elements.card.buttonDelete, this.container) as HTMLButtonElement;
        this.basketDelete.addEventListener('click',() =>
          this.events.emit(settings.events.basket.goodChangeBasket, {id: this.goodId, basket: this})
        );
        break;
    }

     */
  }

  set number(value: number) {
    this.setText(this.elementNumber, value);
  }

  set category(value: string) {
    this.setText(this.elementCategory, value);
  }

  set title(value: string) {
    this.setText(this.elementTitle, value);
  }

  get title() {
    return this.elementTitle.textContent;
  }

  set image(value: string) {
    this.setImage(this.elementImage, CDN_URL + value.replace(".svg", ".png"), this.title);
  }

  set price(value: number | null) {
    this.setText(this.elementPrice, priceToString(value));
  }

  set id(value: TIdGoodType) {
    this.goodId = value;
  }

  set buttonText(value: string) {
  }
}
