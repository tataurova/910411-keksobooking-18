'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin') // Поиск шаблона копируемого DOM-элемента
    .content
    .querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // Создание pin-элемента на основе мок-объекта
  var createPin = function (mockedAd) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = mockedAd.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = mockedAd.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = mockedAd.author.avatar;
    pinElement.querySelector('img').alt = mockedAd.offer.title;
    return pinElement;
  };

  // Создание блока pin-элементов, которые будут встроены в разметку
  window.createFragmentPins = function () {
    var fragment = document.createDocumentFragment();
    var mockedAds = window.data.ArrayAd;
    for (var el = 0; el < mockedAds.length; el++) {
      fragment.appendChild(createPin(mockedAds[el]));
    }
    return fragment;
  };
})();
