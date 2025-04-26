/**
 * Тесты для покупателя
 */

import { Test } from "../abstract/test";
import { IBayerModel } from "../../types/bayer";
import { Bayer } from "../../components/bayerModel";

export class BayerTest extends Test {
  protected testData: IBayerModel = {
    email: 'boss@grandfather.ru',
    phone: '+71234567890',
    address: 'На деревню дедушке',
  };

   test() {
     try {
       // 1. Создание и последующее чтение
       const objBayer = new Bayer(this.testData);
       let data: IBayerModel = objBayer.getBayer();

       if (!this.compareResult(data)) {
         this.result = {
           code: 2,
           message: 'После создания объекта и чтении объекта данные не совпали',
         }

         return;
       }

       // 2. Запись и последующее чтение
       objBayer.setBayer(this.testData);
       data = objBayer.getBayer();

       if (!this.compareResult(data)) {
         this.result = {
           code: 3,
           message: 'При записи и чтении объекта данные не совпали',
         }

         return;
       }

       // Всё отлично!
       this.result = {
         code: -1,
         message: '',
       }
     } catch (e) {
        this.result = {
          code: -1,
          message: e.message,
        }
     }
   }
}
