'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var WIDTH_MAIN_PIN_DEACTIVATE = 65;
  var map = document.querySelector('.map');
  var activationMapTrigger = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var filterSelects = mapFiltersForm.getElementsByTagName('select');
  var filterFieldsets = mapFiltersForm.getElementsByTagName('fieldset');
  var adAddress = adForm.querySelector('#address');

  window.main = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    activationMapTrigger: activationMapTrigger,
    adAddress: adAddress,
  };

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

  // Получение координат метки на карте
  window.getCoordinatesPin = function (pin, widthPin, heightPin) {
    var offsetX = pin.offsetLeft + Math.round(widthPin / 2);
    var offsetY = pin.offsetTop + Math.round(heightPin);
    var coordinates = offsetX + ', ' + offsetY;
    return coordinates;
  };

  // Листенер на главную метку map__pin--main для активации страницы нажатием мышки
  activationMapTrigger.addEventListener('mousedown', function () {
    activateMap();
    adAddress.value = window.getCoordinatesPin(activationMapTrigger, window.map.PIN_MAIN_WIDTH, window.map.PIN_MAIN_HEIGHT);
  });

  // Листенер на главную метку map__pin--main для активации страницы нажатием Enter
  activationMapTrigger.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap();
      adAddress.value = window.getCoordinatesPin(activationMapTrigger, window.map.PIN_MAIN_WIDTH, window.map.PIN_MAIN_HEIGHT);
    }
  });

  // Деактивация страницы
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  deactivateElements(adFieldsets);
  deactivateElements(filterSelects);
  deactivateElements(filterFieldsets);
  // Значения X и Y в поле Адрес при загрузке страницы (главная метка - без острого конца)
  adAddress.value = window.getCoordinatesPin(activationMapTrigger, WIDTH_MAIN_PIN_DEACTIVATE, WIDTH_MAIN_PIN_DEACTIVATE / 2);
})();
