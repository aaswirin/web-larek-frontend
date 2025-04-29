import './scss/styles.scss';
import {LarekAPI} from "./components/api/larekAPI";
import {API_URL} from "./utils/constants";
import {GoodsModel} from "./components/model/goodsModel";
import {showError} from "./components/interface/error";
import {IGood} from "./types/good";

/*
// Тесты
import {startTests} from "./test/test";
startTests();
*/

// Константы
const api  = new LarekAPI(API_URL);  // API
const goods = new GoodsModel(null);      // Список товаров

// Загрузка товаров
api.getGoods()
  .then(data => {
    console.log(data)
    goods.setGoods(data.items as IGood[]);
    console.log(goods);
  })
  .catch(err => {
    showError('Загрузка товаров', err.message);
  });
