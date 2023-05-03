

// Исходя из того что мы выучили в этом модуле, мы создадим модельное окно, в котором примени все что мы
// выучили. Сделам некий сквозной кейс:

// Что у нас имеется ? В разметке у нас есть бэкдроп в котором стоит модалка в которой есть кнопка закрыть и
// открыть. В css все стили к модалке тоже прописаны.

// Наш план:
// 1. Открыть и закрыть по кнопке: onModalOpen и onModalClose
// 2. Закрыть по клику в бекдроп: onBackDropClick
// 3. Закрыть по ESC: onEscapeKeypress

// В CSS есть класс show-modal, который необходимо добавить на body при открытии модалки

// Почему мы вешаем класс именно на боди ? Потому что по селектору бекдропа мы можем достучаться до любого
// элемента (потомка) модалки и сделать с ним все что угодно. Это удобно!

// 1. Создаем объект refs в котором мы описываем рефы (ссылки на наши объекты в разметке) через классы:
const refs = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'), // ссылка на кнопку открытия модалки, 
  // в квадратных скобках [], т.к.используем селектор атрибута 
  closeModalBtn: document.querySelector('[data-action="close-modal"]'), // ссылка на кнопку закрытия модалки
  backdrop: document.querySelector('.js-backdrop'), // ссылка на сам бекдроп
};

// 2. Далее вешаем слушатели событий на наши объекты:
refs.openModalBtn.addEventListener('click', onOpenModal); // первым шагом научимся открывать модалку 
refs.closeModalBtn.addEventListener('click', onCloseModal); // далее научимся закрывать модалку
refs.backdrop.addEventListener('click', onBackdropClick); //

// 3. Прописываем обработчики событий (функции с условиями, которые будут выполняться при реагировании
// на событие)

// Напишем функцию под событие открытие модалки. Что должно произойти при открытии модалки? Напомню, что
// по условию мы должны: "в CSS есть класс show-modal, который необходимо добавить на body при открытии модалки"
// function onOpenModal() {
//   // window.addEventListener('keydown', onEscKeyPress);
//   document.body.classList.add('show-modal'); // получаем ссылку на боди и добавляем ему необходимый по
//   // условию класс. Раз и мы уже умеем вешать класс при открытии модалки. Суть этого класса такая, что
//   // при открытии модалки, на бодии добавляется класс 'show-modal', на который в css добавлены условия по 
//   // оформлению.Соответсвенно при открытии модалки эти условия применяются на все тело модалки а соответсвенно
//   // и на все вложенные элементы(потомки).И если оформление не переназначить в css каждому конкретном потомку
//   // то будет применятья базовое условие по оформлению, которое мы прописали на класс 'show-modal' и повесили
//   // на body.
// }

// Теперь напишем функцию которая закроет нашу модалку и при закрытии уберет с неё класс 'show-modal':
// function onCloseModal() {
//   // window.removeEventListener('keydown', onEscKeyPress);
//   document.body.classList.remove('show-modal');
// }

// По сути вся модалка это разметка + стили, а с помощью js мы добавляем класс. (Глобально через js мы
// добавляем/удаляем классы и css классы, плюс  работаем с добавлением и удалением данных в интерфейсе)

// Теперь напишем функцию, которая позволяет закрывать модалку при клике на бэкдроп, наша модалка
// будет закрываться.
// Напомню, что бэкдроп, это условно "подложка" на которой лежит модалка, она затеняет(если задать фон) и делает
// весь основной контент(буквально страницу сайта), который лежит за пределами модалки не доступным к
// использованию.


