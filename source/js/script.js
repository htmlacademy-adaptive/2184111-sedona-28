const headerNav = document.querySelector(".header");
const headerToggle = document.querySelector(".header__menu-toggle");

if (headerNav.classList.contains("header--nojs")) {
  headerNav.classList.remove("header--nojs");
}

headerToggle.addEventListener("click", function () {
  headerNav.classList.toggle("header--menu-opened");
});
