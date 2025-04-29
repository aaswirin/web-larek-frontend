/**
 * Работа с ошибками приложения
 */

/**
 * Показать ошибку
 *
 * @param {string} title Заголовок сообщения об ошибке
 * @param {string} message Собственно сообщение
 */
export function showError(title: string, message: string) {
  console.log(`${title} -> ${message}`);
}
