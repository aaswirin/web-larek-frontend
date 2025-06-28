/**
 * Класс для приложения
 * @module
 */

import {TGood} from "../../types/good/model";
import { CardGood } from "./cardGood";
import {cloneTemplate, ensureElement, isEmpty} from "../../utils/utils";
import { settings } from "../../utils/constants";
import { GoodsModel } from "../model/goodsModel";
import { BasketModel } from "../model/basketModel";
import { Basket } from "./basket";
import {EventEmitter, IEvents} from "../base/events";
import { Page } from "./page";
import {LarekAPI} from "../api/larekAPI";
import {LarekStorage} from "../storage/storage";
import {showError} from "../base/error";
import {OrderModel} from "../model/orderModel";
import {OrderViewOrder} from "./order";
import {IGoodView} from "../../types/good/view";
import {IOrderView} from "../../types/order/view";

export interface IWebLarek {
  events: EventEmitter;
  api: LarekAPI;
  storage: LarekStorage;
  goodsModel: GoodsModel;
  basketModel: BasketModel;
  orderModel: OrderModel;
  page: Page;
  basket: Basket;
  order: OrderViewOrder;
}

/**
 * Класс для всего приложения Web-larёk
 * @class WebLarek
 *   @property {HTMLElement} elementCategory Элемент для отображения категории
 *   @property {HTMLElement} elementTitle Элемент для отображения заголовка
 *   @property {HTMLImageElement} elementImage Элемент для отображения картинки
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 *   @property {HTMLElement} elementPrice Элемент для отображения цены
 */
export class WebLarek {
  // Заготовки
  protected windowModal: HTMLElement = ensureElement(settings.elements.modal.modalContainer);
  protected contentModal: HTMLElement = ensureElement(settings.elements.modal.modalContent, this.windowModal);

  protected displayedModal: boolean = false;

  // Презентер
  protected events: IEvents;
  // Api
  protected api: LarekAPI;
  // Хранилище
  protected storage: LarekStorage;
  // Модели данных
  protected goodsModel: GoodsModel;    // Список товаров
  protected basketModel: BasketModel;  // Корзина
  protected orderModel: OrderModel;    // Корзина

  // Oтображения
  protected page: Page;
  protected basket: Basket;
  protected order: OrderViewOrder;

  constructor(components: Partial<IWebLarek>) {
    this.events = components.events;
    this.api = components.api;
    this.storage = components.storage;
    this.goodsModel = components.goodsModel;
    this.basketModel = components.basketModel;
    this.orderModel =  components.orderModel;
    this.page = components.page;
    this.basket = components.basket;
    this.order = components.order;
  }

