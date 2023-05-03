/*
 * События мыши
 * - mouseenter и mouseleave (это ховер)
 * - mouseover и mouseout
 * - mousemove (chatty event - болтливое событие)
 * - Допмат по координатам: https://nerdparadise.com/programming/javascriptmouseposition
 * - Хорошая задачка - https://learn.javascript.ru/task/move-ball-field
 */


// Разберем самые интересные события которые есть у мышки:

// Первое это: mouseenter и mouseleave (эти два события это буквально ховер)

const boxRef = document.querySelector('.js-box');

boxRef.addEventListener('mouseenter', onMouseEnter); // вешаем слушатель с событием 'mouseenter' 
boxRef.addEventListener('mouseleave', onMouseLeave); // вешаем слушатель с событием 'mouseleave'
// boxRef.addEventListener('mousemove', onMouseMove);

// Суть функции: получаем ссылку на boxRef и добавляем ему класс 'box--active'
function onMouseEnter(event) {
  const box = event.currentTarget; // по ссылке находим событие на объекте boxRef
  box.classList.add('box--active'); // класс 'box--active' уже прописан в css 
}
// Суть функции: получаем ссылку на boxRef и убираем ему класс 'box--active'
function onMouseLeave(event) {
  const box = event.currentTarget; // по ссылке находим событие на объекте boxRef
  box.classList.remove('box--active'); // класс 'box--active' уже прописан в css
}

// По сути мы получили ховер через js.Т.е.когда наводим на объект, ему добавляется класс 'box--active' на
// который в css повесили стиль (цвет), когда убираем мышку с объекта, цвет возвращается в дефолтное состояние.


// Также есть события: mouseover и mouseout, в чем их разница с mouseenter и mouseleave?
// mouseenter - срабатывает когда мышка заходит в границы твоего блока и находится где-то в его границах
// mouseleave - срабатывает когда мышка выходит за границы блока
// mouseover - срабатывает мы находимся конкретно над объектом которому присвоили класс, не срабатывает, если 
// внутри этого объекта есть ещё один объект (ребенок)
// mouseout - срабатыват когда мы выходим за границы объекта родителя (к примеру внутри, в центре нашего 
// объекта есть ребенок). 
  
boxRef.addEventListener('mouseover', onMouseEnter); // вешаем слушатель с событием 'mouseover' 
boxRef.addEventListener('mouseout', onMouseLeave); // вешаем слушатель с событием 'mouseout'


// Далее у нас есть событие mousemove(chatty event - болтливое событие) - так называется потому что она часто
// происходит, буквально стоит подвигать мышкой по объекту на который мы повесили слушатель событий с событием
// mousemove, мы получим регистрацию каждого движения мышки 

boxRef.addEventListener('mousemove', onMouseMove);
function onMouseMove(event) {
  console.log(event); // в консоле мы можем отследить регистрацию событий при передвижении мышки по объекту
}

// Прочитать доп.мат чтобы понять как это работает:
//  * - Допмат по координатам: https://nerdparadise.com/programming/javascriptmouseposition

// На основе прочитанного доп.материала решить задачку:
//  * - Хорошая задачка - https://learn.javascript.ru/task/move-ball-field



// Исходник переписанный начисто:

// const boxRef = document.querySelector('.js-box');

// boxRef.addEventListener('mouseover', onMouseEnter);
// boxRef.addEventListener('mouseout', onMouseLeave);
// boxRef.addEventListener('mousemove', onMouseMove);


// function onMouseEnter(event) {
//   const box = event.currentTarget;
//   box.classList.add('box--active');
// }

// function onMouseLeave(event) {
//   const box = event.currentTarget;
//   box.classList.remove('box--active');
// }

// function onMouseMove(event) {
//   console.log(event);
// }