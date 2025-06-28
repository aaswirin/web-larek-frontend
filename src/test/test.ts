/**
 * Модуль для запуска всех тестов
 */
import { GoodTest } from "./goods/test";
import { OrderTest } from "./order/test";
import { BasketTest } from "./basket/test";
import { APITest } from "./api/test";
import { GoodViewTest } from "./goodsview/test";
import { PageViewTest } from "./pageview/test";
import { StorageBasketTest } from "./storage/testBasket";
import { StorageOrderTest } from "./storage/testOrder";

/**
 * Запуск всех тестов
 *
 * @function startTests
 */
export function startTests() {
  console.log('Старт тестов');

  // 1. Товар
  new GoodTest('Модель "Товары"').test();

  // 2. Корзина
  new BasketTest('Модель "Корзина"').test();

  // 3. Заказ
  new OrderTest('Модель "Заказ"').test();

  // 4. Хранилище Корзина
  new StorageBasketTest('Хранилище "Корзина"').test();

  // 5. Хранилище Заказ
  new StorageOrderTest('Хранилище "Заказ"').test();

  // 6. Отображение Товар
  new GoodViewTest('Отображение "Товар"').test();

  // 7. Отображение "Страница"
  new PageViewTest('Отображение "Страница"').test();

  // 100. API
  new APITest('API').test();

  return true;
}

