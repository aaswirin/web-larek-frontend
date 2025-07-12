/**
 * Настройки
 */
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  // API
  api: {
    // Связки полей модели данных и API
    /**
     * Товары
     * goods[N][0] - имя поля в модели данных
     * goods[N][1] - имя поля в API
     */
    goods: [
      ['id', 'id'],
      ['description', 'description'],
      ['image', 'image'],
      ['title', 'title'],
      ['category', 'category'],
      ['price', 'price'],
    ],
    /**
     * Заказ
     * order[N][0] - имя поля в модели данных
     * order[N][1] - имя поля в API
     */
    order: [
      ['payment', 'payment'],
      ['email', 'email'],
      ['phone', 'phone'],
      ['address', 'address'],
      ['total', 'total'],
      ['items', 'items'],
    ],
  },
  // События
  events: {
    // Карта товара
    card: {
      goodsAllChange: 'goods:allChange',       // Событие "Изменён весь список товаров"
      cardDetail: 'card:showDetail',           // А покажи мне подробно товар
      cardBasket: 'card:editBasket',           // Изменить корзину из детального просмотра
    },
    // Корзина
    basket: {
      changeBasket: 'basket:change',           // Корзина поменялась
      goodDelete: 'basket:delete',             // Удалён товар из корзины
    },
    // Заказ
    order: {
      makeOrder: 'order:make',                 // Событие "Сделать заказ"
      changeValueOrder: 'order:changeValueOrder',         // Изменение данных на первой странице заказа
      changeOrder: 'order:changePay',          // Событие "Перейти на вторую страницу заказа"
      changeValueContacts: 'order:changeValueContacts',   // Изменение данных на первой странице заказа
      changeContacts: 'order:changeContacts',  // Событие "Отправить заказ"
    },
    // Страница
    page: {
      showBasket: 'page:showBasket',           // Событие "А покажи ка мне корзину"
    },
  },
  keysClose: [                                 // Список клавиш, по которым закрываем окно. Вдруг поменяется?
    'Escape',
    //'F10',
  ],
  storage: {
    active: true,                              // Сохранять ли в локальное хранилище?
  },
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
      catClass : new Map([                     // Классы для разных категорий
        ['софт-скил', 'card__category_soft'],
        ['другое', 'card__category_other'],
        ['дополнительное', 'card__category_additional'],
        ['кнопка', 'card__category_button'],
        ['хард-скил', 'card__category_hard'],
     ]),
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
      buttonClassActive: 'button_alt-active',  // Активность кнопок
      defaultPay: 'offline',                   // Выбор по умолчанию типа оплаты
      buttonCard: '[name="card"]',             // Кнопка "Онлайн"
      buttonCash: '[name="cash"]',             // Кнопка "При получении"
      inputAddress: '[name="address"]',        // Поле ввода "Адрес"
      buttonOrder: '.order__button',           // Кнопка "Далее"
      errorOrder: '.form__errors',             // Поле для вывода ошибок валидации
      // Вторая страница
      templatePageContacts: '#contacts',       // Страница для ввода Почты и Телефона
      inputEMail: '[name="email"]',            // Поле ввода "Почта"
      // Шаблон для проверки почты
      patternEMail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
      inputPhone: '[name="phone"]',            // Поле ввода "Телефон"
      // Шаблон для проверки телефона
      patternPhone: /(?:\+|\d)[\d\-\(\) ]{9,}\d/g,
      buttonContacts: '.contacts__button',     // Кнопка "Оплатить"
      errorContacts: '.form__errors',          // Поле для вывода ошибок валидации
      // Третья страница
      templatePageSuccess: '#success',         // Заключительная страница
      totalSum: '.order-success__description', // Сумма заказа
      buttonSuccess: '.order-success__close',  // Кнопка "За новыми покупками!"
    },
  },
  // Падежометр
  case: {
    synapse: new Map([  // Синапс
      [0, "Бесценно"],
      [1, "синапс"],
      [2, "синапса"],
      [3, "синапсов"],
    ]),
    piece: new Map([    // Штука
      [0, "Нет"],
      [1, "штука"],
      [2, "штуки"],
      [3, "штук"],
    ]),
  }
};
