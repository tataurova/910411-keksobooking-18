'use strict';

(function () {
  var MAX_WIDTH_MAP = 1200;
  var MIN_COORD_Y = 130;
  var MAX_COORD_Y = 630;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 84;
  window.map = {
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT
  };
  // Листенеры на метки для отображения карточки
  var openCardforPin = function () {
    for (var i = 0; i < pinsMap.length; i++) {
      var cardOpen = pinsMap[i];
      cardOpen.addEventListener('click', function () {
        openPopup();
      });
      cardOpen.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.main.ENTER_KEYCODE) {
          openPopup();
        }
      });
    }
  };

  var openPopup = function () {
    adCard.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.main.ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    adCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Создание массива и вставка карточки в разметку
  var mapFilters = document.querySelector('.map__filters-container');
  mapFilters.before(window.createCard(window.data.ArrayAd[0]));
  var adCard = document.querySelector('.map__card');
  adCard.classList.add('hidden');

  // Вставка блока pin-элементов в разметку
  var pinBlock = document.querySelector('.map__pins');
  pinBlock.appendChild(window.createFragmentPins());

  var popupClose = document.querySelector('.popup__close');

  // Листенер для закрытия карточки по клику
  popupClose.addEventListener('click', function () {
    closePopup();
  });

  // Листенер для закрытия карточки по нажатию ESC
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.main.ENTER_KEYCODE) {
      closePopup();
    }
  });

  // Запуск функции с листенерами на метках карты для открытия карточки
  var pinsMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  openCardforPin();

  // Перемещение главной метки
  window.main.activationMapTrigger.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoordX = window.main.activationMapTrigger.offsetLeft - shift.x;
      var currentCoordY = window.main.activationMapTrigger.offsetTop - shift.y;

      // Ограничение координаты X острой метки
      if (currentCoordX > -Math.round(PIN_MAIN_WIDTH / 2) & currentCoordX < MAX_WIDTH_MAP - Math.round(PIN_MAIN_WIDTH / 2)) {
        window.main.activationMapTrigger.style.left = currentCoordX + 'px';
      }

      // Ограничение координаты Y острой метки
      if (currentCoordY > (MIN_COORD_Y - PIN_MAIN_HEIGHT) & currentCoordY < (MAX_COORD_Y - PIN_MAIN_HEIGHT)) {
        window.main.activationMapTrigger.style.top = currentCoordY + 'px';
      }
      // Значения X и Y в поле Адрес при перемещении метки
      window.main.adAddress.value = window.getCoordinatesPin(window.main.activationMapTrigger, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          window.main.activationMapTrigger.removeEventListener('click', onClickPreventDefault);
        };
        window.main.activationMapTrigger.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
