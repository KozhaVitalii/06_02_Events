/*
 * Паттерн «Объект ссылок»
 *
 * События
 * - focus и blur
 * - input и change
 * - Чекбоксы и свойство checked
 */

// Паттерн «Объект ссылок» - что это такое? Разберем на примере:

// У нас есть фрагмент разметки (см. файл с html):

// <!-- <form action="" autocomplete="off"> -->
//     <label>
//       Имя
//       <input type="text" class="js-input" />
//     </label>

//     <p>
//       <label>
//         <input type="checkbox" class="js-license" />
//         Принимаю лицензинное соглашение
//       </label>
//     </p>

//     <button type="submit" disabled class="js-button">
//       Зарегистрироваться как <span>Аноним</span>
//     </button>
//     <!-- </form> -->

// Что будем делать ? Набирать имя в инпуте '.js-input', после чего на кнопке '.js-button', внутри  спана
// '.js-button > span' значение "аноним" должен заменяться на значение(имя) введенное внутри импут '.js-input',
// плюс по умолчанию кнопка '.js-button' не активная и только после того как мы принимаем лицензионное
// соглашение '.js-license' (т.е. установим на чекбокс галочку), наша кнопка '.js-button' становится активной.

// Для этого в js нам понадобятся ссылки (по классам) на эти объекты, т.е. блок ссылок:    
// const input = document.querySelector('.js-input'); // ссылка на сам импут 
// const nameLabel = document.querySelector('.js-button > span');  // ссылка на спан внутри кнопки
// const license = document.querySelector('.js-license'); // ссылка на инпут(чкбокс) лизензии 
// const btn = document.querySelector('.js-button'); // ссылка на саму кнопку

// мы можем это заменить на такой Паттерн или «Объект ссылок»:
const refs = {
  input: document.querySelector('.js-input'),
  nameLabel: document.querySelector('.js-button > span'),
  licenseCheckbox: document.querySelector('.js-license'),
  btn: document.querySelector('.js-button'),  
};

// Далее в коде мы можем обращаться к этому объекту, к примеру refs.input и мы будем понимать что это
// ссылка на какой то элемент в коде, потому что это лежит на объекте рефов.
// Минус в том что при такой записи у нас в коде будет все время фигурировать такие записи:
// refs.input, refs.btn, refs.nameLabel и т.д.
// Плюсы в том что будет проще читать и находить нужные элементы, опять же потому что у нас есть ссылки на
// объект "refs."

// Далее что мы делаем ? Работаем с первым событием, это событие на инпуте '.js-input'(т.е.введение
// пользователем имени)

// У него есть первое событие:
// refs.input.addEventListener('focus', onInputFocus);

// function onInputFocus() {
//   console.log('Инпут получил фокус - событие focus');
// }

// Что это за фокус ? Это когда пользователь устанавивает курсор в поле импута(ввода данных). При наступлении
// этого события согласно нашей функции onInputFocus, запишется сообщение 'Инпут получил фокус - событие focus'

// Также можем на инпут повесить событие 'blur':
// refs.input.addEventListener('blur', onInputBlur);

// function onInputBlur() {
//   console.log('Инпут потерял фокус - событие blur');
// }

// Это событие срабатывает когда происходит потеря фокуса. Функция в нашем примере выведет сообщение
// 'Инпут потерял фокус - событие blur'

// Следующие два события предназначены для того чтобы получить значение этого инпута:

// Первое событие это 'change':
// refs.input.addEventListener('change', onInputChange);

// function onInputChange() {
//   console.log(event);
// }

// Как будет срабатывать это событие ? Мы повесили на наш инпут слушателя события 'change' и передали ссылку
// на колбек onInputChange (т.е. на function onInputChange(event) см. ниже в коде).
// Чтобы получить изменения мы можем написать к примеру так:

// console.log(event.currentTarget.value); // и мы получим наше значение

// НО такой вариант мы использовать на инпутах не будем, такой вариант используем только на чекбоксах и на
// радиобатонах!!!

// Стандартное же событие для работы с текстовыми инпутами это событие 'input':
// refs.input.addEventListener('input', onInputChange);

// function onInputChange(event) {
//   console.log(event.currentTarget.value);
// }

// Что это за событие ? Это событие срабатывает каждый раз, когда меняется значение в поле инпута.Буквально
// при добавлении или удалении каждой буквы в текстовом инпуте, будет срабатывать это событие.В отличии
// от 'change'(когда буквально при потере фокуса у нас срабатывает событие, поэтому он не юзается в работе с
// текстовыми инпутами), событие 'input' срабатывает при изенении каждого символа в поле инпута.

