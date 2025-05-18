/**
 * Тесты для представления товара
 */

import { Test } from "../abstract/test";
import { IGoodModel } from "../../types/good/model";
import { EventEmitter } from "../../components/base/events";
import {settings} from "../../utils/constants";
import { CardGood } from "../../components/view/cardGood";
import {cloneTemplate, ensureElement} from "../../utils/utils";


export class GoodViewTest extends Test {
  protected testData: IGoodModel[] = [
    {
      id: '854cef69-976d-4c2a-a18c-2aa45046c390',
      description: 'Если планируете решать задачи в тренажёре, берите два.',
      image: '/5_Dots.png',
      title: '+1 час в сутках',
      category: 'софт-скил',
      price: 750,
    },
    {
      id: '54df7dcb-1213-4b3c-ab61-92ed5f845535',
      description: 'Измените локацию для поиска работы.',
      image: '/Polygon.png',
      title: 'Портативный телепорт',
      category: 'другое',
      price: 100000,
    },
    {
      id: '90973ae5-285c-4b6f-a6d0-65d1d760b102',
      description: 'Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.',
      image: '/Mithosis.svg',
      title: 'Бэкенд-антистресс',
      category: 'другое',
      price: 1,
    },
    {
      id: 'b06cde61-912f-4663-9751-09956c0eed67',
      description: 'Будет стоять над душой и не давать прокрастинировать.',
      image: '/Asterisk_2.svg',
      title: 'Мамка-таймер',
      category: 'софт-скил',
      price: null
    },
  ];

  test() {
    try {
      const events = new EventEmitter();                // Брокер событий
      const galleryCards = ensureElement(settings.elements.page.listGoods) as HTMLElement;

      const cards: HTMLElement[] = [];

      this.testData.forEach((item) => {
        cards.push(new CardGood(cloneTemplate(CardGood.templateCatalog), events).render(item));
      })
      galleryCards.replaceChildren(...cards);

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
