/**
 * Основной модуль приложения
 */

import './scss/styles.scss';
import { API_URL, settings } from "./utils/constants";
import { LarekAPI } from "./components/api/larekAPI";
import { EventEmitter } from "./components/base/events";
import { GoodsModel } from "./components/model/goodsModel";
import { LarekStorage } from "./components/storage/storage";
import { TGood, TListGoods } from "./types/good/model";
import { showError } from "./components/base/error";
import { TIdGoodType } from "./types";
import { CardGood } from "./components/view/cardGood";
import { cloneTemplate, ensureElement, isEmpty } from "./utils/utils";
import { Page } from "./components/view/page";
import { BasketModel } from "./components/model/basketModel";
import { OrderModel } from "./components/model/orderModel";
import { priceToString } from "./components/function/function";
import { Basket } from "./components/view/basket";
import { OrderViewPay } from "./components/view/order_pay";
import { OrderViewContacts } from './components/view/order_contacts';
import { IOrderView } from "./types/order/view";
import { Modal } from "./components/base/modal";
import {OrderViewSuccess} from "./components/view/order_success";

/*
// Тесты
import {startTests} from "./test/test";
startTests();
throw '';
*/

// Заготовки
// Модальное окно
const elementModal = ensureElement<HTMLTemplateElement>(settings.elements.modal.modalContainer);
// Под карту
// 1. В каталоге
const templateCatalog = ensureElement<HTMLTemplateElement>(settings.elements.card.templateCatalog);
// 2. В просмотре товара
const templateDetails = ensureElement<HTMLTemplateElement>(settings.elements.card.templateDetails);
// 3. В корзине
const templateBasket = ensureElement<HTMLTemplateElement>(settings.elements.card.templateBasket);
// Корзина
const cloneBasketList = cloneTemplate(ensureElement<HTMLTemplateElement>(settings.elements.basket.template));
// Первая страница заказа
const clonePageOrder = cloneTemplate(ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageOrder));
// Вторая страница заказа
const clonePageContacts = cloneTemplate(ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageContacts));
// Третья страница заказа
const clonePageSuccess = cloneTemplate(ensureElement<HTMLTemplateElement>(settings.elements.order.templatePageSuccess));

// Всё нужное
const events = new EventEmitter();                     // Брокер событий;
const storage = new LarekStorage();                    // Хранилище
const apiLarek = new LarekAPI(API_URL);                // Api
// Модели
const goodsModel = new GoodsModel(events);             // Список товаров
const basketModel = new BasketModel(events);           // Корзина
const orderModel = new OrderModel(events);             // Параметры заказа
// Отображения
const modalWindow = new Modal(elementModal, events, settings.elements.modal, settings.keysClose);  // Модальное окно
const basketView = new Basket(cloneBasketList, events);                  // Отображение корзины
const orderPay = new OrderViewPay(clonePageOrder, events);               // Первая страница заказа
const orderContacts = new OrderViewContacts(clonePageContacts, events);  // Вторая страница заказа
const orderSuccess = new OrderViewSuccess(clonePageSuccess, events);    // Третья страница заказа

// Страница
const page = new Page(ensureElement(settings.elements.page.pageContent) as HTMLElement, events);

// Функции
/**
 * Перестроить корзину
 */
function rebuildBasket(): HTMLElement {
  let count: number = 0;

  const goodsHTMLArray = Array.from(basketModel.goods).map(item => {
    const good = goodsModel.getGood(item[0]);
    const countInBasket = item[1];  // Количество в корзине

    count++;
    return new CardGood(cloneTemplate(templateBasket), events)
      .render({
        number: count,
        id: good.id,
        // Название (сколько штук)
        title: `${good.title} (${priceToString(settings.case.piece, countInBasket)})`,
        price: basketModel.calcGood(good),
      });
  });

  let basket: HTMLElement;
  if (count === 0) {   // В корзине ничего нет
    basket = basketView.render({
      basketEmpty : 'Корзина пуста',
      totalSum: priceToString(settings.case.synapse, 0),
    });

    //page.contentModal.replaceChildren(basket);
  } else {             // В корзине есть товары
    basket = basketView.render({
      basketList: goodsHTMLArray,
      totalSum: priceToString(settings.case.synapse, basketModel.calcTotal(goodsModel)),
    });

    //page.contentModal.replaceChildren(basket);
  }
  return basket;
}

// Загрузить товары из API
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

    // Теперь можно загрузить корзину из локального хранилища, если там чего-то есть
    if (settings.storage.active) {
      // Корзина
      const basketStorage = storage.loadBasket();
      if (!isEmpty(basketStorage)) {
        basketModel.editDate = basketStorage.editDate;
        // Проверить товары из корзины, А вдруг уже нет в каталоге?
        const tempGoods = new Map<TIdGoodType, number>;
        basketStorage.goods.forEach((count, id) => {
          if (!isEmpty(goodsModel.getGood(id))) {
            // Товар в каталоге есть! Можно оставить в корзине.
            tempGoods.set(id, count);
          }
        });
        basketModel.goods = tempGoods;
      }
    }
  })
  .catch(err => {
    showError('Загрузка товаров', err.message);
  });

// Теперь можно загрузить параметры заказа из локального хранилища, если там чего-то есть
if (settings.storage.active) {
  // Параметры заказа
  const orderStorage = storage.loadOrder();
  if (!isEmpty(orderStorage)) {
    orderModel.payment = orderStorage.payment;
    orderModel.email = orderStorage.email;
    orderModel.phone = orderStorage.phone;
    orderModel.address = orderStorage.address;
  }
}

