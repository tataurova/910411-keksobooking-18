'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var allAdsFromServer = [];
  var main = document.querySelector('main');
  window.data = {
    allAdsFromServer: allAdsFromServer,
    main: main
  };

  window.data.renderPinsCards = function (ads) {

    var fragment = document.createDocumentFragment();
    var pinBlock = document.querySelector('.map__pins');
    var mapFilters = document.querySelector('.map__filters-container');
    var takeNumber = ads.length > 5 ? 5 : ads.length;
    for (var i = 0; i < takeNumber; i++) {
      var card = window.createCard(ads[i]);
      fragment.appendChild(window.pin.createPin(ads[i])); // Записываем во фрагмент метки в цикле
      mapFilters.before(card); // Вставляем карточки в разметку в цикле

    }

    // Скрываем карточки присваиванием класса hidden
    var cards = document.querySelectorAll('.map__card');
    for (var el = 0; el < cards.length; el++) {
      cards[el].classList.add('hidden');
    }

    // Вставка блока pin-меток в разметку
    pinBlock.appendChild(fragment);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    // Запускаем листенеры для открытия и закрытия карточек
    var popupsClose = document.querySelectorAll('.popup__close');
    for (var j = 0; j < pins.length; j++) {
      window.map.openCardForPin(pins[j], cards[j]);
      window.map.closeCard(popupsClose[j], cards[j]);
    }
  };

  window.data.successHandler = function (ads) {
    window.data.allAdsFromServer = ads;
    window.data.renderPinsCards(window.data.allAdsFromServer);
  };

  window.data.errorHandler = function (errorMessage) {
    var node = errorTemplate.cloneNode(true);
    var error = node.querySelector('.error__message');
    var errorButton = node.querySelector('.error__button');
    error.textContent = errorMessage;
    main.prepend(node);
    document.addEventListener('click', function (evt) { // Удаление окна ошибки по клику
      if (evt.target !== error) {
        node.remove();
      }
    });
    document.addEventListener('keydown', function (evt) { // Удаление окна ошибки по нажатию ESC
      if (evt.keyCode === window.main.ESC_KEYCODE) {
        node.remove();
      }
    });
    errorButton.addEventListener('click', function () { // Удаление окна ошибки при нажатии на кнопку Попробовать снова
      node.remove();
    });

  };

})();
