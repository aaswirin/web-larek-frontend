import './scss/styles.scss';


// Тесты
import {startTests} from "./test/test";
if (!startTests()) throw new Error('Тесты не пройдены');
