import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
//import { IBasketView } from "../../types/basket/view";

/**
 * Класс для отображения корзины
 * @class Basket
 *   @property {HTMLElement} elementCategory Элемент для отображения категории
 *   @property {HTMLElement} elementTitle Элемент для отображения заголовка
 *   @property {HTMLImageElement} elementImage Элемент для отображения картинки
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 */
export class Basket extends Component<IBasketView> {
  static template = ensureElement<HTMLTemplateElement>(settings.elements.basket.template);

  protected galleryCards: HTMLElement;
  protected basketSum: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.galleryCards = ensureElement(settings.elements.basket.templateList, this.container) as HTMLElement;
    this.basketSum = ensureElement(settings.elements.basket.totalSum, this.container) as HTMLElement;

    // Слушатель кнопки "Оформить"
    ensureElement(settings.elements.basket.buttonOrder, this.container).addEventListener('click',() =>
      this.events.emit(settings.events.order.makeOrder));
  }

  set basketList(itemsGoods: HTMLElement[]){
    this.galleryCards.replaceChildren(...itemsGoods);
  }

  set totalSum(value: number) {
    this.setText(this.basketSum, value);
  }

}
