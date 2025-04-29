/**
 * Модуль для запуска всех тестов
 */
import { BayerTest } from "./bayer/test";
import { GoodTest } from "./goods/test";
import { OrderTest } from "./order/test";
import { BasketTest } from "./basket/test";
import { APITest } from "./api/test";

/**
 * Запуск всех тестов
 *
 * @function startTests
 */
export function startTests() {
  console.log('Старт тестов');

  // 1. Покупатель
  console.log('Тест модели "Покупатель"');
  const test1: BayerTest = new BayerTest('Модель "Покупатель"');
  test1.test();
  test1.consoleResult();

  // 2. Товар
  console.log('Тест модели "Товары"');
  const test2: GoodTest = new GoodTest('Модель "Товары"');
  test2.test();
  test2.consoleResult();

  // 3. Заказ
  console.log('Тест модели "Заказ"');
  const test3: OrderTest = new OrderTest('Модель "Заказ"')
  test3.test();
  test3.consoleResult();

  // 4. Корзина
  console.log('Тест модели "Корзина"');
  const test4: BasketTest = new BasketTest('Модель "Корзина"')
  test4.test();
  test4.consoleResult();

  // 5. API
  console.log('Тест "API"');
  const test5: APITest = new APITest('API')
  test5.test();
  //test5.consoleResult();

  //console.log('Окончание тестов');

  return true;
}

