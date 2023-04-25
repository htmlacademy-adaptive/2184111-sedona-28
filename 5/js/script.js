const headerNav = document.querySelector(".header");
const headerToggle = document.querySelector(".header__menu-toggle");

if (headerNav.classList.contains("header--nojs")) {
  headerNav.classList.remove("header--nojs");
}

headerToggle.addEventListener("click", function () {
  headerNav.classList.toggle("header--menu-opened");
});

// headerToggle.addEventListener("click", function () {
//   if (headerNav.classList.contains("header--menu-closed")) {
//     headerNav.classList.remove("header--menu-closed");
//     headerNav.classList.add("header--menu-opened");
//   } else {
//     headerNav.classList.add("header--menu-closed");
//     headerNav.classList.remove("header--menu-opened");
//   }
// });

// Если значение переменной не меняется в скрипте, то при её объявлении используем не let, а const
// Прежде чем вешать событие или как-то работать с элементов разметки, надо убедиться что он существует на странице, например:
// if (headerNav) {
//   headerNav.classList.remove("header--nojs");
// }
// Действия по добавлению и удалению классов -closed и -opened можно упростить при помощи функции classList.toggle(classname)

// let sectionMap = document.querySelector(".main-index__map");
// sectionMap.classList.remove("main-index__map--nojs");
