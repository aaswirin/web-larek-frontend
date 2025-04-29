/**
 * Тесты для API
 */

import { Test } from "../abstract/test";
import { LarekAPI } from "../../components/api/larekAPI";
import { API_URL } from "../../utils/constants";

export class APITest extends Test {

  async test() {
    try {
      const api = new LarekAPI(API_URL);
      // 1. Загрузка из API Товаров
      await api.getGoods()
        .then(data => {
          // Всё отлично!
          this.result = {
            code: -1,
            message: '',
          }
          console.log(data)
          this.consoleResult();
        })
        .catch(err => {
          // Ошибка
          this.result = {
            code: 0,
            message: err.message,
          }
          this.consoleResult();
        })
    } catch (e) {
      this.result = {
        code: 0,
        message: e.message,
      }
      this.consoleResult();
    }
  }
}
