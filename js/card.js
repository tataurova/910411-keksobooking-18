'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content;
  var offerTypeDictionary = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
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
  var createFragmentFeatures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.ArrayAd[0].offer.features.length; i++) {
      var elementFeature = makeElement('li', 'popup__feature');
      elementFeature.classList.add('popup__feature--' + window.data.ArrayAd[0].offer.features[i]);
      fragment.appendChild(elementFeature);
    }
    return fragment;
  };

  // Создание набора фотографий для карточки объявления createCard
  var createFragmentPhotos = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.ArrayAd[0].offer.photos.length; i++) {
      var elementPhoto = makeElement('img', 'popup__photo');
      elementPhoto.src = window.data.ArrayAd[0].offer.photos[i];
      elementPhoto.width = 45;
      elementPhoto.height = 40;
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
    price.insertAdjacentText = advertisement.offer.price;
    type.textContent = offerTypeDictionary[advertisement.offer.type];
    roomsAndGuests.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    checkinAndCheckout.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }

    features.appendChild(createFragmentFeatures());
    description.textContent = advertisement.offer.description;
    avatar.src = advertisement.author.avatar;
    photo.remove();
    photos.appendChild(createFragmentPhotos());
    return card;
  };
})();

