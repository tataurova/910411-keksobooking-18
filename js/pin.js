'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin') // Поиск шаблона копируемого DOM-элемента
    .content
    .querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // Создание pin-элемента на основе загруженных данных
  window.pin.createPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

})();
