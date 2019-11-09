'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content;
  var OfferTypeDictionary = {
    'PALACE': 'Дворец',
    'FLAT': 'Квартира',
    'HOUSE': 'Дом',
    'BUNGALO': 'Бунгало',
  };

  // Создание элемента
  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  // Создание набора опций features для карточки объявления createCard
  var createFragmentFeatures = function (advertisement) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisement.offer.features.length; i++) {
      var elementFeature = makeElement('li', 'popup__feature');
      elementFeature.classList.add('popup__feature--' + advertisement.offer.features[i]);
      fragment.appendChild(elementFeature);
    }
    return fragment;
  };

  // Создание набора фотографий для карточки объявления createCard
  var createFragmentPhotos = function (advertisement) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisement.offer.photos.length; i++) {
      var elementPhoto = makeElement('img', 'popup__photo');
      elementPhoto.src = advertisement.offer.photos[i];
      elementPhoto.alt = 'Фотография жилья';
      fragment.appendChild(elementPhoto);
    }
    return fragment;
  };

  // Создание DOM-элемента - карточки объявления
  window.createCard = function (advertisement) {
    var card = cardTemplate.cloneNode(true);
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var roomsAndGuests = card.querySelector('.popup__text--capacity');
    var checkinAndCheckout = card.querySelector('.popup__text--time');
    var description = card.querySelector('.popup__description');
    var avatar = card.querySelector('.popup__avatar');
    var features = card.querySelector('.popup__features');
    var photos = card.querySelector('.popup__photos');
    var photo = card.querySelector('.popup__photo');
    title.textContent = advertisement.offer.title;
    address.textContent = advertisement.offer.address;
    price.textContent = '';
    price.insertAdjacentHTML('afterbegin', advertisement.offer.price + '₽<span>/ночь</span>');
    type.textContent = OfferTypeDictionary[advertisement.offer.type.toUpperCase()];
    roomsAndGuests.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    checkinAndCheckout.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }

    features.appendChild(createFragmentFeatures(advertisement));
    description.textContent = advertisement.offer.description;
    avatar.src = advertisement.author.avatar;
    photo.remove();
    photos.appendChild(createFragmentPhotos(advertisement));
    return card;
  };
})();
