'use strict';

(function () {
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
})();
