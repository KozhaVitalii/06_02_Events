/*
 * - Событие submit
 * - Действия браузера по умолчанию
 * - Свойство elements
 * - Класс FormData - https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */


// У форм самое полезное событие это submit

// В разметке к файлу у нас есть некая форма, у которой есть поля, сабскрипшины, радиобатоны и кнопка
// зарегистрироваься

// Делаем чистый код:

// 1. Блок выборки элементов:
// Сделаем ссылку по классу на нашу форму:
const form = document.querySelector('.js-register-form');

// Что буем с ней делать?

// 2. Блок подписок:
// Во первых обработаем её 'submit'(т.е.отправку формы):
// Обратим внимание что в данном случае нашим событием при нажатии кнопки на форме будет не 'click', а
// 'submit', а именно отправка самой формы.Т.е.сама наша форма(на которой есть кнопка), будет реагировать
// на отправку.

form.addEventListener('submit', onFormSubmit); // onFormSubmit мы передаем из внешней функции, которую
// мы создали на следующем шаге.

// 3. Блок всех обработчиков этих подписок:
// Во вторых, сразу сделаем внешнюю функцию:
// Комментарий.Когда мы нажимаем кнопку отправить, по умолчанию наш браузер отправляет и перезагружает
// (обновляет) страницу.Мы как разработчики этого не хотим, и сделаем совсем по другому.Для этого
// на объекте события отправки формы 'submit' есть свойство preventDefault() - что означает предотвратить
// по умолчанию. Пишем:

// Функция позволяющая отправлять форму без перезагрузки
function onFormSubmit(event) {
  event.preventDefault(); // event это название для примера, это наш сабмит,
  // который мы указали в form.addEventListener('submit', onFormSubmit). Если бы этой записи не было
  // наша страница перезагрзилась бы.

  console.log(event); // законсолим событие 'submit' чтобы посмотреть какие на нем есть свойства
  console.log(event.currentTarget.elements.subscription, value); // мы можем достучаться до любого свойста
  // этого события. Через "." опускаемся до любого уровня вложенности. currentTarget - это ссылка на элемент
  // который прослушивается т.е. на форму.
  console.log('это сабит формы');

// Как мы можем достучаться до элементов формы, чтобы узнать их значения (просто узнать, а не собирать!!!):
// К примеру:

  const formElements = event.currentTarget.elements;
  console.dir(formElements);

  // const mail = formElements.email.value;
  // const password = formElements.password.value;
  // const subscription = formElements.subscription.value;

  // В итоге видим:
  // console.log(mail, password);

// Представим что мы хотим теперь отправить на сервер объект с свойствами этой формы:
  
  // const formData = {
  //   mail, password, subscription
  // }
  // console.log(formData);

// Теперь представим что в нашей форме не 3 поля, а 50!!! Мы же не будем все свойства прописывать руками.
// В итоге интерфейс elements нам нужен для того чтобы поработать с какими то отдельными элементами формы.
// Если же нам просто необходимо собрать данные всей абсолютно формы у нас есть один классный помошник, который
// называется "formData". formData - это класс (прототип объекта), на основе которого могут создаваться 
// экземпляры объектов.
  
//  Детальнее про него можно почитать здесь:  
//  Класс FormData - https://developer.mozilla.org/en-US/docs/Web/API/FormData
  
// Что мы делаем?

  const formData = new FormData(event.currentTarget) // мы оздаем новый экземпляр FormData() т.к. это
  // специальный класс. При вызове которого мы аргументом создаем ссылку на саму форму (т.е. DOM узел).
  // formData под капотом собирает значения всех полей формы. Очень удобно. 
  // Посмотрим что внутри, для этого в браузере необходимо заполнить поля значениями:
  console.log(formData);
  // В результате мы ничего не увидим, зато такую formData мы можем отправлять прям на сервер. НО если
  // мы хотим убедиться что там все правильно, то используем метод forEach (важно что это не тот метод 
  // массивов который их перебирает, это просто одноименное название свойства(метода) объекта formData):

  // В выражение formData.forEach((value, name)) в () первым мы указываем значение поля и его название.
  formData.forEach((value, name) => {
    console.log('onFormSubmit -> name', name);
    console.log('onFormSubmit -> value', value);
  }); 
}

//  Короче formData это наш лучший помощник при сборе данных из большой формы.
// Пошагово: у нас есть класс formData, делаем новый объект const formData = new FormData, внутрь
// которого в () кинули ссылку на целую форму с которой хотим собрать данные FormData(event.currentTarget)
// А посмотреть их можно через forEach:
  // formData.forEach((value, name) => {
  //   console.log('onFormSubmit -> name', name);
  //   console.log('onFormSubmit -> value', value);
  // });

// Это очень пригодиться для работы с сервером (бэкендом) и т.д.


// Перепишем все начисто:

// function onFormSubmit(event) {
//   event.preventDefault(); 
//   const formData = new FormData(event.currentTarget);

//   console.log(formData);

//   formData.forEach((value, name) => {
//     console.log('onFormSubmit -> name', name);
//     console.log('onFormSubmit -> value', value);
//   });
// }
