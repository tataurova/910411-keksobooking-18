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
    for (var j = 0; j < cards.length; j++) {
      cards[j].classList.add('hidden');
    }

    // Вставка блока pin-меток в разметку
    pinBlock.appendChild(fragment);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    // Запускаем листенеры для открытия и закрытия карточек
    var popupsClose = document.querySelectorAll('.popup__close');
    for (var k = 0; k < pins.length; k++) {
      window.map.openCardForPin(pins[k], cards[k]);
      window.map.closeCard(popupsClose[k], cards[k]);
    }
  };

  window.data.successHandler = function (ads) {
    ads = ads.filter(function (ad) { // при отсутствии поля offer не отображаем объявление
      return ad.offer;
    });
    window.data.allAdsFromServer = ads;
    window.data.renderPinsCards(window.data.allAdsFromServer);
  };

  window.data.errorHandler = function (errorMessage) {
    var node = errorTemplate.cloneNode(true);
    var error = node.querySelector('.error__message');
    var errorButton = node.querySelector('.error__button');
    error.textContent = errorMessage;
    main.prepend(node);

    var onDocumentClick = function (evt) {
      if (evt.target !== error) {
        node.remove();
        window.main.deactivatePageWithoutReload();
        document.removeEventListener('click', onDocumentClick);
      }
    };

    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === window.main.ESC_KEYCODE) {
        node.remove();
        window.main.deactivatePageWithoutReload();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    document.addEventListener('click', onDocumentClick); // Удаление окна ошибки по клику
    document.addEventListener('keydown', onDocumentKeydown); // Удаление окна ошибки по нажатию ESC

    errorButton.addEventListener('click', function () { // Удаление окна ошибки при нажатии на кнопку Попробовать снова
      node.remove();
    });

  };

})();
