import { Api } from "../base/api";
import {IAnswerOrderApi, IGoodApi, IOrderApi} from "../../types/api";

export class LarekAPI extends Api {

  getGoods(): Promise<IGoodApi> {
    return this.get('/product') as Promise<IGoodApi>;
  }

  sendOrder(order: IOrderApi): Promise<IAnswerOrderApi> {
    return this.post('/order', order) as Promise<IAnswerOrderApi>;
  }


}
