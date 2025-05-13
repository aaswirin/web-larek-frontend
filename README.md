# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура приложения
Приложение разделено на слои, согласно шаблону MVP:
- слой данных - преобразование и хранение данных приложения;
- слой отображение - размещение и отображение данных на странице;
- презентер - связь отображения и данных
### Базовые классы
### Api
Класс реализует базовые методы запросов к серверу
#### Класс содержит:
- метод<code>get(uri: string)</code> - отправка запроса "GET"
- метод<code>post(uri: string, data: object, method: ApiPostMethods = 'POST')</code> - отправка данных методом "POST"
### EventEmitter
Класс реализует отправку и получение событий в приложении
#### Класс содержит:
- метод<code>on<T extends object>(eventName: EventName, callback: (event: T) => void)</code> - устанавливает обработчик на событие
- метод<code>emit<T extends object>(eventName: string, data?: T)</code> - инициировать событие с данными
## Описание данных
### Описание сообщений между слоями приложения
- <code>goods:all:change</code> - событие "Изменён весь список товаров"
- <code>card:showDetail</code> - событие "Показать товар детально"
- <code>basket:change</code> - событие "Добавить/Удалить товар в корзине"
- <code>page:showBasket</code> - событие "Показать корзину"
- <code>order:make</code> - событие "Сделать заказ"
- <code>order:change</code> - событие "Изменился заказ"
### Слой "Модель данных":
### Типы:
### TCategoryType
Описывает тип категории товара
### TIdGoodType
Описывает тип ID товара
### TPaymentType
Описывает тип оплаты заказа

