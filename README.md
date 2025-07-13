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
- src/function - папка с утилитами приложения

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/model.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с общими утилитами
- src/function/function/ts - файл с утилитами приложения

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
## Опубликован
https://aaswirin.github.io/web-larek-frontend/
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

### Настройки приложения
См. файл src/utils/constants.ts, константа `settings`
#### Настройка соответствия полей модели данных и API<a id="settings_api"></a>
Если в API изменяться наименования полей, править только здесь
- `settings.api.goods` - соответствие полей модели данных карты и API
- `settings.api.order` - соответствие полей модели данных заказа и API
#### Настройка сообщений [презентера](#presenter)
- `settings.events.card` - сообщения карты товаров
- `settings.events.basket` - сообщения корзины
- `settings.events.order` - сообщения заказа
- `settings.events.page` - сообщения страницы приложения

Описание списка сообщений см. ["Описание сообщений между слоями приложения"](#message_list)

#### Настройка списка клавиш, по которым закрыть модальное окно
Массив клавиш для закрытия окна
```ts
settings.keysClose: [
  'Escape',
  //'F10',
]
```
#### Настройка активности локального хранилища
- `settings.storage.active` - Сохранение и восстановления корзины и параметров заказа в локальное хранилище

#### Настройки элементов вёрстки
- `settings.elements.page` - элементы вёрстки для [страницы](#view_page)
- `settings.elements.modal` - элементы вёрстки для [модального окна](#view_modal)
- `settings.elements.card` - элементы вёрстки для [карты товара](#view_card)
- `settings.elements.basket` - элементы вёрстки для [корзины](#view_basket)
- `settings.elements.order` - элементы вёрстки для [заказа](#view_order)

#### Настройки для чисел прописью
- `settings.case` - описание склонений значений

### Базовые классы
### Api<a id="api"></a>
Класс реализует базовые методы запросов к серверу.\
См. `src/components/api/larekAPI.ts`
#### Класс содержит:
- метод`get(uri: string)` - отправка запроса "GET"
- метод`post(uri: string, data: object, method: ApiPostMethods = 'POST')` - отправка данных методом "POST"
### EventEmitter<a id="presenter"></a>
Класс реализует отправку и получение событий в приложении.\
См. `src/components/base/events.ts`
#### Класс содержит:
- метод`on<T extends object>(eventName: EventName, callback: (event: T) => void)` - устанавливает обработчик на событие
- метод`emit<T extends object>(eventName: string, data?: T)` - инициировать событие с данными
## Описание данных
### Описание сообщений между слоями приложения<a id="message_list"></a>
- `goods:allChange` - событие "Изменён список товаров"
- `card:showDetail` - событие "Показать товар детально"
- `card:editBasket` - событие "Изменить корзину из детального просмотра"
- `basket:change` - событие "Добавить/Удалить" товар в корзине
- `basket:delete` - событие "Удалён товар из корзины"
- `page:showBasket` - событие "Показать корзину"
- `order:make` - событие "Сделать заказ"
- `order:changeValueOrder` - событие "Изменение данных на первой странице заказа"
- `order:changePay` - событие "Перейти на вторую страницу заказа"
- `order:changeValueContacts` - событие "Изменение данных на первой странице заказа"
- `order:changeContacts` - событие "Отправить заказ"

### Слой "Модель данных":
### Типы:
### TCategoryType
Описывает тип категории товара.\
См. `src/types/index.ts`
```ts
type TCategoryType = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
```
### TIdGoodType
Описывает тип ID товара, сейчас `string`, но может измениться при смене API.\
См. `src/types/index.ts`
```ts
type TIdGoodType = string;
```
### TPaymentType
Описывает тип оплаты заказа.\
См. `src/types/order/model.ts`
- `offline` - оплата при получении, в терминах приложения 'При получении'.
- `online` - оплата на сайте, в терминах приложения 'Онлайн'.
```ts
type TPaymentType = 'offline' | 'online';
```
### TGood
Описывает тип данных "Товар".\
См. `src/types/good/model.ts`
- `id: TIdGoodType` - id
- `description: string;` - описание
- `image: string;` - URL картинки
- `title: string;` - наименование
- `category: TCategoryType;` - категория
- `price: number | null;` - цена, может быть null
- `number?:  number;` - порядковый номер в корзине
### TListGoods
См. `src/types/good/model.ts`
Описывает список товаров в модели ["Товары"](#model_goods)
```ts
TListGoods = Map<TIdGoodType, TGood>;
```
### Интерфейсы
### IGoodsModel<a id="interface_goods"></a>
Описывает интерфейс модели ["Товары"](#model_goods)\
См. `src/types/good/model.ts`
#### Интерфейс содержит:
- `goods: TListGoods;` - список товаров
- `getGood(id: TIdGoodType): TGood;` - получить товар из списка
- `setGood(good: TGood): void;` - записать товар в список
### IBasketModel<a id="interface_basket"></a>
Описывает интерфейс модели ["Корзина"](#model_basket).\
См. `src/types/basket/model.ts`
#### Интерфейс содержит:
- `editDate: Date;` - дата и время последнего редактирования корзины
- `goods: Map<TIdGoodType>;` - список товаров в корзине
- `addGood(id: TIdGoodType): void;` - добавить товар в корзину
- `deleteGood(id: TIdGoodType): void;` - удалить товар из корзины
- `getCount(): number;` - количество товаров в корзине
- `isBasket(id: TIdGoodType): boolean;` - проверить наличие товара в корзине
- `calcTotal(Goods: IGoodsModel): number;` - посчитать сумму товаров в корзине
### IOrderModel<a id="interface_order"></a>
Описывает интерфейс модели ["Заказ"](#model_order).\
См. `src/types/order/model.ts`
#### Интерфейс содержит:
- `payment: TPaymentType;` - тип оплаты
- `email: string;` - почта
- `phone: string;` - телефон
- `address: string;` - адрес
- `validation(data: Partial<IOrderModel>):string;` - Проверка введённых данных
### Классы
### GoodsModel<a id="model_goods"></a>
Реализует интерфейс [IGoodsModel](#interface_goods)\
См. `src/components/model/goodsModel.ts`\
Класс обеспечивает хранение списка товаров. При изменении списка товаров генерирует сообщения:
- `goods:allChange` - событие "Изменён список товаров"
#### Класс содержит:
- свойство `events: IEvents` - брокер событий
- свойство `goods: Map<TIdGoodType, IGood>` - список товаров
- конструктор `constructor(protected events: IEvents)`
- метод `getGoods(): IGoodModel[]` - получить список товаров
- метод `setGoods(data: IGoodModel[]): void` - установить список товаров
- метод `getGood(id: TIdGoodType): IGoodModel` - получить товар по id
### BasketModel<a id="model_basket"></a>
Реализует интерфейс [IBasketModel](#interface_basket)\
См. `src/components/model/basketModel.ts`\
Класс обеспечивает хранение корзины. При изменении состава корзины генерирует сообщения:
- `basket:change` - событие "Добавить/Удалить" товар в корзине
#### Класс содержит:
- свойство `editDate: Date;` - дата и время последнего редактирования корзины
- свойство `goods: Set<TIdGoodType>;` - список товаров в корзине
- конструктор `constructor(events: IEvents)`
- метод `addGood(id: TIdGoodType): void;` - добавить товар в корзину
- метод `deleteGood(id: TIdGoodType): void;` - удалить товар из корзины
- метод `getCount(): number;` - количество товаров в корзине
- метод `isBasket(id: TIdGoodType): boolean;` - проверить наличие товара в корзине
- метод `calcTotal(Goods: IGoodsModel): number;` - посчитать сумму товаров в корзине
### OrderModel<a id="model_order"></a>
Реализует интерфейс [IOrderModel](#interface_order)\
См. `src/components/model/orderModel.ts`\
Класс обеспечивает хранение параметров заказа.
#### Класс содержит:
- свойство `payment: TPaymentType;` - тип оплаты, по умолчанию см. настройку `settings.elements.order.defaultPay`
- свойство `address: string;` - адрес
- свойство `email: string;` - почта
- свойство `phone: string;` - телефон
- конструктор `constructor(protected events: IEvents)`
- метод `validation(data: Partial<IOrderModel>):string;` - Проверка введённых данных
### Слой "API"
### Типы:
### TGoodApi
Тип товара из API.\
См. `src/types/api/index.ts`
- `id: TIdGoodType` - id товара
- `description: string` - описание
- `image: string` - изображение
- `title: string` - название
- `category: string` - категория
- `price: number | null` - цена
### TListGoodsApi
Тип для списка товаров из API.\
См. `src/types/api/index.ts`
- `total: number` - количество товаров
- `items: TGoodApi[]` - список товаров
### TOrderApi
Тип для отправки заказа в API.\
См. `src/types/api/index.ts`
- `payment: string` - тип оплаты
- `email: string` - электронная почта
- `phone: string` - телефон
- `address: string` - адрес доставки
- `total: number` - сумма заказа
- `items: TIdGoodType[]` - список товаров
### TAnswerOrderApi
Тип для ответа после отправки заказа в API.\
См. `src/types/api/index.ts`
- `id?: string` - Id заказа
- `total?: number` - Сумма списано
- `error?: string` - Текст ошибки
### Интерфейсы
### ILarekAPI
Интерфейс для класса взаимодействия с API.\
См. `src/types/api/index.ts`
- `getGoods(): Promise<TListGoodsApi>;` - получить товары с сервера
- `sendOrder(order: TOrderApi): Promise<TAnswerOrderApi>;` - отправить заказ на сервер
### Классы
### LarekAPI
Класс наследуется от базового класса [Api](#api).\
Соответствия полей модели данных и API описаны в [настройке соответствия полей](#settings_api).
Реализует методы для получения номенклатуры товаров и отправки заказа.
#### Класс содержит:
- метод `getGoods(): Promise<IGoodApi>` - получить товары с сервера
- метод `sendOrder(order: IOrderApi): Promise<IAnswerOrderApi>` - отправить заказ на сервер
### Слой "Отображение"
### Интерфейсы
### IGoodView
Описывает карту товара для отображения.\
См. `src/types/good/view.ts`
#### Интерфейс содержит:
- `category: string` - категория товара
- `title: string` - наименование товара
- `image: string` - изображение товара
- `price: number | null` - цена товара
- `id: TIdGoodType` - id товара
- `buttonText: string` - надпись на кнопке
- `buttonDisabled: boolean;` - видимость кнопки
### IBasketView
Описывает корзину для отображения.\
См. `src/types/basket/view.ts`
#### Интерфейс содержит:
- `basketList: HTMLElement[]` - список товаров корзины
- `basketEmpty: string;` - состояние "Корзина пуста"
- `totalSum: string` - сумма товаров корзины
### IOrderView
Описывает заказ для отображения.\
См. `src/types/order/view.ts`
#### Интерфейс содержит:
- `payment: TPaymentType` - тип оплаты
- `address: string` - адрес доставки
- `email: string` - электронная почта
- `phone: string` - телефон
- `total: number` - сумма списано
- `goods: TPaymentType[]` - список товаров в заказе
- `errorValidation: string` - проверка введённых данных
### IPage
Описывает страницу отображения.\
См. `src/components/view/page.ts`
#### Интерфейс содержит:
- `goodsList: HTMLElement[]` - список элементов карт товара на странице
- `basketCount: number` - количество товаров в корзине
- `displayedModal: boolean;` - признак активности модального окна
- `showModal(): void;` - показать модальное окно
- `closeModal(): void;` - закрыть модальное окно
- `closeWindowKey(event: KeyboardEvent):void;` - закрытие окна по клавише
### Классы
### CardGood<a id="view_card"></a>
Класс для отображения карты товара в каталоге, детальном просмотре и корзине.\
См.`src/components/view/cardGood.ts`
#### Класс содержит:
- свойство `number: number;` - номер товара в корзине
- свойство `category: TCategoryType;` - категория товара
- свойство `title: string;` - наименование товара
- свойство `image: string;` - изображение товара
- свойство `price: number | null;` - цена товара
- свойство `id: TIdGoodType;` - Id товара
- свойство `buttonText: string;` - надпись на кнопке
- свойство `buttonDisabled: boolean;` - активность кнопки
- конструктор `constructor(container: HTMLTemplateElement, protected events: EventEmitter)`
### BasketView<a id="view_basket"></a>
Класс для отображения корзины.\
См. `src/components/view/basket.ts`
#### Класс содержит:
- свойство `basketEmpty: string` - состояние пустой корзины
- свойство `basketList: HTMLElement[]` - список товаров корзины
- свойство `totalSum: string` - сумма товаров корзины
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`

### OrderViewPay<a id="view_order"></a>
Класс для отображения первой страницы оформления заказа.\
См. `src/components/view/order_pay.ts`
#### Класс содержит:
- свойство `payment: TPaymentType` - тип оплаты
- свойство `address: string` - адрес доставки
- свойство `errorValidation` - ошибка проверки введённых данных
- метод `changeData(): void` - Изменение данных на форме
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### OrderViewContacts
Класс для отображения второй страницы отображения заказа.\
См. `src/components/view/order_contacts.ts`
#### Класс содержит:
- свойство `email: string` - почта
- свойство `phone: string` - телефон
- свойство `errorValidation` - ошибка проверки введённых данных
- метод `changeData(): void` - Изменение данных на форме
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### Page<a id="view_page"></a>
Класс для отображения страницы приложения.\
См. `src/components/view/page.ts`
#### Класс содержит:
- свойство `goodsList: HTMLElement[]` - список элементов карт товара на странице
- свойство `basketCount: number` - количество товаров в корзине
- свойство `displayedModal: boolean;` - признак активности модального окна
- метод `showModal(): void;` - показать модальное окно
- метод `closeModal(): void;` - закрыть модальное окно
- метод `closeWindowKey(event: KeyboardEvent):void;` - закрытие окна по клавише
- конструктор `constructor(container: HTMLElement, protected events: EventEmitter)`
### Подсистема "Хранилище"
### Классы
### LarekStorage
Класс реализует сохранение и восстановление данных приложения в локальное хранилище между сеансами пользователя.\
В локальное хранилище сохраняются состав корзины и параметры заказа (без списка товаров заказа).
См. `src/components/storage/storage.ts`
#### Класс содержит:
- свойство `keyBasket: string` - ключ данных для хранения корзины
- свойство `keyOrder: string` - ключ данных для хранения параметров заказа
- метод `loadBasket(): IBasketModel | null` - читает из локального хранилища состав корзины
- метод `saveBasket(basket: object)` - пишет в локальное хранилище состав корзины
- метод `clearBasket(): void` - очистить данные корзины в локальном хранилище
- метод `loadOrder(): Partial<IOrderModel> | null` - читает из локального хранилища данные заказа
- метод `saveOrder(order: object)` - пишет в локальное хранилище состав данные заказа
- метод `clearOrder(): void` - очистить данные заказа в локальном хранилище
### Подсистема "Тесты"
Тесты полезно использовать после изменения основных структур данных или API.\
Результаты тестов выводятся в консоль.\
Для использования тестов необходимо в файле src/index.ts раскомментировать блок кода после блока импорта:
```ts
// Тесты
import {startTests} from "./test/test";
startTests();
throw '';
```
### Типы
### TResult
Описывает результат тестов.\
См. `src/test/abstract/test.ts`
#### Тип содержит:
- `code: number | null` - код результата
- `message: string` - текст результата
### Классы
### Test
Абстрактный класс, родитель для всех тестов
См. `src/test/abstract/test.ts`
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
Тест модели данных "Товары".\
См. `src/test/goods/test.ts`
#### Класс содержит:
- свойство `testData: IGoodModel[]` - тестовые данные
- метод `test()` - тест на создание, запись и чтение
### OrderTest
Тест модели данных "Заказ".\
См. `src/test/order/test.ts`
#### Класс содержит:
- свойство `testData: IOrderModel` - тестовые данные
- метод `test()` - тест на создание, запись и чтение
### BasketTest
Тест модели данных "Корзина".\
См. `src/test/basket/test.ts`
#### Класс содержит:
- свойство `testData: IBasketModel` - тестовые данные
- метод `test()` - тест на создание, запись и чтение
### GoodViewTest
Тест отображения "Товар".\
См. `src/test/goodsview/test.ts`
#### Класс содержит:
- свойство `testData: IGoodModel[]` - тестовые данные
- метод `test()` - тест на создание
### PageViewTest
Тест отображения "Страница".\
См. `src/test/goodsview/test.ts`
#### Класс содержит:
- свойство `testData: IGoodModel[]` - тестовые данные
- метод `test()` - тест на создание и вывод на страницу
### StorageBasketTest
Тест сохранения и загрузки корзины в локальное хранилище.\
См. `src/test/storage/testBasket.ts`
#### Класс содержит:
- свойство `testData: IBasketModel` - тестовые данные
- метод `test()` - тест на сохранения и загрузки корзины в локальное хранилище
### StorageOrderTest
Тест сохранения и загрузки параметров заказа в локальное хранилище.\
См. `src/test/storage/testOrder.ts`
#### Класс содержит:
- свойство `testData: Partial<IOrderModel>` - тестовые данные
- метод `test()` - тест на сохранения и загрузки параметров заказа в локальное хранилище
### APITest
Тест загрузки товаров из API.\
См. `src/test/storage/testOrder.ts`
#### Класс содержит:
- метод `test()` - тест загрузки товаров из API