// function onBackdropClick(event) {
//     console.log('Кликнули именно в бекдроп!!!!'); // при клике на саму модалку тоже вылазит сообщение. Почему?
//     // Потому что это называется всплытие событий (разберем детальнее на следующем занятии). Событие повесили
//     // на бекдроп(родителя), но срабатывает оно даже на самом глубоко вложенном элементе.К примеру, у нас есть
//     // бэкдроп, на нем есть модалка, а в модалке есть куча офорления, к примеру абзац.Так вот при клике на абзац
//     // (т.е.на глубоком потомке своего родителя - бэкдропе), все равно будет срабатывать событие родителя(а 
//     // точнее предка в который вложен элемент)
//     console.log(event.currentTarget); // currentTarget - это срабатывание события на объекте (бэкдропе) на который 
// // изначально повесили событие  
//     console.log(event.target); // а target - это целевой элемент (к примеру модалка или абзац внутри бэкдропа), 
//     // на который буквально кликнули внутри объекта на которое повесили событие(бекдроп). Т.е. это тот объект на 
//     // котором это событие родилось (т.е. призошел клик).
//     // Т.е.если мы кликнем буквально на бэкдроп, то результат console.log(event.currentTarget) и
//     // console.log(event.target) будет равен бэкдроп.Если кликнули на абзац внутри бэкдропа то 
//     // наш event.currentTarget будет равен бэкдроп, а наш event.target будет равен объекту (элементу) абзац.
//   }

  
// Чтобы решить нашу задачку, т.е.только при клике на бэкдроп сворачивалась наша модалка, мы пропишем условие:

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    console.log('Кликнули именно в бекдроп!!!!'); 
    onCloseModal(); // если наше условие выполняется, т.е. кликнули именно на бекдроп, то просто вызываем
    // функцию, которая закрывает нашу модалку (с. строки 49-52). Без прописанного условия в if наша модалка
    // будт закрываться даже при нажатии на саму модалку и элементы размещенные на ней.
  }
}


// Осталось написать функцию, которая будет закрывать нашу модалку при нажатии клавиши ESC
// Для начала просто пропишем слушатель событий на window. Вопрос что применить keypress keydown?

// window.addEventListener('keypress', onEscKeyPress) // не сработает, т.к. keypress регистрирует событие, только
// при нажатии клавиш, которые печатают символ (esc - служебная клавиша)

window.addEventListener('keydown', onEscKeyPress) // так сработает

// Пропишем функцию и вроде все сработало.
function onEscKeyPress(event) {
    onCloseModal();
  }

// НО в чем проблема такого подхода ? А в том, что мы перманентно(постоянно) прослушиваем событие нажатия
// клавиатуры, даже при закрытой модалке. Это вообще не феншуй, так как мы забиваем так память.

// Соответсвенно нам необходимо применять нашего слушателя событий только тогда когда мы эту модалку открываем.
// Т.е. когда открыли модалку мы вешаем слушателя событий клавиатуры, а когда закрыли снимаем его.
// Т.е. вставляем наш window.addEventListener('keydown', onEscKeyPress) в:

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal'); 
}


// А когда закрываем нашу модалку, то отписываемся от события слушателя клавиатуры.т.е.вставляем наш
//   window.removeEventListener('keydown', onEscKeyPress) в нашу ункцию закрытия модалки:

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

// function onEscKeyPress(event) {
//     onCloseModal();
//   }

// Но из того что мы прописали, получается, что мы повесили слушателя клавиатуры и какую бы мы клавишу
// не нажали при открытой модалке, у нас будет она закрываться, довольно странно, соответсвенно необходимо
// куда то добавить условие, в котором описать условие по какой именно клавише будет происходить закрытие
// модалки.
// Расширим условие для нашей функции onEscKeyPress:

// function onEscKeyPress(event) {
//   console.log(event.code) // для наглядности
//   if (event.code === 'Escape') {
//     onCloseModal();
//     }
//   }

// Добавим константу:

// function onEscKeyPress(event) {
//   const ESC_KEY_CODE = 'Escape';
//   if (event.code === ESC_KEY_CODE) {
//     onCloseModal();
//     }
//   }

// А можно ещё и вот так записать:

// function onEscKeyPress(event) {
//   const ESC_KEY_CODE = 'Escape';
//   const isEscKey = event.code === ESC_KEY_CODE;

//   if (isEscKey) {
//     onCloseModal();
//   }
// }


// Перепишем наше решение начисто:

// 1. Ссылки на объекты:
const refs = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'), 
  closeModalBtn: document.querySelector('[data-action="close-modal"]'), 
  backdrop: document.querySelector('.js-backdrop'), 
};

// 2. Слушатели событий:
refs.openModalBtn.addEventListener('click', onOpenModal); 
refs.closeModalBtn.addEventListener('click', onCloseModal); 
refs.backdrop.addEventListener('click', onBackdropClick); 


// 3. Функции, которые мы вкладываем как кобэеки на место второго параметра(аргумента в слушателях событий)
function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal'); 
}


function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

// 4. Вспомагатльеные функции которые мы вкладываем и вызываем внутри функций п.3 
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
     onCloseModal(); 
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}