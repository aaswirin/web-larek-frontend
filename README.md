# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/api/ — папка с классом для API
- src/components/model/ — папка с классами для модели данных
- src/components/storage/ — папка с классом для локального хранилища
- src/components/view/ — папка с классами слоя отображения
- src/test/ — папка с тестами
- src/types/ — папка с типами и интерфейсами\

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/model.ts — файл с типами
- src/model.ts — точка входа приложения
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
- слой данных - преобразование и хранение данных приложения,\
при изменении данных, слой сообщает через презентер слою отображения об изменении;
- слой отображение - размещение и отображение данных на странице,\
при действиях пользователя через презентер сообщает слою данных об необходимости изменения данных;
- презентер - связь отображения и данных, посредник между слоем данных и слоем отображения.\

Также в приложении есть дополнительные подсистемы:
- подсистема тестов для проверки приложения после изменения типов, интерфейсов или классов;
- подсистема локального хранилища для хранения корзины и параметров заказа между сеансами работы пользователя.
### Базовые классы
### Api
Класс реализует базовые методы запросов к серверу.
#### Класс содержит:
- метод`get(uri: string)` - отправка запроса "GET"
- метод`post(uri: string, data: object, method: ApiPostMethods = 'POST')` - отправка данных методом "POST"
### EventEmitter
Класс реализует отправку и получение событий в приложении
#### Класс содержит:
- метод`on<T extends object>(eventName: EventName, callback: (event: T) => void)` - устанавливает обработчик на событие
- метод`emit<T extends object>(eventName: string, data?: T)` - инициировать событие с данными
## Описание данных
### Описание сообщений между слоями приложения
- `goods:all:change` - событие "Изменён список товаров"
- `card:showDetail` - событие "Показать товар детально"
- `basket:change` - событие "Добавить/Удалить" товар в корзине
- `page:showBasket` - событие "Показать корзину"
- `order:make` - событие "Сделать заказ"
- `order:change` - событие "Изменился заказ"
### Слой "Модель данных":
### Типы:
### TCategoryType
Описывает тип категории товара
```
type TCategoryType = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
```
### TIdGoodType
Описывает тип ID товара, сейчас `string`, но может измениться при смене API
```
type TIdGoodType = string;
```
### TPaymentType
Описывает тип оплаты заказа.
- `offline` - оплата при получении, в терминах приложения 'При получении'.
- `online` - оплата на сайте, в терминах приложения 'Онлайн'.
```
type TPaymentType = 'offline' | 'online';
```
### Интерфейсы
### IGoodModel
Описывает интерфейс товара
#### Интерфейс содержит:
- `id: TIdGoodType` - id товара
- `description: string` - описание
- `image: string` - URL картинки
- `title: string` - наименование
- `category: TCategoryType` - категория
- `price: number | null` - цена
- `number?:  number;` - порядковый номер
### IBasketModel
Описывает интерфейс корзины
#### Интерфейс содержит:
- `startDate: Date` - дата и время начала формирования корзины
- `goods: Set<TIdGoodType>` - список id'ов товаров в корзине
### IOrderModel
Описывает интерфейс заказа
#### Интерфейс содержит:
- `payment: TPaymentType` - тип оплаты
- `total: number` - сумма заказа
- `goods: TIdGoodType[]` - список id'ов заказанных товаров
- `email: string` - электронная почта
- `phone: string` - телефон
- `address: string` - адрес доставки
### Классы
### GoodsModel
Класс реализует хранение списка товаров. При изменении товара генерирует сообщения:
- `goods:all:change` - событие "Изменён список товаров"
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `goods: Map<TIdGoodType, IGood>` - список товаров
- конструктор `constructor(protected events: IEvents, data: IGoodModel[] | null)`
- метод `getGoods(): IGoodModel[]` - получить список товаров
- метод `setGoods(data: IGoodModel[]): void` - установить список товаров
- метод `getGood(id: TIdGoodType): IGoodModel` - получить товар по id
### BasketModel
Класс реализует хранение корзины. При изменении состава корзины генерирует сообщения:
- `basket:change` - событие "Добавить/Удалить" товар в корзине
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `startDate: Date` - дата и время начала формирования корзины
- свойство `goods: Set<TIdGoodType>` - список id'ов товаров в корзине
- конструктор `constructor(events: IEvents, data: IBasketModel)`
- метод `start(): void` - установка времени и даты начала формирования корзины
- метод `clear(): void` - очистка корзины
- метод `setGoods(data: TIdGoodType[]): void : void` - загрузить список товаров в корзину
- метод `addGood(data: Partial<IGoodModel>): void` - добавить товар в корзину
- метод `deleteGood(data: Partial<IGoodModel>): void` - удалить товар из корзины
- метод `getCount(): number` - получить количество товаров в корзине
- метод `isBasket(data: Partial<IGoodModel>): boolean` - проверить наличие товара в корзине
- метод `calcTotal(): number` - рассчитать стоимость корзины
### OrderModel
Класс реализует хранение заказа.
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `payment: TPaymentType` - тип оплаты
- свойство `total: number` - сумма заказа
- свойство `goods: TIdGoodType[]` - id заказанных товаров
- свойство `email: string` - электронная почта
- свойство `phone: string` - телефон
- свойство `address: string` - адрес
- конструктор `constructor(protected events: IEvents, data: Partial<IOrderModel>)`
- метод `getOrder(): IOrderModel` - получить заказ
- метод `setOrder(data: Partial<IOrderModel>): void` - записать заказ
- метод `getGoods(): TIdGoodType[]` - получить список товаров из заказа
- метод `setGoods(data: TIdGoodType[]): void` - установить список товаров
### Слой "API"
### Интерфейсы
### IGoodApi
Описывает товары, полученные из API
#### Интерфейс содержит:
- `total: number` - количество товаров
- `items: IGoodModel[]` - список товаров
### IOrderApi
Описывает заказ, отправляемый в API
#### Интерфейс содержит:
- `payment: TPaymentType` - тип оплаты
- `email: string` - электронная почта
- `phone: string` - телефон
- `address: string` - адрес доставки
- `total: number` - сумма заказа
- `items: TIdGoodType[]` - список товаров
### IAnswerOrderApi
Описывает ответ, после отправки заказа в API
#### Интерфейс содержит:
- `id: string` - id заказа
- `total: number` - сумма списано
- `error: string` - текст ошибки, если отправка заказа закончилась неудачей
### Классы
### LarekAPI
Класс наследуется от базового класса Api.\
Реализует методы для получения номенклатуры товаров и отправки заказа.
#### Класс содержит:
- метод `getGoods(): Promise<IGoodApi>` - получить товары с сервера
- метод `sendOrder(order: IOrderApi): Promise<IAnswerOrderApi>` - отправить товары на сервер
### Слой "Отображение"
### Типы:
### TCardGoodStatus
Описывает состояние товара:
- `basket` - товар уже в корзине
- `free` - товара ещё нет в корзине
- `no_price` - у товара нет цены, добавить в корзину нельзя!
```
type TCardGoodStatus = 'basket' | 'free' | 'no_price';
```
### Интерфейсы
### ICardGoodView
Описывает карту товара для отображения
#### Интерфейс содержит:
- `number: number` - номер товара в корзине
- `category: string` - категория товара
- `title: string` - наименование товара
- `image: string` - изображение товара
- `price: number | null` - цена товара
- `id: TIdGoodType` - id товара
- `buttonText: string` - надпись на кнопке
### IBasketView
Описывает корзину для отображения
#### Интерфейс содержит:
- `basketList: HTMLElement[]` - список товаров корзины
- `totalSum: string` - сумма товаров корзины
### IOrderView
Описывает заказ для отображения
#### Интерфейс содержит:
- `payment: TPaymentType` - тип оплаты
- `address: string` - адрес доставки
- `email: string` - электронная почта
- `phone: string` - телефон
- `total: number` - сумма списано
- `goods: TPaymentType[]` - список товаров в заказе
### IPage
Описывает страницу отображения
#### Интерфейс содержит:
- `goodsList: HTMLElement[]` - список элементов карт товара на странице
- `basketCount: number` - количество товаров в корзине
### IWebLarek
Описывает приложение
#### Интерфейс содержит:
- `api: LarekAPI` - объект, обслуживающий API
- `storage: LarekStorage` - объект, обслуживающий локальное хранилище
- `goodsModel: GoodsModel` - объект, обслуживающий модель данных "Товары"
- `basketModel: BasketModel` - объект, обслуживающий модель данных "Корзина"
- `orderModel: OrderModel` - объект, обслуживающий модель данных "Заказ"
- `page: Page` - объект, обслуживающий представление "Страница"
- `basket: Basket` - объект, обслуживающий представление "Корзина"
- `order: Order` - объект, обслуживающий представление "Корзина"
### Классы
### Modal
Базовый класс для показа модальных окон
#### Класс содержит:
- свойство `closeButton: HTMLButtonElement` - элемент кнопки для закрытия окна
- свойство `content: HTMLElement` - содержимое модального окна
### CardGoodView
Класс для отображения карты товара в каталоге, детальном просмотре и корзине
#### Класс содержит:
- свойство `buttonText: string` - надпись на кнопке, если товар в детальном просмотре
- свойство `templateCatalog: HTMLTemplateElement` - заготовка из вёрстки для товара в каталоге
- свойство `templateDetails: HTMLTemplateElement` - заготовка из вёрстки для товара в детальном просмотре
- свойство `templateBasket: HTMLTemplateElement` - заготовка из вёрстки для товара в корзине
- свойство `elementNumber: HTMLElement` - элемент вёрстки для вывода номера
- свойство `elementCategory: HTMLElement` - элемент вёрстки для вывода категории
- свойство `elementTitle: HTMLElement` - элемент вёрстки для вывода заголовка
- свойство `elementImage: HTMLImageElement` - элемент вёрстки для вывода изображения
- свойство `elementPrice: HTMLElement` - элемент вёрстки для вывода цены
- свойство `basketButton: HTMLButtonElement` - кнопка "В корзину", если карта товара в детальном просмотре
- свойство `HTMLButtonElement: HTMLButtonElement` - кнопка "Удалить", если карта товара в корзине
- конструктор `constructor(container: HTMLTemplateElement, protected events: EventEmitter,protected owner: TCardGoodOwner, protected status?: TCardGoodStatus)`
### BasketView
Класс для отображения корзины
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `template: HTMLTemplateElement` - заготовка из вёрстки окна корзины
- свойство `galleryCards: HTMLElement` - элемент вёрстки списка корзины
- свойство `basketSum: HTMLElement` - элемент вёрстки суммы корзины
- свойство `basketList: HTMLElement` - список товаров корзины
- свойство `totalSum: HTMLElement` - сумма товаров корзины
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### OrderViewOrder
Класс для отображения параметров заказа. Первая страница оформления заказа
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `templatePageOrder:HTMLTemplateElement` - заготовка из вёрстки первой страницы заказа
- свойство `buttonCard: HTMLButtonElement` - элемент вёрстки кнопка "Онлайн"
- свойство `buttonCash: HTMLButtonElement` - элемент вёрстки кнопка "При получении"
- свойство `inputAddress: HTMLInputElement` - элемент вёрстки поле ввода "Адрес"
- свойство `buttonOrder: HTMLButtonElement` - элемент вёрстки кнопка "Далее"
- метод `validate(value: string): boolean` - валидация данных формы
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### OrderViewContacts
Класс для отображения параметров доставки. Вторая страница отображения заказа
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `templatePageContacts` - заготовка из вёрстки второй страницы заказа
- свойство `inputEMail: HTMLInputElement` - элемент вёрстки поле ввода "Почта"
- свойство `inputPhone: HTMLInputElement` - элемент вёрстки поле ввода "Телефон"
- свойство `buttonContacts: HTMLButtonElement` - элемент вёрстки кнопка "Оплатить"
- свойство `templatePageSuccess` - заготовка из вёрстки третьей страницы заказа
- свойство `buttonSuccess: HTMLButtonElement` - элемент вёрстки кнопка "За новыми покупками!"
- метод `validate(value: string): boolean` - валидация данных формы
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### OrderViewResult
Класс для отображения успешного оформления заказа или невозможности отправки (например, сетевая ошибка или что то ещё...)
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `content: HTMLElement` - контент для вывода в страницу заказа
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### Page
Класс для отображения страницы приложения
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `galleryCards: HTMLElement` - элемент вёрстки для размещения карт
- свойство `elementBasketCount: HTMLElement` - элемент вёрстки количество в корзине
- свойство `constructor(container: HTMLElement,  protected events: EventEmitter)`
### WebLarek
Класс для управления приложением Web-larёk
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `windowModal: HTMLElement` - элемент вёрстки модального окна
- свойство `contentModal: HTMLElement` - содержимое модального
- свойство `displayedModal: boolean` - признак показа модального окна
- свойство `api: LarekAPI` - объект, обслуживающий API
- свойство `storage: LarekStorage` - объект, обслуживающий локальное хранилище
- свойство `goodsModel: GoodsModel` - объект, обслуживающий модель данных "Товары"
- свойство `basketModel: BasketModel` - объект, обслуживающий модель данных "Корзина"
- свойство `orderModel: OrderModel` - объект, обслуживающий модель данных "Заказ"
- свойство `page: Page` - объект, обслуживающий представление "Страница"
- свойство `basket: Basket` - объект, обслуживающий представление "Корзина"
- свойство `order: Order` - объект, обслуживающий представление "Заказ"
- конструктор `constructor(components: Partial<IWebLarek>)`
- метод `initialize(): void` - инициализация и запуск приложения
- метод `showModal(): void` - открыть модальное окно
- метод `closeModal(): void` - закрыть модальное окно
- метод `showCardDetails(good: IGoodModel, isBasket: boolean): void` - показать детальную информацию о товаре
- метод `rebuildBasket(): void` - перестроить корзину
- метод `showBasket():void` - показать корзину
- метод `showOrder():void` - показать заказ
### Подсистема "Хранилище"
### Классы
### LarekStorage
Класс реализует сохранение и восстановление данных приложения в локальное хранилище между сеансами пользователя.\
В локальное хранилище сохраняются состав корзины и параметры заказа (без списка товаров заказа).
#### Класс содержит:
- свойство `keyBasket: string` - ключ данных для хранения корзины
- свойство `keyOrder: string` - ключ данных для хранения параметров заказа
- метод `loadBasket(): IBasketModel | null` - читает из локального хранилища состав корзины
- метод `saveBasket(basket: object)` - пишет в локальное хранилище состав корзины
- метод `loadOrder(): Partial<IOrderModel> | null` - читает из локального хранилища данные заказа
- метод `saveOrder(order: object)` - пишет в локальное хранилище состав данные заказа
### Подсистема "Тесты"
### Интерфейсы
### IResult
Описывает результат тестов
#### Интерфейс содержит:
- `code: number | null` - код результата
- `message: string` - текст результата
### Классы
### Test
Абстрактный класс, родитель для всех тестов
#### Класс содержит:
- свойство `name: string` - название теста
- свойство `result: IResult` - результат теста
- свойство `testData: Object` - тестовые данные
- конструктор `constructor(name: string)`
- метод `test():void` - собственно тест, реализуется в потомках
- метод `getResult(): IResult` - возвращает результаты теста
- метод `consoleResult()` - вывести результат теста в консоль
- метод `compareResult(resultData: Object): boolean` - сравнить два объекта, тестовый и результат
### GoodTest
Тест модели данных "Товары"
#### Класс содержит:
- свойство `testData: IGoodModel[]` - тестовые данные
- метод `test()` - тест на создание, запись и чтение
### OrderTest
Тест модели данных "Заказ"
#### Класс содержит:
- свойство `testData: IOrderModel` - тестовые данные
- метод `test()` - тест на создание, запись и чтение
### BasketTest
Тест модели данных "Корзина"
#### Класс содержит:
- свойство `testData: IBasketModel` - тестовые данные
- метод `test()` - тест на создание, запись и чтение
### GoodViewTest
Тест отображения "Товар".
#### Класс содержит:
- свойство `testData: IGoodModel[]` - тестовые данные
- метод `test()` - тест на создание
### PageViewTest
Тест отображения "Страница".
#### Класс содержит:
- свойство `testData: IGoodModel[]` - тестовые данные
- метод `test()` - тест на создание и вывод на страницу
#### StorageBasketTest
Тест сохранения и загрузки корзины в локальное хранилище
#### Класс содержит:
- свойство `testData: IBasketModel` - тестовые данные
- метод `test()` - тест на сохранения и загрузки корзины в локальное хранилище
#### StorageOrderTest
Тест сохранения и загрузки параметров заказа в локальное хранилище
#### Класс содержит:
- свойство `testData: Partial<IOrderModel>` - тестовые данные
- метод `test()` - тест на сохранения и загрузки параметров заказа в локальное хранилище
#### APITest
Тест загрузки товаров из API
#### Класс содержит:
- метод `test()` - загрузки товаров из API
