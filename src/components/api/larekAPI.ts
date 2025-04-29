import { Api } from "../base/api";
import {IGoodApi} from "../../types/api";

// interface IToDoServer extends IToDoItem
//     {
//         "userId": number,
//       }

export class LarekAPI extends Api {

  getGoods(): Promise<IGoodApi> {
    return this.get('/product') as Promise<IGoodApi>;
  }

}
