/**
 * Модуль описывает модель данных "Товар"
 * @module
 */
import { IGoodModel, TCategoryType } from "../types/good"

/**
 * Класс для товара
 *
 * @class Good
 *   @property {string} id id
 *   @property {string} description описание
 *   @property {string} image URL картинки
 *   @property {string} title наименование
 *   @property {TCategoryType} category категория
 *   @property {number | null} TCategoryType цена, может быть null (зачем? для аукциона?)
 */
export class Good {
  protected id: string;               // id
  protected description: string;      // описание
  protected image: string;            // URL картинки
  protected title: string;            // наименование
  protected category: TCategoryType;  // категория
  protected price: number | null;     // цена, может быть null (зачем? для аукциона?)

  constructor(data: IGoodModel) {
    this.setGood(data);
  }

  getGood(): IGoodModel {
    return {
      id: this.id,
      description: this.description,
      image: this.image,
      title: this.title,
      category: this.category,
      price: this.price,
    }
  }

  setGood(data: IGoodModel): void {
    this.id = data.id;
    this.description = data.description;
    this.image = data.image;
    this.title = data.title;
    this.category = data.category;
    this.price = data.price;
  }
}
