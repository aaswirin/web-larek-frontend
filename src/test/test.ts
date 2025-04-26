/**
 * Модуль для запуска всех тестов
 */
import { BayerTest } from "./bayer/test";
import { GoodTest } from "./good/test";
import { OrderTest } from "./order/test";
import {BasketTest} from "./basket/test";

/**
 * Запуск всех тестов
 *
 * @function startTests
 *   @return {boolean} результаты тестов
 */
export function startTests(): boolean {
  console.log('Старт тестов');

  // 1. Покупатель
  console.log('Тест модели "Покупатель"');
  const test1: BayerTest = new BayerTest('Модель "Покупатель"');
  test1.test();
  test1.consoleResult();

  // 2. Товар
  console.log('Тест модели "Товар"');
  const test2: GoodTest = new GoodTest('Модель "Товар"');
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

  console.log('Окончание тестов');

  return true;
}