### Интерфейсы
### IGoodModel
Описывает интерфейс товара
#### Интерфейс содержит:
- <code>id: TIdGoodType</code> - id товара
- <code>description: string</code> - описание
- <code>image: string</code> - URL картинки
- <code>title: string</code> - наименование
- <code>category: TCategoryType</code> - категория
- <code>price: number | null</code> - цена
- <code>number?:  number;</code> - порядковый номер
### IBasketModel
Описывает интерфейс корзины
#### Интерфейс содержит:
- <code>startDate: Date</code> - дата и время начала формирования корзины
- <code>goods: Set<TIdGoodType></code> - список id'ов товаров в корзине
### IOrderModel
Описывает интерфейс заказа
#### Интерфейс содержит:
- <code>payment: TPaymentType</code> - тип оплаты
- <code>total: number</code> - сумма заказа
- <code>goods: TIdGoodType[]</code> - список id'ов заказанных товаров
- <code>email: string</code> - электронная почта
- <code>phone: string</code> - телефон
- <code>address: string</code> - адрес доставки
### Классы
### GoodsModel
Класс реализует хранение списка товаров
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>goods: Map<TIdGoodType, IGood></code> - список товаров
- конструктор <code>constructor(protected events: IEvents, data: IGoodModel[] | null)</code>
- метод <code>getGoods(): IGoodModel[]</code> - получить список товаров
- метод <code>setGoods(data: IGoodModel[]): void</code> - установить список товаров
- метод <code>getGood(id: TIdGoodType): IGoodModel</code> - получить товар по id
### BasketModel
Класс реализует хранение корзины
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>startDate: Date</code> - дата и время начала формирования корзины
- свойство <code>goods: Set<TIdGoodType></code> - список id'ов товаров в корзине
- конструктор <code>constructor(events: IEvents, data: IBasketModel)</code>
- метод <code>start(): void</code> - установка времени и даты начала формирования корзины
- метод <code>clear(): void</code> - очистка корзины
- метод <code>setGoods(data: TIdGoodType[]): void : void</code> - загрузить список товаров в корзину
- метод <code>addGood(data: Partial<IGoodModel>): void</code> - добавить товар в корзину
- метод <code>deleteGood(data: Partial<IGoodModel>): void</code> - удалить товар из корзины
- метод <code>getCount(): number</code> - получить количество товаров в корзине
- метод <code>isBasket(data: Partial<IGoodModel>): boolean</code> - проверить наличие товара в корзине
-
### OrderModel
Класс реализует хранение заказа
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>payment: TPaymentType</code> - тип оплаты
- свойство <code>total: number</code> - сумма заказа
- свойство <code>goods: TIdGoodType[]</code> - id заказанных товаров
- свойство <code>email: string</code> - электронная почта
- свойство <code>phone: string</code> - телефон
- свойство <code>address: string</code> - адрес
- конструктор <code>constructor(protected events: IEvents, data: Partial<IOrderModel>)</code>
- метод <code>getOrder(): IOrderModel</code> - получить заказ
- метод <code>setOrder(data: Partial<IOrderModel>): void</code> - записать заказ
- метод <code>getGoods(): TIdGoodType[]</code> - получить список товаров из заказа
- метод <code>setGoods(data: TIdGoodType[]): void</code> - установить список товаров
### Слой "API"
### Интерфейсы
### IGoodApi
Описывает товары, полученные из API
#### Интерфейс содержит:
- <code>total: number</code> - количество товаров
- <code>items: IGoodModel[]</code> - список товаров
### IOrderApi
Описывает заказ, отправляемый в API
#### Интерфейс содержит:
- <code>payment: TPaymentType</code> - тип оплаты
- <code>email: string</code> - электронная почта
- <code>phone: string</code> - телефон
- <code>address: string</code> - адрес доставки
- <code>total: number</code> - сумма заказа
- <code>items: TIdGoodType[]</code> - список товаров
### IAnswerOrderApi
Описывает ответ, после отправки заказа в API
#### Интерфейс содержит:
- <code>id: string</code> - id заказа
- <code>total: number</code> - сумма списано
- <code>error: string</code> - текст ошибки
### Классы
### LarekAPI
Класс реализует хранение заказа
#### Класс содержит:
- метод <code>getGoods(): Promise<IGoodApi></code> - получить товары с сервера
- метод <code>sendOrder(order: IOrderApi): Promise<IAnswerOrderApi></code> - отправить товары на сервер
### Слой "Хранилище"
### Классы
### LarekStorage
Класс реализует сохранение и восстановление данных приложения в локальное хранилище.
В локально хранилище сохраняются состав корзины и параметры заказа (без списка товаров заказа)
#### Класс содержит:
- свойство <code>keyBasket: string</code> - ключ данных для хранения корзины
- свойство <code>keyOrder: string</code> - ключ данных для хранения параметров заказа
- метод <code>loadBasket(): IBasketModel | null</code> - читает из локального хранилища состав корзины
- метод <code>saveBasket(basket: object)</code> - пишет в локальное хранилище состав корзины
- метод <code>loadOrder(): Partial<IOrderModel> | null</code> - читает из локального хранилища данные заказа
- метод <code>saveOrder(order: object)</code> - пишет в локальное хранилище состав данные заказа
### Слой "Отображение"
### Типы:
### TCardGoodOwner
Описывает тип владельца карты товара <code>'catalog' | 'detail' | 'basket'</code>
### TCardGoodStatus
Описывает состояние товара <code>'basket' | 'free' | 'no_price'</code>
### Интерфейсы
### ICardGoodView
Описывает карту товара для отображения
#### Интерфейс содержит:
- <code>number: number</code> - номер товара в корзине
- <code>category: string</code> - категория товара
- <code>title: string</code> - наименование товара
- <code>image: string</code> - изображение товара
- <code>price: number | null</code> - цена товара
- <code>id: TIdGoodType</code> - id товара
- <code>buttonText: string</code> - надпись на кнопке
### IBasketView
Описывает карту товара для отображения
#### Интерфейс содержит:
- <code>basketList: HTMLElement[]</code> - список товаров корзины
- <code>totalSum: string</code> - сумма товаров корзины
### iIOrderView
Описывает заказ для отображения
#### Интерфейс содержит:
- <code>payment: TPaymentType</code> - тип оплаты
- <code>address: string</code> - адрес доставки
- <code>email: string</code> - электронная почта
- <code>phone: string</code> - телефон
- <code>total: number</code> - сумма списано
- <code>goods: TPaymentType[]</code> - список товаров в заказе
### IPage
Описывает страницу отображения
#### Интерфейс содержит:
- <code>goodsList: HTMLElement[]</code> - список элементов карт товара на странице
- <code>basketCount: number</code> - количество товаров в корзине
### IWebLarek
Описывает приложение
#### Интерфейс содержит:
- <code>api: LarekAPI</code> - объект, обслуживающий API
- <code>storage: LarekStorage</code> - объект, обслуживающий локальное хранилище
- <code>goodsModel: GoodsModel</code> - объект, обслуживающий модель данных "Товары"
- <code>basketModel: BasketModel</code> - объект, обслуживающий модель данных "Корзина"
- <code>orderModel: OrderModel</code> - объект, обслуживающий модель данных "Заказ"
- <code>page: Page</code> - объект, обслуживающий представление "Страница"
- <code>basket: Basket</code> - объект, обслуживающий представление "Корзина"
- <code>order: Order</code> - объект, обслуживающий представление "Корзина"
### Классы
### CardGoodView
Класс для отображения карты товара в каталоге, детальном просмотре и корзине
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>owner: TCardGoodOwner</code> - владелец карты товара
- свойство <code>status?: TCardGoodStatus</code> - статус товара
- свойство <code>number: number</code> - номер товара в корзине
- свойство <code>category: TCategoryType</code> - категория товара
- свойство <code>title: string</code> - наименование товара
- свойство <code>image: string</code> - изображение товара
- свойство <code>price: number | null</code> - цена товара
- свойство <code>id: TIdGoodType</code> - id товара
- свойство <code>buttonText: string</code> - надпись на кнопке, если товар в детальном просмотре
- свойство <code>templateCatalog: HTMLTemplateElement</code> - заготовка из вёрстки для товара в каталоге
- свойство <code>templateDetails: HTMLTemplateElement</code> - заготовка из вёрстки для товара в детальном просмотре
- свойство <code>templateBasket: HTMLTemplateElement</code> - заготовка из вёрстки для товара в корзине
- свойство <code>elementNumber: HTMLElement</code> - элемент вёрстки для вывода номера
- свойство <code>elementCategory: HTMLElement</code> - элемент вёрстки для вывода категории
- свойство <code>elementTitle: HTMLElement</code> - элемент вёрстки для вывода заголовка
- свойство <code>elementImage: HTMLImageElement</code> - элемент вёрстки для вывода изображения
- свойство <code>elementPrice: HTMLElement</code> - элемент вёрстки для вывода цены
- свойство <code>basketButton: HTMLButtonElement</code> - кнопка "В корзину", если карта товара в детальном просмотре
- свойство <code>HTMLButtonElement: HTMLButtonElement</code> - кнопка "Удалить", если карта товара в корзине
- конструктор <code>constructor(container: HTMLTemplateElement, protected events: EventEmitter,protected owner: TCardGoodOwner, protected status?: TCardGoodStatus)</code>
### BasketView
Класс для отображения корзины
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>template: HTMLTemplateElement</code> - заготовка из вёрстки окна корзины
- свойство <code>galleryCards: HTMLElement</code> - элемент вёрстки списка корзины
- свойство <code>basketSum: HTMLElement</code> - элемент вёрстки суммы корзины
- свойство <code>basketList: HTMLElement</code> - список товаров корзины
- свойство <code>totalSum: HTMLElement</code> - сумма товаров корзины
- конструктор <code>constructor(container: HTMLElement, protected events: EventEmitter)</code>
### OrderView
Класс для отображения заказа
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>showPage: 'order' | 'contacts' | 'success'</code> - тип данных в окне
- свойство <code>templatePageOrder:HTMLTemplateElement</code> - заготовка из вёрстки первой страницы заказа
- свойство <code>buttonCard: HTMLButtonElement</code> - элемент вёрстки кнопка "Онлайн"
- свойство <code>buttonCash: HTMLButtonElement</code> - элемент вёрстки кнопка "При получении"
- свойство <code>inputAddress: HTMLInputElement</code> - элемент вёрстки поле ввода "Адрес"
- свойство <code>buttonOrder: HTMLButtonElement</code> - элемент вёрстки кнопка "Далее"
- свойство <code>templatePageContacts</code> - заготовка из вёрстки второй страницы заказа
- свойство <code>inputEMail: HTMLInputElement</code> - элемент вёрстки поле ввода "Почта"
- свойство <code>inputPhone: HTMLInputElement</code> - элемент вёрстки поле ввода "Телефон"
- свойство <code>buttonContacts: HTMLButtonElement</code> - элемент вёрстки кнопка "Оплатить"
- свойство <code>templatePageSuccess</code> - заготовка из вёрстки третьей страницы заказа
- свойство <code>buttonSuccess: HTMLButtonElement</code> - элемент вёрстки кнопка "За новыми покупками!"
- свойство <code>elementTotal: HTMLParagraphElement</code> - элемент вёрстки для вывода суммы
- свойство <code>content: HTMLElement</code> - контент для вывода в страницу заказа
- свойство <code>payment: TPaymentType</code> - тип оплаты
- свойство <code>total: number</code> - сумма списано
- свойство <code>email: string</code> - электронная почта
- свойство <code>phone: string</code> - телефон
- свойство <code>address: string</code> - адрес
- конструктор <code>constructor(container: HTMLElement, protected events: EventEmitter)</code>
### Page
Класс для отображения страницы приложения
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>galleryCards: HTMLElement</code> - элемент вёрстки для размещения карт
- свойство <code>elementBasketCount: HTMLElement</code> - элемент вёрстки количество в корзине
- свойство <code>constructor(container: HTMLElement,  protected events: EventEmitter)</code>
### WebLarek
Класс для управления приложением Web-larёk
#### Класс содержит:
- свойство <code>events: IEvents</code> - брокер событий
- свойство <code>windowModal: HTMLElement</code> - элемент вёрстки модального окна
- свойство <code>contentModal: HTMLElement</code> - содержимое модального
- свойство <code>displayedModal: boolean</code> - признак показа модального окна
- свойство <code>api: LarekAPI</code> - объект, обслуживающий API
- свойство <code>storage: LarekStorage</code> - объект, обслуживающий локальное хранилище
- свойство <code>goodsModel: GoodsModel</code> - объект, обслуживающий модель данных "Товары"
- свойство <code>basketModel: BasketModel</code> - объект, обслуживающий модель данных "Корзина"
- свойство <code>orderModel: OrderModel</code> - объект, обслуживающий модель данных "Заказ"
- свойство <code>page: Page</code> - объект, обслуживающий представление "Страница"
- свойство <code>basket: Basket</code> - объект, обслуживающий представление "Корзина"
- свойство <code>order: Order</code> - объект, обслуживающий представление "Заказ"
- конструктор <code>constructor(components: Partial<IWebLarek>)</code>
- метод <code>initialize(): void</code> - инициализация и запуск приложения
- метод <code>showModal(): void</code> - открыть модальное окно
- метод <code>closeModal(): void</code> -  закрыть модальное окно
- метод <code>showCardDetails(good: IGoodModel, isBasket: boolean): void</code> - показать детальную информацию о товаре
- метод <code>rebuildBasket(): void</code> - перестроить корзину
- метод <code>showBasket():void</code> - показать корзину
- метод <code>showOrder():void</code> - показать заказ
### Слой "Тесты"
### Интерфейсы
### IResult
Описывает результат тестов
#### Интерфейс содержит:
- <code>code: number | null</code> - код результата
- <code>message: string</code> - текст результата
### Классы
### Test
Абстрактный класс, родитель для всех тестов
#### Класс содержит:
- свойство <code>name: string</code> - название теста
- свойство <code>result: IResult</code> - результат теста
- свойство <code>testData: Object</code> - тестовые данные
- конструктор <code>constructor(name: string)</code>
- метод <code>test():void</code> - cобственно тест, реализуется в потомках
- метод <code>getResult(): IResult</code> - возвращает результаты теста
- метод <code>consoleResult()</code> - вывести результат теста в консоль
- метод <code>compareResult(resultData: Object): boolean</code> - сравнить два объекта, тестовый и результат
  // 1. Товар
