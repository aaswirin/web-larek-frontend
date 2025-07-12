/**
 * Модуль описывает отображение "Корзина"
 */

import { Component } from "../base/component";
import { createElement, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";

/**
 * Класс для отображения корзины
 */
export class Basket extends Component<IBasketView> {
  protected galleryCards: HTMLElement;
  protected basketSum: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.galleryCards = ensureElement(settings.elements.basket.templateList, this.container) as HTMLElement;
    this.basketSum = ensureElement(settings.elements.basket.totalSum, this.container) as HTMLElement;
    this.basketButton = ensureElement(settings.elements.basket.buttonOrder, this.container) as HTMLButtonElement;

    // Слушатель кнопки "Оформить"
    this.basketButton.addEventListener('click',() =>
      this.events.emit(settings.events.order.makeOrder));
  }

  /**
   * Сеттер для записи "Корзина пуста"
   */
  set basketEmpty(text: string){
    const goodsEmpty = createElement<HTMLParagraphElement>('p', {
      textContent: 'Корзина пуста',
    });
    this.setDisabled(this.basketButton, true);
    this.galleryCards.replaceChildren(goodsEmpty);
  }

  /**
   * Сеттер для записи товаров в корзину
   */
  set basketList(itemsGoods: HTMLElement[]){
    this.setDisabled(this.basketButton, false);
    this.galleryCards.replaceChildren(...itemsGoods);
  }

  /**
   * Сеттер для установки суммы корзины
   */
  set totalSum(value: number) {
    this.setText(this.basketSum, value);
  }
}
