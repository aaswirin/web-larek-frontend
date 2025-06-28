/**
 * Класс API
 */

import { Api } from "../base/api";
import { ILarekAPI, TAnswerOrderApi, TListGoodsApi, TOrderApi } from "../../types/api";

export class LarekAPI extends Api implements ILarekAPI {

  getGoods(): Promise<TListGoodsApi> {
    return this.get('/product') as Promise<TListGoodsApi>;
  }

  sendOrder(order: TOrderApi): Promise<TAnswerOrderApi> {
    return this.post('/order', order) as Promise<TAnswerOrderApi>;
  }

}
