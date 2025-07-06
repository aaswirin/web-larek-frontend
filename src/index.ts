/**
 * Основной модуль приложения
 */

import './scss/styles.scss';
import {API_URL, settings} from "./utils/constants";
import { LarekAPI } from "./components/api/larekAPI";
import { EventEmitter } from "./components/base/events";
import { GoodsModel } from "./components/model/goodsModel";
import { LarekStorage } from "./components/storage/storage";
import {IGoodsModel, TGood, TListGoods} from "./types/good/model";
import { showError } from "./components/base/error";
import {TCategoryType, TIdGoodType} from "./types";
import {CardGood} from "./components/view/cardGood";
import {cloneTemplate, ensureElement, isEmpty} from "./utils/utils";
import {Page} from "./components/view/page";
import {BasketModel} from "./components/model/basketModel";
import {IBasketModel} from "./types/basket/model";
import {OrderModel} from "./components/model/orderModel";
import {TPaymentType} from "./types/order/model";
import {closeModal, priceToString, showModal} from "./components/function/function";
import {Basket} from "./components/view/basket";
import {OrderViewPay} from "./components/view/order_pay";
import {OrderViewContacts} from './components/view/order_contacts';
import {IOrderView} from "./types/order/view";
import { TOrderApi } from "./types/api";

/*
// Тесты
import {startTests} from "./test/test";
startTests();
throw '';
*/

// Заготовки
// Под карту
// 1. В каталоге
const templateCatalog = ensureElement<HTMLTemplateElement>(settings.elements.card.templateCatalog) as HTMLTemplateElement;
// 2. В просмотре товара
const templateDetails = ensureElement<HTMLTemplateElement>(settings.elements.card.templateDetails) as HTMLTemplateElement;
// 3. В корзине
const templateBasket = ensureElement<HTMLTemplateElement>(settings.elements.card.templateBasket) as HTMLTemplateElement;
// Корзина
const templateBasketList = ensureElement<HTMLTemplateElement>(settings.elements.basket.template);
// Первая страница заказа
const templatePageOrder = ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageOrder);
// Вторая страница заказа
const templatePageContacts = ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageContacts);

// Всё нужное
let displayedModal = false;                    // Признак активности модального окна
const events = new EventEmitter();                     // Брокер событий;
const storage = new LarekStorage();                    // Хранилище
const apiLarek = new LarekAPI(API_URL);                // Api
// Модели
const goodsModel = new GoodsModel(events);             // Список товаров
const basketModel = new BasketModel(events);           // Корзина
const orderModel = new OrderModel(events);             // Параметры заказа
// Отображения
const orderPay = new OrderViewPay(cloneTemplate(templatePageOrder),events);               // Первая страница заказа
const orderContacts = new OrderViewContacts(cloneTemplate(templatePageContacts),events);  // Вторая страница заказа

// Страница
const page = new Page(ensureElement(settings.elements.page.pageContent) as HTMLElement, events);

// Модальное окно
const windowModal = ensureElement<HTMLElement>(settings.elements.modal.modalContainer);
const contentModal = ensureElement<HTMLElement>(settings.elements.modal.modalContent, windowModal);

// Функции
/**
 * Перестроить корзину
 */
function rebuildBasket(): void {
  let count: number = 0;
  let totalSum: number = 0;

  const goodsHTMLArray = Array.from(basketModel.goods).map(idGood => {
    const good = goodsModel.getGood(idGood);
    count++;

    totalSum = totalSum + good.price;
    return new CardGood(cloneTemplate(templateBasket), events)
      .render({
        number: count,
        id: good.id,
        title: good.title,
        price: good.price,
      });
    });
  const basketView = new Basket(cloneTemplate(templateBasketList), events).
    render({
      basketList: goodsHTMLArray,
      totalSum: priceToString(totalSum),
    });

  contentModal.replaceChildren(basketView);
}

// Загрузить карты из API
apiLarek.getGoods()
  .then(data => {
    /* Переписать из API в свою структуру
       Структуры могут не совпадать
       См. настройку settings.api.goods
     */
    const listGoods: TListGoods = new Map<TIdGoodType, TGood>();
    data.items.forEach((item: {[index: string]:any}) => {
      const good: {[index: string]:any} = {};
      settings.api.goods.forEach((link) => {
        good[link[0]] = item[link[1]];
      });

      listGoods.set(good.id, good as TGood);
    })
    goodsModel.goods = listGoods;
  })
  .catch(err => {
    showError('Загрузка товаров', err.message);
  });

// Загрузить из локального хранилища, если там чего-то есть
if (settings.storage.active) {
  // Корзина
  const basketStorage = storage.loadBasket();
  if (!isEmpty(basketStorage)) {
    basketModel.editDate = basketStorage.editDate;
    basketModel.goods = basketStorage.goods;
  }
  // Параметры заказа
  const orderStorage = storage.loadOrder();
  if (!isEmpty(orderStorage)) {
    orderModel.payment = orderStorage.payment;
    orderModel.email = orderStorage.email;
    orderModel.phone = orderStorage.phone;
    orderModel.address = orderStorage.address;
  }
}

// Слушатели
// Для модального окна, кнопка закрытия
ensureElement(settings.elements.modal.closeButton, windowModal).addEventListener('click', () =>
  displayedModal = closeModal(displayedModal, windowModal, contentModal)
);