  initialize(): void {
    // Загрузить товары из API
    /*this.api.getGoods()
      .then(data => {
        this.goodsModel.goods = new Map(data.items);
      })
      .catch(err => {
        showError('Загрузка товаров', err.message);
      });

    // Слушатели
    // Для модального окна
    ensureElement(settings.elements.modal.closeButton, this.windowModal)
      .addEventListener('click', () => this.closeModal());
    // Показ корзины
    ensureElement(settings.elements.page.basketButton,)
      .addEventListener('click', () => this.events.emit(settings.events.page.showBasket));

    // ... и сообщения
    // Сообщение -> Изменение списка товаров в каталоге
    this.events.on(settings.events.card.goodsAllChange, () => {
      const goodsHTMLArray = Array.from(this.goodsModel.goods).map(item =>
        new CardGood(cloneTemplate(CardGood.templateCatalog), this.events).render(item as Partial<TGood>)
      )

      this.page.render({
          goodsList: goodsHTMLArray,
          basketCount: this.basketModel.getCount(),
        }
      )
    })

    // Сообщение -> Клик на карте товара
    this.events.on(settings.events.card.cardDetail, (data: Partial<TGood>) => {
      // Показ карты товара
      this.showCardDetails(this.goodsModel.getGood(data.id), this.basketModel.isBasket(data));
    })

    // Сообщение -> Клик на кнопке в карте товара "Добавить"/"Удалить" в корзину
    this.events.on(settings.events.basket.goodChangeBasket,  (data: Partial<TGood & {basket: Basket}>) => {
      if (!isEmpty(data)) {
        if (this.basketModel.isBasket(data)) this.basketModel.deleteGood(data); // Товар уже в корзине
        else this.basketModel.addGood(data);    // Товара нет в корзине

        if (!isEmpty(data.basket)) {
          this.rebuildBasket();
       }
      }

      this.storage.saveBasket(
        {
          startDate: this.basketModel.editDate,
          goods: this.basketModel.goods,   // список товаров в корзине
        }
      );

      this.page.render({
        basketCount: this.basketModel.getCount(),
      })

    })

    // Сообщение -> Клик на кнопке "Покажи мне корзину"
    this.events.on(settings.events.page.showBasket,() => {
      // Показ корзины
      this.showBasket();
    })

    // Сообщение -> Клик на кнопке "Оформить"
    this.events.on(settings.events.order.makeOrder,() => {
      // Показ заказа
      this.showOrder();
    })

    // Сообщение -> Клик на кнопке "Далее" или "Оплатить" или "За новыми покупками" в окне заказа
    this.events.on(settings.events.order.changeOrder,(data: Partial<IOrderModel>) => {
      // Что-то поменяли
      /*
      if (!isEmpty(data)) {
        // Добавить товары из корзины
        const order = this.basketModel;
        if (this.order.showPage === 'order') {  // первая страница
          this.order = new Order(cloneTemplate(Order.templatePageContacts), this.events);
          const orderView = this.order.render(order as Partial<IOrderView>);
          this.contentModal.replaceChildren(orderView);
        } else if (this.order.showPage === 'contacts') {
          const totalSum = this.basketModel.calcTotal();

          // ... и отправить заказ

          // переписать в новую структуру, а вдруг API измениться?
          const orderSend: IOrderApi = {
            payment: this.orderModel.payment,  // Тип оплаты
            email: this.orderModel.email,      // Электронная почта
            phone: this.orderModel.phone,      // Телефон
            address: this.orderModel.address,  // Адрес доставки
            total: totalSum,         // Сумма заказа
            items: order.goods,      // Список товаров
          };

          this.api.sendOrder(orderSend)
            .then(data => {
              if (!isEmpty(data.error)) {  // Что-то пошло не так
                showError('Отправка заказа', data.error);
              } else {
                this.order = new Order(cloneTemplate(Order.templatePageSuccess), this.events);
                const orderView = this.order.render({
                  total: data.total,
                });

                // ... и сохранить параметры заказа без списка товаров
                delete order.goods;
                this.storage.saveOrder(order);
                // ... и очистить корзину
                this.basketModel.clear();
                // ... и поблагодарить пользователя за заказ!
                this.contentModal.replaceChildren(orderView);
              }
            })
            .catch(err => {
              showError('Отправка заказа', err.message);
            });
        }
      } else if (this.order.showPage === 'success') {  // Уже всё заказано
        this.closeModal();
      }
    })*/

  }

  protected showModal(): void {
    if (this.displayedModal) return;

    this.displayedModal = true;
    this.windowModal.classList.add(settings.elements.modal.modalActive);
  }

  protected closeModal(): void {
    if (!this.displayedModal) return;

    this.displayedModal = false;
    this.windowModal.classList.remove(settings.elements.modal.modalActive);
    this.contentModal.replaceChildren('');
  }

  showCardDetails(good: TGood, isBasket: boolean): void {
    /*
    const price = good.price;
    let status: TCardGoodStatus = 'free';
    if (isBasket) {
      status = 'basket';
    } else if (isEmpty(price)) {
      status = 'no_price';
    }
*/
    //const card=
    //  new CardGood(cloneTemplate(CardGood.templateDetails), this.events, status)
    //    .render(good);
    //this.contentModal.replaceChildren(card);

    ensureElement(settings.elements.modal.basketButton, this.windowModal)
      .addEventListener('click', () => {
        this.closeModal()
      });

    this.showModal();
  }

  rebuildBasket(): void {
    /*
    let count: number = 0;
    let totalSum: number = 0;

    const goodsHTMLArray = this.basketModel.getGoods().map(idGoods => {
      const good = this.goodsModel.getGood(idGoods);
      count++;
      totalSum = totalSum + good.price;
      return new CardGood(cloneTemplate(CardGood.templateBasket), this.events, 'basket')
        .render({number: count, ...good});
    });

    this.basket = new Basket(cloneTemplate(Basket.template), this.events);
    const basketView = this.basket.render({
      startDate: this.basketModel.startDate,
      basketList: goodsHTMLArray,
      totalSum: priceToString(totalSum),
    });

    this.contentModal.replaceChildren(basketView);

     */
  }

  showBasket():void {
    this.rebuildBasket();

    this.showModal();
  }

  showOrder() {
    /*
    const order = this.orderModel.getOrder();
    this.order = new Order(cloneTemplate(Order.templatePageOrder), this.events);
    console.log(order);
    const orderView = this.order.render(order as Partial<IOrderView>);

    this.contentModal.replaceChildren(orderView);

     */
  }

}
