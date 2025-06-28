/**
 * Модуль описывает отображение "Корзина"
 */

import { Component } from "../base/component";
import {cloneTemplate, ensureElement} from "../../utils/utils";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import {CardGood} from "./cardGood";

/**
 * Класс для отображения корзины
 */
export class Basket extends Component<IBasketView> {
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

  /**
   * Сеттер для записи товаров в корзину
   */
  set basketList(itemsGoods: HTMLElement[]){
    this.galleryCards.replaceChildren(...itemsGoods);
  }

  /**
   * Сеттер для установки суммы корзины
   */
  set totalSum(value: number) {
    this.setText(this.basketSum, value);
  }
}
