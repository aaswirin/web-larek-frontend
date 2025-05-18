export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  // События
  events: {
    // Карта товара
    card: {
      goodsAllChange: 'goods:all:change',      // Событие "Изменён весь список товаров"
      cardDetail: 'card:showDetail',           // А покажи мне подробно товар
    },
    basket: {
      goodChangeBasket: 'basket:change',       // Добавить/Удалить товар в корзине
    },
    page: {
      showBasket: 'page:showBasket',           // Событие "А покажи ка мне корзину"
    },
    order: {
      makeOrder: 'order:make',                 // Событие "Сделать заказ"
      changeOrder: 'order:change',             // Событие "Изменился заказ"
    },
  },
  keysClose: [                                 // Список клавиш, по которым закрываем окно. Вдруг поменяется?
    'Escape',
    //'F10',
  ],
  // Элементы вёрстки
  elements: {
    // Страница
    page: {
      pageContent: '.page__wrapper',           // Содержимое страницы
      listGoods: '.gallery',                   // Галерея для карт товара
      basketCount: '.header__basket-counter',  // Количество в корзине
      basketButton: '.header__basket',         // Кнопка корзины, при нажатии открывается корзина
    },
    // Модальное окно
    modal: {
      modalContainer: '#modal-container',      // Модальное окно
      modalContent: '.modal__content',         // Внутренности модального окна
      modalActive: 'modal_active',             // Активное модальное окно
      closeButton: '.modal__close',            // Кнопка закрытия
      basketButton: '.card__button',           // Кнопка "В корзину"
    },
    // Карта товара
    card: {
      templateCatalog: '#card-catalog',        // Заготовка для карты товара
      templateDetails: '#card-preview',        // Заготовка для детального просмотра товара
      templateBasket: '#card-basket',          // Заготовка для товара в корзине
      cardBody: '.gallery__item',              // Сама карта
      buttonDelete: '.basket__item-delete',    // Кнопка "Удалить" в корзине
      number: '.basket__item-index',           // Номер в корзине
      category: '.card__category',             // Категория
      title: '.card__title',                   // Заголовок
      image: '.card__image',                   // Картинка
      price: '.card__price',                   // Цена
    },
    // Корзина
    basket: {
      template: '#basket',                     // Заготовка для корзины
      templateList: '.basket__list',           // Заготовка для списка корзины
      totalSum: '.basket__price',              // Сумма корзины
      buttonOrder: '.basket__button',          // Кнопка "Оформить"
    },
    // Заказ
    order: {
      // Первая страница
      templatePageOrder: '#order',             // Страница для ввода Типа оплаты и Адреса
      buttonClassActive: 'button_alt-active',  // Кнопка "Онлайн"
      buttonCard: '[name="card"]',             // Кнопка "Онлайн"
      buttonCash: '[name="cash"]',             // Кнопка "При получении"
      inputAddress: '[name="address"]',        // Поле ввода "Адрес"
      buttonOrder: '.order__button',           // Кнопка "Далее"
      // Вторая страница
      templatePageContacts: '#contacts',       // Страница для ввода Почты и Телефона
      inputEMail: '[name="email"]',            // Поле ввода "Почта"
      inputPhone: '[name="phone"]',            // Поле ввода "Телефон"
      buttonContacts: '.contacts__button',     // Кнопка "Оплатить"
      // Третья страница
      templatePageSuccess: '#success',         // Заключительная страница
      totalSum: '.order-success__description', // Сумма заказа
      buttonSuccess: '.order-success__close',  // Кнопка "За новыми покупками!"
    },
  },
};
