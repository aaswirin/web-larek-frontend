/**
 * Тесты для представления страницы
 */

import { Test } from "../abstract/test";
import { EventEmitter } from "../../components/base/events";
import { settings } from "../../utils/constants";
import { CardGood } from "../../components/view/cardGood";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Page } from "../../components/view/page";
import {TListGoods} from "../../types/good/model";


export class PageViewTest extends Test {
  protected testData: TListGoods;

  test() {
    try {
      this.testData = new Map();

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

      const events = new EventEmitter();                // Брокер событий
      const page = new Page(ensureElement(settings.elements.page.pageContent) as HTMLElement, events);
      const goodTemplate = ensureElement(settings.elements.card.templateCatalog) as HTMLTemplateElement;

      const cards: HTMLElement[] = [];

      this.testData.forEach((item) => {
        cards.push(new CardGood(cloneTemplate(goodTemplate), events).render(item));
      })

      page.render({
        goodsList: cards,
        basketCount: 33,
        }
      )

      // Всё отлично!
      this.result = {
        code: -1,
        message: '',
      }
    } catch (e) {
      this.result = {
        code: 0,
        message: e.message,
      }
    }

    this.consoleResult();
  }
}
