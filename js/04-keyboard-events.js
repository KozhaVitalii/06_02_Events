/*
 * Типы событий: keypress, keydown, keyup
 * - Ограничения keypress
 * - Свойства KeyboardEvent.key и KeyboardEvent.code
 */

// Ничего сложного, но есть несколько своих особенностей.

// Что у нас еть в нашей разметке ?
  
    // <button class="js-clear">Очистить</button>
    // <p class="output js-output"></p>  

// У нас есть кнопка, при нажатии на которую она будет очищать и у нас есть пустой абзац.

// Так же у нас есть рефы на эти элементы, где output это ссылка на абзац и clearBtn ссылка на конопку очистки:

// const refs = {
//   output: document.querySelector('.js-output'), // ссылка на абзац
//   clearBtn: document.querySelector('.js-clear'), // ссылка на кнопку
// };

// Куда мы будем вешать нашего слушателя событий для клавиатуры? Первое куда нам необходимо научиться, это
// вешать слушателя событий на окно:

// У слушателя события клавиатуры есть несколько типов событий: keypress (это композитное событие, т.е.
// срабатывает по результату нажатия), keydown(когда клавиша зажимается вниз), keyup(когда клавиша отпускается
// вверх).
// Попробуем для начала keydown:
// window.addEventListener('keydown', onKeypress);

// // Наш обработчик событий:
// function onKeypress(event) {
//   console.log(event); // посмотрим на событие (объект) 'keydown' и его свойства и методы. При нажатии
//   // на клавиатуру в консоли увидем как будет срабатывать событие
//   console.log('event.key: ', event.key);
// }

// Событие keydown реагирует на нажатие любой клавиши включая служебные (альт, контрл и т.д.)

// window.addEventListener('keypress', onKeypress);

// Наш обработчик событий:
// function onKeypress(event) {
//   console.log(event);
//   console.log('event.key: ', event.key);
// }

// Событие keypress реагирует только на нажатие тех клавиш которые печатаю какой то символ, на служебные
// (альт, контрл и т.д.)!!!

// Нам больше интересна другая штука:

// У объекта "событие" есть два важных свойства: "code" и "key", где "code" - это буквально наша физическая
// клавиша на клавиатуре (в анг.разкладке), а вот в свойстве "key" - отображается та буква(символ) на том
// языке (алфавите), которую вы ввели или набираете

// window.addEventListener('keypress', onKeypress);

// function onKeypress(event) {
//   console.log(event);
//   console.log('event.key: ', event.key);
//   console.log('event.code: ', event.code);
// // Поэтому если мы хотим напичатать что-то:
//   // refs.output.textContent += event.code; // так будет странно так как мы получим физические клавиши
//   refs.output.textContent += event.key; // а так мы получим символы с учетом языка клавиатуры, это свойство
//   // будем использовать при работе с модалкой
// }

// // Теперь мы хотим очистить то что мы понавводили: 
// refs.clearBtn.addEventListener('click', onClearOutput); // делаем ссылку на нашу кнопку

// // пишем обработчик:
// function onClearOutput() {
//   refs.output.textContent = '';
// }


// Перепишем начисто:

const refs = {
  output: document.querySelector('.js-output'), // ссылка на абзац
  clearBtn: document.querySelector('.js-clear'), // ссылка на кнопку
};

window.addEventListener('keypress', onKeypress);
refs.clearBtn.addEventListener('click', onClearOutput);

function onKeypress(event) {
  console.log('event.key: ', event.key);
  console.log('event.code: ', event.code);
refs.output.textContent += event.key;
}

function onClearOutput() {
  refs.output.textContent = '';
}
