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

  var openPopup = function (card) {
    var previousCard = document.querySelector('.map__card:not(.hidden)');
    if (previousCard) {
      previousCard.classList.add('hidden');
    }
    card.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.main.ESC_KEYCODE) {
        closePopup(card);
        extinguishPin();
      }
    });
  };

  var extinguishPin = function () {
    var previousPin = document.querySelector('.map__pin--active');
     if (previousPin) {
       previousPin.classList.remove('map__pin--active');
     }
  };

  var highlightPin = function (pin) {
    extinguishPin();
    pin.classList.add('map__pin--active');
  };

  window.map.openCardForPin = function (pin, card) {
    pin.addEventListener('click', function () {
      highlightPin(pin);
      openPopup(card);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.main.ENTER_KEYCODE) {
        highlightPin(pin);
        openPopup(card);
      }
    });
  };

  window.map.closeCard = function (closeElement, card) {
    closeElement.addEventListener('click', function () {
      closePopup(card);
      extinguishPin();
    });

    closeElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.main.ENTER_KEYCODE) {
        closePopup(card);
        extinguishPin();
      }
    });
  };

  var closePopup = function (card) {
    card.classList.add('hidden');
  };

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

      var currentX = window.main.activationMapTrigger.offsetLeft - shift.x;
      var currentY = window.main.activationMapTrigger.offsetTop - shift.y;

      // Ограничение координаты X острой метки
      if (currentX > -Math.round(PIN_MAIN_WIDTH / 2) & currentX < MAX_WIDTH_MAP - Math.round(PIN_MAIN_WIDTH / 2)) {
        window.main.activationMapTrigger.style.left = currentX + 'px';
      }

      // Ограничение координаты Y острой метки
      if (currentY > (MIN_COORD_Y - PIN_MAIN_HEIGHT) & currentY < (MAX_COORD_Y - PIN_MAIN_HEIGHT)) {
        window.main.activationMapTrigger.style.top = currentY + 'px';
      }
      // Значения X и Y в поле Адрес при перемещении метки
      window.main.setCoordInAddress(window.main.activationMapTrigger, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
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
