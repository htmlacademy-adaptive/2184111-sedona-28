let headerNav = document.querySelector(".header");
let headerToggle = document.querySelector(".header__menu-toggle");

headerNav.classList.remove("header--nojs");

headerToggle.addEventListener("click", function () {
  if (headerNav.classList.contains("header--menu-closed")) {
    headerNav.classList.remove("header--menu-closed");
    headerNav.classList.add("header--menu-opened");
  } else {
    headerNav.classList.add("header--menu-closed");
    headerNav.classList.remove("header--menu-opened");
  }
});
