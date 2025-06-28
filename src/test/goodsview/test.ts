/**
 * Тесты для представления товара
 */

import { Test } from "../abstract/test";
import { EventEmitter } from "../../components/base/events";
import { settings } from "../../utils/constants";
import { CardGood } from "../../components/view/cardGood";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { TGood, TListGoods } from "../../types/good/model";
import { TIdGoodType } from "../../types";

export class GoodViewTest extends Test {
  protected testData: TListGoods = new Map<TIdGoodType, TGood>();

  test() {
    //try {
      const events = new EventEmitter();                // Брокер событий

      this.testData.set(
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        { id: '854cef69-976d-4c2a-a18c-2aa45046c390',
          description: 'Если планируете решать задачи в тренажёре, берите два.',
          image: '/5_Dots.svg',
          title: '+1 час в сутках',
          category: 'софт-скил',
          price: 750,
        });
      this.testData.set(
        "54df7dcb-1213-4b3c-ab61-92ed5f845535",
        { id: "54df7dcb-1213-4b3c-ab61-92ed5f845535",
          description: "Измените локацию для поиска работы.",
          image: "/Polygon.svg",
          title: "Портативный телепорт",
          category: "другое",
          price: 100000
        });

      const galleryCards = ensureElement(settings.elements.page.listGoods) as HTMLElement;

      const cards: HTMLElement[] = [];

      const templateCatalog: HTMLTemplateElement = ensureElement(settings.elements.card.templateCatalog) as HTMLTemplateElement;

      this.testData.forEach((item) => {
        cards.push(new CardGood(cloneTemplate(templateCatalog), events).render(item));
      })
      galleryCards.replaceChildren(...cards);

      // Всё отлично!
      this.result = {
        code: -1,
        message: '',
      }
    //} catch (e) {
    //  this.result = {
    //    code: 0,
    //    message: e.message,
    //  }
    //}

    this.consoleResult();
  }
}
