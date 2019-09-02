// ---------------Главное меню-----------------

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

// ------------Слайдер сравнения------------------
var comparison = document.querySelector('.comparison');
var beforeImg = document.querySelector('.comparison__wrap-before');
var btnBefore = document.querySelector('.comparison__btn--before');
var btnAfter = document.querySelector('.comparison__btn--after');
var flag = document.querySelector('.comparison__flag');
var scale = document.querySelector('.comparison__scale');
var thumb = document.querySelector('.comparison__thumb');
var scaleCoords = scale.getBoundingClientRect();

if (comparison) {
  comparison.addEventListener('click', function(evt) {
    var target = evt.target;

    if (target === btnBefore) {
      beforeImg.style.width = '100%';
      thumb.style.left = scale.offsetWidth - thumb.offsetWidth / 2 + 'px';
      flag.classList.remove('comparison__flag--after');
    }

    if (target === btnAfter) {
      beforeImg.style.width = '0'
      thumb.style.left = -thumb.offsetWidth / 2 + 'px';
      flag.classList.add('comparison__flag--after');
    }
  });

  thumb.addEventListener('mousedown', function(evt) {

    var beforeImgCoords = beforeImg.getBoundingClientRect();
    var thumbCoords = thumb.getBoundingClientRect();
    var scaleCoords = scale.getBoundingClientRect();
    var thumbShift = evt.clientX - thumbCoords.x ;

    function onMouseMove(evt) {
      var newLeft = evt.clientX - thumbShift - scaleCoords.x;
      var beforeWidth;

      if (newLeft < -thumb.offsetWidth / 2) {
        newLeft =  -thumb.offsetWidth / 2;
      }

      if (newLeft > scale.offsetWidth - thumb.offsetWidth / 2) {
        newLeft = scale.offsetWidth - thumb.offsetWidth / 2;
      }

      thumb.style.left = newLeft + 'px';

      beforeWidth = (scaleCoords.x - beforeImgCoords.x) + newLeft + thumb.offsetWidth / 2;
      changeWidth(beforeWidth);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function(evt) {
      document.removeEventListener('mousemove', onMouseMove);
      thumb.onmouseup = null;
    })
  })

  function changeWidth(width) {
      beforeImg.style.width = width + 'px';
    }

  thumb.ondragstart = function() {
    return false;
  };
}