// Обработка сообщений
// Сообщение -> Изменение списка товаров в каталоге
events.on(settings.events.card.goodsAllChange, () => {
  const goodsHTMLArray = Array.from(goodsModel.goods).map(item => {
    return new CardGood(cloneTemplate(templateCatalog), events).render(item[1] as Partial<TGood>)
  });

  page.render({
    goodsList: goodsHTMLArray,
    basketCount: basketModel.getCount(),
  });
});

// Сообщение -> Клик на карте
events.on(settings.events.card.cardDetail, (data: Partial<TGood>) => {
  // Показ карты товара
  const good = goodsModel.getGood(data.id);

  let captionButton = 'Добавить в корзину';
  let disabledButton = false;
  if (isEmpty(good.price)) {
    captionButton = 'Нет цены';
    disabledButton = true;
  }

  modalWindow.render({
    content: new CardGood(cloneTemplate(templateDetails), events)
                 .render({...good, buttonText: captionButton, buttonDisabled: disabledButton}),
  });
});

// Сообщение -> Клик на кнопке в карте товара "Добавить в корзину"
events.on(settings.events.card.cardBasket,  (data: Partial<TGood>) => {
  if (isEmpty(data)) return;
  basketModel.addGood(data.id);

  page.render({
      basketCount: basketModel.getCount(),
  });
});

// Сообщение -> Изменена корзина
events.on(settings.events.basket.changeBasket,  () => {
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
  });
});

// Сообщение -> Клик на кнопке "Покажи мне корзину"
events.on(settings.events.page.showBasket,() => {
  modalWindow.render({
    content: rebuildBasket(),
  });
});

// Сообщение -> Клик на кнопке "Удалить" в корзине
events.on(settings.events.basket.goodDelete,(data: Partial<TGood>) => {
  basketModel.deleteGood(data.id);

  modalWindow.render({
    content: rebuildBasket(),
  });
});

// Сообщение -> Клик на кнопке "Оформить" в корзине
events.on(settings.events.order.makeOrder,() => {
  const textError = orderModel.validation({
    payment: orderModel.payment,
    address: orderModel.address,
  });

  modalWindow.render({
    content: orderPay.render({
                payment: orderModel.payment,
                address: orderModel.address,
                errorValidation: textError,
              }),
  });
});

// Сообщение -> Изменение данных на первой странице заказа
events.on(settings.events.order.changeValueOrder,(data: Partial<IOrderView> ) => {
  const textError = orderModel.validation(data);

  orderPay.render({
    errorValidation: textError,
  });
});

// Сообщение -> Изменение данных на второй странице заказа
events.on(settings.events.order.changeValueContacts,(data: Partial<IOrderView> ) => {
  const textError = orderModel.validation(data);

  orderContacts.render({
    errorValidation: textError,
  });
});

// Сообщение -> Клик на кнопке "Далее" в заказе
events.on(settings.events.order.changeOrder,(data: Partial<IOrderView> ) => {
  orderModel.address = data.address;
  orderModel.payment = data.payment;

  const textError = orderModel.validation({
    email: orderModel.email,
    phone: orderModel.phone,
  });

  modalWindow.render({
    content: orderContacts.render({
                email: orderModel.email,
                phone: orderModel.phone,
                errorValidation: textError,
             }),
  });
});

// Сообщение -> Клик на кнопке "Оплатить" в заказе
events.on(settings.events.order.changeContacts,(data: Partial<IOrderView>) => {
  orderModel.email = data.email;
  orderModel.phone = data.phone;

  const totalSum = basketModel.calcTotal(goodsModel);
  /* Переписать из своей структуры в API
     Структуры могут не совпадать
     См. настройку settings.api.order
   */
  const orderSend: any = {};    // Для отправки в API
  const orderStorage: any = {}; // Для сохранения в локальное хранилище
  settings.api.order.forEach((item) => {
    const keyModel = item[0];
    const keyApi = item[1];
    if (keyModel === 'total') {
      orderSend[keyApi] = totalSum;
    } else if (keyModel === 'items') {
      orderSend[keyApi] = [];

      // Развалить количество на отдельные строки
      basketModel.goods.forEach((count, id) => {
        for (let num = 0; num < count; num++) {
          orderSend[keyApi].push(id)
        }
      });
    } else {
      const value = orderModel[keyModel as keyof typeof orderModel];
      orderSend[keyApi] = value;
      if (settings.storage.active) orderStorage[keyApi] = value;
    }
  });

  // Сохранить в локальное хранилище
  if (settings.storage.active) storage.saveOrder(orderStorage);

  // ... и отправить заказ
  apiLarek.sendOrder(orderSend)
    .then(data => {
      if (!isEmpty(data.error)) {  // Что-то пошло не так
        showError('Отправка заказа', data.error);
      } else {
        events.emit(settings.events.order.sendedOrder, {total: data.total});
      }
    })
    .catch(err => {
      showError('Отправка заказа', err.message);
    });
});

// Сообщение -> Заказ отправлен
events.on(settings.events.order.sendedOrder, (data: Partial<IOrderView>  ) => {
  // ... и очистить корзину
  basketModel.goods = null;
  // ... и поблагодарить пользователя за заказ!
  modalWindow.render({
    content: orderSuccess.render({
      total: data.total,
    }),
  });
});

// Сообщение -> Закрыть окно заказа
events.on(settings.events.order.closeOrder, () => {
  modalWindow.close();
});