### GoodTest
Тест модели данных "Товары"
#### Класс содержит:
- свойство <code>testData: IGoodModel[]</code> - тестовые данные
- метод <code>test()</code> - тест на создание, запись и чтение
### OrderTest
Тест модели данных "Заказ"
#### Класс содержит:
- свойство <code>testData: IOrderModel</code> - тестовые данные
- метод <code>test()</code> - тест на создание, запись и чтение
### BasketTest
Тест модели данных "Корзина"
#### Класс содержит:
- свойство <code>testData: IBasketModel</code> - тестовые данные
- метод <code>test()</code> - тест на создание, запись и чтение
### GoodViewTest
Тест отображения "Tовар".
#### Класс содержит:
- свойство <code>testData: IGoodModel[]</code> - тестовые данные
- метод <code>test()</code> - тест на создание
### PageViewTest
Тест отображения "Страница".
#### Класс содержит:
- свойство <code>testData: IGoodModel[]</code> - тестовые данные
- метод <code>test()</code> - тест на создание и вывод на страницу
#### StorageBasketTest
Тест сохранения и загрузки корзины в локальное хранилище
#### Класс содержит:
- свойство <code>testData: IBasketModel</code> - тестовые данные
- метод <code>test()</code> - тест на сохранения и загрузки корзины в локальное хранилище
#### StorageOrderTest
Тест сохранения и загрузки параметров заказа в локальное хранилище
#### Класс содержит:
- свойство <code>testData: Partial<IOrderModel></code> - тестовые данные
- метод <code>test()</code> - тест на сохранения и загрузки параметров заказа в локальное хранилище
#### APITest
Тест загрузки товаров из API
#### Класс содержит:
- метод <code>test()</code> - загрузки товаров из API
