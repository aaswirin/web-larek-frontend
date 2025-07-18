/**
 * Страница приложения
 */

import { ensureElement }  from "../../utils/utils";
import { Component } from "../base/component";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

interface IPage {
  goodsList: HTMLElement[];
  basketCount: number;
  displayedModal: boolean;
  closeWindowKey(event: KeyboardEvent):void;
}

export class Page extends Component<IPage> {

  protected galleryCards: HTMLElement;
  protected elementBasketCount: HTMLElement;
  protected elementBasketButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.galleryCards = ensureElement(settings.elements.page.listGoods, this.container) as HTMLElement;
    this.elementBasketCount = ensureElement(settings.elements.page.basketCount, this.container) as HTMLElement;
    this.elementBasketButton = ensureElement(settings.elements.page.basketButton) as HTMLButtonElement;

    // Слушатели
    this.elementBasketButton.addEventListener('click', () =>
        events.emit(settings.events.page.showBasket));

  }

  set goodsList(itemsGoods: HTMLElement[]){
    this.galleryCards.replaceChildren(...itemsGoods);
  }

  set basketCount(value: number) {
    this.setText(this.elementBasketCount, value.toString());
  }

}
