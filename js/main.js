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
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  window.main = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    activationMapTrigger: activationMapTrigger,
    adAddress: adAddress
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
    window.load(window.data.successHandler, window.data.errorHandler); // Загрузка объявлений с сервера
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFieldsets);
    activateElements(filterSelects);
    activateElements(filterFieldsets);
  };

  // Получение координат метки на карте
  var getCoordinatesPin = function (pin, widthPin, heightPin) {
    var offsetX = pin.offsetLeft + Math.round(widthPin / 2);
    var offsetY = pin.offsetTop + Math.round(heightPin);
    var coordinates = offsetX + ', ' + offsetY;
    return coordinates;
  };

  // Получение координат и запись в поле Адрес
  window.main.setCoordInAddress = function (pin, widthPin, heightPin) {
    var coordinates = getCoordinatesPin(pin, widthPin, heightPin);
    adAddress.value = coordinates;
  };

  // Деактивация страницы
  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    deactivateElements(adFieldsets);
    deactivateElements(filterSelects);
    deactivateElements(filterFieldsets);
    // Значения X и Y в поле Адрес при загрузке страницы (главная метка - без острого конца)
    window.main.setCoordInAddress(activationMapTrigger, WIDTH_MAIN_PIN_DEACTIVATE, WIDTH_MAIN_PIN_DEACTIVATE / 2);
  };

  // Удаление меток и карточек из разметки
  window.main.deletePinsCards = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
      cards[i].remove();
    }
  };

  // Возвращение страницы в неактивное состояние
  window.main.deactivatePageWithoutReload = function () {
    adForm.reset();
    window.main.deletePinsCards();
    deactivatePage();
    activationMapTrigger.style.left = window.main.mainPinCoord.x + 'px';
    activationMapTrigger.style.top = window.main.mainPinCoord.y + 'px';
    window.main.setCoordInAddress(activationMapTrigger, WIDTH_MAIN_PIN_DEACTIVATE, WIDTH_MAIN_PIN_DEACTIVATE / 2);
  };

  // Сообщение об успешной отправке данных на сервер и деактивация страницы
  var successLoadHandler = function () {
    var node = successTemplate.cloneNode(true);

    window.main.deactivatePageWithoutReload();
    window.data.main.prepend(node);
    var successMessage = document.querySelector('.success__message');

    var onDocumentClick = function (evt) {
      if (evt.target !== successMessage) {
        node.remove();
        document.removeEventListener('click', onDocumentClick);
      }
    };

    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        node.remove();
        document.removeEventListener('click', onDocumentKeydown);
      }
    };

    document.addEventListener('click', onDocumentClick); // Удаление окна успешной загрузки по клику
    document.addEventListener('keydown', onDocumentKeydown); // Удаление окна успешной загрузки по нажатию ESC
  };

  // Листенер на главную метку map__pin--main для активации страницы нажатием мышки
  activationMapTrigger.addEventListener('mousedown', function () {
    activateMap();
    window.main.setCoordInAddress(activationMapTrigger, window.map.PIN_MAIN_WIDTH, window.map.PIN_MAIN_HEIGHT);
  });

  // Листенер на главную метку map__pin--main для активации страницы нажатием Enter
  activationMapTrigger.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap();
      window.main.setCoordInAddress(activationMapTrigger, window.map.PIN_MAIN_WIDTH, window.map.PIN_MAIN_HEIGHT);
    }
  });

  deactivatePage();

  // Координаты главной метки при деактивированной странице
  window.main.mainPinCoord = {
    x: activationMapTrigger.offsetLeft,
    y: activationMapTrigger.offsetTop
  };

  // Отправка данных на сервер
  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      map.classList.add('map--faded'); // деактивация страницы
      successLoadHandler();
    }, window.data.errorHandler);
    evt.preventDefault();
  });

})();