// С событиями в инпутах разобрались, теперь реализуем нашу задачу:
// Что будем делать ? Набирать имя в инпуте '.js-input', после чего на кнопке '.js-button', внутри  спана
// '.js-button > span' значение "аноним" должен заменяться на значение(имя) введенное внутри импут '.js-input',
// плюс по умолчанию кнопка '.js-button' не активная и только после того как мы принимаем лицензионное
// соглашение '.js-license' (т.е. установим на чекбокс галочку), наша кнопка '.js-button' становится активной.


// 1. Первым шагом мы будем прослушивать ввод текста на инпуте:
refs.input.addEventListener('input', onInputChange);

// function onInputChange(event) {
//   console.log(event.currentTarget.value);
// }
// Что мы в итоге получаем? Значение нашего инпута!
// Если мы получаем это значение, то нам остается только взять и изменить на нашей кнопке
// значение в < span > Аноним </span >, при каждом изменении значения в поле инпута. Для этого допишем
// функцию:

function onInputChange(event) {
  console.log(event.currentTarget.value);
refs.nameLabel.textContent = event.currentTarget.value; 
} 
// В итоге: 1. прослушали событие инпута в refs.input.addEventListener('input', onInputChange);, далее
// 2. в function onInputChange(event) { console.log(event.currentTarget.value) }; мы прочитали значение
// этого события при инпуте и 3. В refs.nameLabel.textContent = event.currentTarget.value; - записали изменили
// текст значение в спан кнопки "Зарегистрироваться", на то которое вводит пользователь

// Вторая часть задания: Нам необходимо чтобы наша кнопка "Зарегистрироваться" становилась активной, только
// тогда когда мы чекнули наш чекбокс с лицензией.

// 1. Раннее мы уже сказали, что 'change' применяется для радиобатонов и чекбоксов, поэтому вешаем слушатель с
// событием 'change' на наш чекбокс + повесим на него наш обработчик событий (колбэек функцию) onLicenseChange:

refs.licenseCheckbox.addEventListener('change', onLicenseChange);

// 2. Наш обрабочик событий (колбэк функция):
function onLicenseChange(event) {
  console.log('Срабатывает при нажатии'); // это чтобы проверить что срабатывает но далее нам необходимо
  // прописать условие для активации кнопки и дезактивации в случае снятия галки с чекбокса.Т.е.привязать
  // условие к true или false.
  console.log(event.currentTarget.checked); // ссылка на наш чекбокс. У чекбоксов, радиобатонов и инпутов с
  // типом чекбокс, есть такое свойство как 'checked' которое хранит в себе true или false.Законсолив мы можем 
  // посмотреть как меняется значение чекбокса на true или false.

  // Далее как это всё связать ? У кнопок есть такое свойство как 'disabled' и возвращает true или false.Поэтому
  // используем это свойство в написании условия для нашей функции:
  refs.btn.disabled = !event.currentTarget.checked;  
}

// Т.е.в "refs.btn.disabled = !event.currentTarget.checked;" мы говорим: кнопка зарегистрироваться имеет
// свойство disabled(т.е.true или находится в неактивном состоянии), в том случае, когда наш чекбокс не
// равен checked, т.е.равен false.Далее, когда мы нажимаем на наш чекбокс и устанавливаем галочку, у него
// срабатывает событие checked, которое будет равно true, что для нашего выражения будет как:
// "refs.btn.disabled = event.currentTarget.checked;" = false, а значит наш disabled будет не false а true и
// наша кнопка активируется.При повторном нажатии на чекбокс(при отключении галочки), снова сработает выражение
// "refs.btn.disabled = !event.currentTarget.checked;"

// Т.е.выражение "refs.btn.disabled = !event.currentTarget.checked;" говорит кнопка выключена, когда чекбокс
// не выбран. Если сделать так: "refs.btn.disabled = event.currentTarget.checked;", то тогда наоборот, когда
// галка включена, кнопка будет не активна.

// В самом начале наша кнопка имеет неактивное состояние, потому что в нашей верстке у неё есть атрибут disabled
// <button type="submit" disabled class="js-button">

// Всё, наша задача выполнена, после чего нашу форму можно отправлять!


// Чистовой вариант:

// refs.input.addEventListener('input', onInputChange);

// refs.licenseCheckbox.addEventListener('change', onLicenseChange);

// function onInputFocus() {
//   console.log('Инпут получил фокус - событие focus');
// }

// function onInputBlur() {
//   console.log('Инпут потерял фокус - событие blur');
// }

// function onInputChange(event) {
//   refs.nameLabel.textContent = event.currentTarget.value;
// }

// function onLicenseChange(event) {
//   refs.btn.disabled = !event.currentTarget.checked;
// }