// Показ корзины
ensureElement(settings.elements.page.basketButton,)
  .addEventListener('click', () => events.emit(settings.events.page.showBasket));

// Обработка сообщений
// Сообщение -> Изменение списка товаров в каталоге
events.on(settings.events.card.goodsAllChange, () => {
  const goodsHTMLArray = Array.from(goodsModel.goods).map(item => {
      return new CardGood(cloneTemplate(templateCatalog), events).render(item[1] as Partial<TGood>)
    }
  )

  page.render({
      goodsList: goodsHTMLArray,
      basketCount: basketModel.getCount(),
    }
  )
});

// Сообщение -> Клик на карте
events.on(settings.events.card.cardDetail, (data: Partial<TGood>) => {
  // Показ карты товара
  const good = goodsModel.getGood(data.id);
  const isBasket = basketModel.isBasket(data.id);

  let captionButton = 'Добавить в корзину';
  let disabledButton = false;
  if (isBasket) captionButton = 'Удалить из корзины';
  else if (isEmpty(good.price)) {
    captionButton = 'Нет цены';
    disabledButton = true;
  }

  const card=  new CardGood(cloneTemplate(templateDetails), events)
    .render({...good, buttonText: captionButton, buttonDisabled: disabledButton});
  contentModal.replaceChildren(card);
  displayedModal = showModal(displayedModal, windowModal);
})

// Сообщение -> Клик на кнопке в карте товара "Добавить"/"Удалить" в корзину
events.on(settings.events.card.cardBasket,  (data: Partial<TGood>) => {
  if (!isEmpty(data)) {
    if (basketModel.isBasket(data.id)) basketModel.deleteGood(data.id); // Товар уже в корзине
    else basketModel.addGood(data.id);                               // Товара нет в корзине

    page.render({
        basketCount: basketModel.getCount(),
    });
  }
})

// Сообщение -> Изменена корзина
events.on(settings.events.basket.changeBasket,  (data: Partial<TGood>) => {
  // Сохраниться в локальное хранилище
  if (settings.storage.active) {
    storage.saveBasket(
      {
        editDate: basketModel.editDate,
        goods: basketModel.goods,   // список товаров в корзине
      }
    );
  }
  page.render({
    basketCount: basketModel.getCount(),
  })

})

// Сообщение -> Клик на кнопке "Покажи мне корзину"
events.on(settings.events.page.showBasket,() => {
  // Показ корзины
  rebuildBasket();
  displayedModal = showModal(displayedModal, windowModal);
});

// Сообщение -> Клик на кнопке "Удалить" в корзине
events.on(settings.events.basket.goodDelete,(data: Partial<TGood>) => {
  basketModel.deleteGood(data.id);
  rebuildBasket();
});

// Сообщение -> Клик на кнопке "Оформить" в корзине
events.on(settings.events.order.makeOrder,() => {
  const orderView = orderPay.render({
    payment: orderModel.payment,
    address: orderModel.address,
  });
  contentModal.replaceChildren(orderView);
  displayedModal = showModal(displayedModal, windowModal);
});

// Сообщение -> Клик на кнопке "Далее" в заказе
events.on(settings.events.order.changeOrder,(data: Partial<IOrderView> ) => {
  orderModel.address = data.address;
  orderModel.payment = data.payment;

  const contactsView = orderContacts.render({
    email: orderModel.email,
    phone: orderModel.phone,
  });

  contentModal.replaceChildren(contactsView);
});

// Сообщение -> Клик на кнопке "Оплатить" в заказе
events.on(settings.events.order.changeContacts,(data: Partial<IOrderView> ) => {
  orderModel.email = data.email;
  orderModel.phone = data.phone;

  // ... и отправить заказ
  const totalSum = basketModel.calcTotal(goodsModel);
  /* Переписать из своей структуры в API
     Структуры могут не совпадать
     См. настройку settings.api.order
   */
  const orderSend: any  = {};    // Для отправки в API
  const orderStorage: any  = {}; // Для сохранения в локальное хранилище
  settings.api.order.forEach((item) => {
    const keyModel = item[0];
    const keyApi = item[1];
    if (keyModel === 'total') {
      orderSend[keyApi] = totalSum;
    } else if (keyModel === 'items') {
      orderSend[keyApi] = Array.from(basketModel.goods);
    } else {
      const value = orderModel[keyModel as keyof typeof orderModel];
      orderSend[keyApi] = value;
      orderStorage[keyApi] = value;
    }
  });

  // Сохранить в локальное хранилище
  storage.saveOrder(orderStorage);
  console.log(orderSend);


  /*
  const orderSend: IOrderApi = {
    payment: orderModel.payment,  // Тип оплаты
    email: orderModel.email,      // Электронная почта
    phone: orderModel.phone,      // Телефон
    address: orderModel.address,  // Адрес доставки
    total: totalSum,         // Сумма заказа
    items: basketModel.goods,      // Список товаров
  };
*/
  //const contactsView = orderContacts.render(orderModel as Partial<IOrderView>);
  //contentModal.replaceChildren(contactsView);
});


//events.on(settings.events.order.changeOrder,() => {

//};
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

