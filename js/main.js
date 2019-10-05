'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  window.main = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE
  };
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 84;
  var map = document.querySelector('.map');
  var activationMapTrigger = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var filterSelects = mapFiltersForm.getElementsByTagName('select');
  var filterFieldsets = mapFiltersForm.getElementsByTagName('fieldset');
  var adAddress = adForm.querySelector('#address');

  // Деактивация элементов (для форм)
  var deactivateElements = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = true;
    }
  };

  // Активация элементов (для форм)
  var activateElements = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = false;
    }
  };

  // Активация страницы
  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFieldsets);
    activateElements(filterSelects);
    activateElements(filterFieldsets);
  };

  // Получение координат элемента
  var getElementCoordinates = function (element) {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = element.getBoundingClientRect();
    var offsetX = elemRect.left - bodyRect.left;
    var offsetY = elemRect.top - bodyRect.top;
    var coordinates = {
      left: offsetX,
      top: offsetY
    };
    return coordinates;
  };

  // Листенер на главную метку map__pin--main для активации страницы нажатием мышки
  activationMapTrigger.addEventListener('mousedown', function () {
    activateMap();
    var left = getElementCoordinates(activationMapTrigger).left + Math.round(PIN_MAIN_WIDTH / 2);
    var top = getElementCoordinates(activationMapTrigger).top + PIN_MAIN_HEIGHT;
    // вызов метода, который устанавливает значения поля ввода адреса
    adAddress.value = left + ', ' + top;
  });

  // Листенер на главную метку map__pin--main для активации страницы нажатием Enter
  activationMapTrigger.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap();
    }
    adAddress.value = getElementCoordinates(activationMapTrigger).offsetX + ', '
    + getElementCoordinates(activationMapTrigger).offsetY;
  });

  // Деактивация страницы
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  deactivateElements(adFieldsets);
  deactivateElements(filterSelects);
  deactivateElements(filterFieldsets);
})();
