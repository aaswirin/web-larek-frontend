/**
 * Основной модуль приложения
 * @module
 */

import './scss/styles.scss';
import { LarekAPI } from "./components/api/larekAPI";
import { API_URL, settings } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { Page } from "./components/view/page";
import { GoodsModel } from "./components/model/goodsModel";
import { LarekStorage } from "./components/storage/storage";
import { BasketModel } from "./components/model/basketModel";
import { IWebLarek, WebLarek } from "./components/view/webLarek";
import { OrderModel } from "./components/model/orderModel";
import { ensureElement } from "./utils/utils";
import { IOrderModel } from "./types/order";

// Тесты
import {startTests} from "./test/test";
startTests();
throw '';


const events = new EventEmitter();
const storage = new LarekStorage();
const components: Partial<IWebLarek> = {
  events:  events,                                                     // Брокер событий;
  api: new LarekAPI(API_URL),                                                      // Api
  storage: new LarekStorage (),                                                    // Хранилище
  // Модели данных
  goodsModel: new GoodsModel(events, null),                                   // Список товаров
  basketModel: new BasketModel(events, storage.loadBasket()),                      // Корзина
  orderModel: new OrderModel(events, storage.loadOrder() as Partial<IOrderModel>), // Заказ
  // Oтображения
  // Страница
  page: new Page(ensureElement(settings.elements.page.pageContent) as HTMLElement, events),
};

const webLarek = new WebLarek(components);
// Старт приложения
webLarek.initialize();
