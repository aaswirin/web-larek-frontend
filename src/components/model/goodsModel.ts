/**
 * Модуль описывает модель данных "ТоварЫ"
 * @module
 */
import { IGoodModel, TIdGoodType} from "../../types/good/model"
import { isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";

/**
 * Класс для товара
 *
 * @class GoodsModel
 *   @property {Map} goods Список товаров
 */
export class GoodsModel {
  protected goods: Map<TIdGoodType, IGoodModel> = new Map();   // Список товаров

  constructor(protected events: IEvents, data: IGoodModel[] | null) {
    this.events = events;
    if (!isEmpty(data)) this.setGoods(data);
  }

  getGoods(): IGoodModel[] {
    return Array.from(this.goods, ([key, value]) => value);
  }

  setGoods(data: IGoodModel[]): void {
    this.goods = new Map();
    data.forEach(good => {
      this.goods.set(good.id, good);
    })
    this.events.emit(settings.events.card.goodsAllChange)
  }

  getGood(id: TIdGoodType): IGoodModel {
    return this.goods.get(id);
  }

}
