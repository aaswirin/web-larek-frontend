/**
 * Абстрактный класс для тестов
 */

/**
 * Интерфейс для результатов теста
 *
 * @view IResult
 *  @property {number | null} code Код ошибки
 *  @property {string} message Сообщение ошибки
 */
export interface IResult {
  code: number | null;
  message: string;
}
/**
 * Класс для тестов
 *
 * @class Test
 *   @property {string} name Имя теста
 *   @property {IResult} result Результат теста
 *   @property {Object} testData Тестовые данные
 */
export abstract class Test {
  protected name: string;
  protected result: IResult;
  protected testData: Object;

  /**
   * @constructor
   *   @param {string} name Имя теста
   */
  constructor(name: string) {
    this.name = name;
    this.result = {
      code: null,
      message: "",
    };
    console.log(`Тест ${this.name} -> Старт`);
  }

  /**
   * Собственно тест на откуп потомкам
   *
   * @method test
   */
  abstract test():void;

  /**
   * Получить результаты теста
   *
   * @method getResult
   */
  getResult(): IResult {
    return this.result;
  }

  /**
   * Получить сообщение о результатах теста текстом
   *
   * @method resultToText
   *  @return {string} Результат теста строкой
   */
  resultToText(): string {
    let message = `Тест ${this.name} -> `;
    switch (this.result.code) {
      case null:
        message = message + 'Тест не исполнялся';
        break;
      case -1:
        message = message + 'Пройден успешно';
        break;
      default:
        message = message + `Завершился с ошибкой №${this.result.code}: ${this.result.message}`;
    }
    return message;
  }

  /**
   * Вывести результат теста в консоль
   *
   * @method consoleResult
   */
  consoleResult() {
    console.log(this.resultToText());
  }

  /**
   * Сравнить два объекта, тестовый и результат
   *
   * @method compareResult
   *  @param {Object} resultData Объект для сравнения
   *  @return {boolean} Результат сравнения: true - совпадают, false - увы, не совпадают...
   */
  protected compareResult(resultData: Object): boolean {
    return JSON.stringify(this.testData) === JSON.stringify(resultData);
  }
}
