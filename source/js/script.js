var toggle = document.querySelector('.page-header__toggle');
var nav = document.querySelector('.page-header__nav');

if (toggle && nav) {
  toggle.classList.remove('page-header__toggle--nojs');
  nav.classList.add('page-header__nav--close');

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('page-header__toggle--open');
    nav.classList.toggle('page-header__nav--close');
  })
}
