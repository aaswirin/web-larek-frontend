/**
 * Страница приложения
 */

import { ensureElement }  from "../../utils/utils";
import { Component } from "../base/component";
import { settings } from "../../utils/constants";

interface IPage {
  goodsList: HTMLElement[];
  basketCount: number;
  showModal(): void;
  closeModal(): void;
}


export class Page extends Component<IPage> {

  protected galleryCards: HTMLElement;
  protected elementBasketCount: HTMLElement;
  public displayedModal = false;                    // Признак активности модального окна
  public windowModal: HTMLElement;
  public contentModal: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.galleryCards = ensureElement(settings.elements.page.listGoods, this.container) as HTMLElement;
    this.elementBasketCount = ensureElement(settings.elements.page.basketCount, this.container) as HTMLElement;
    // Модальное окно
    this.windowModal = ensureElement<HTMLElement>(settings.elements.modal.modalContainer);
    this.contentModal = ensureElement<HTMLElement>(settings.elements.modal.modalContent, this.windowModal);
  }

  set goodsList(itemsGoods: HTMLElement[]){
    this.galleryCards.replaceChildren(...itemsGoods);
  }

  set basketCount(value: number) {
    this.setText(this.elementBasketCount, value.toString());
  }

  /**
   *  Показать модальное окно
   */
  showModal() {
    if (this.displayedModal) return;

    this.displayedModal = true;
    this.windowModal.classList.add(settings.elements.modal.modalActive);

    // Для снятия открытого окна по клавише
    const func = this.closeWindowKey.bind(this);
    document.addEventListener('keydown', func);
  }

  /**
   *  Скрыть модальное окно
   */
  closeModal() {
    if (!this.displayedModal) return;

    this.displayedModal = false;
    this.windowModal.classList.remove(settings.elements.modal.modalActive);
    this.contentModal.replaceChildren('');

    // Для снятия открытого окна по клавише
    const func = this.closeWindowKey.bind(this);
    document.removeEventListener('keydown', func);
  }

  /**
   * Закрывашка для всех окон по клавише
   */
  closeWindowKey(event: KeyboardEvent) {
    // Поискать клавишу в списке
    if (!(settings.keysClose.findIndex(function (element) {
      return element === event.key;
    }) !== -1)) return;

    this.closeModal();
  }

}
