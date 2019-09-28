'use strict';

var typesOffer = ['palace', 'flat', 'house', 'bungalo'];
var timesOffer = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var offerTypeDictionary = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};

// Выбор случайного элемента массива
var getRandomElement = function (nameArray) {
  var element = nameArray[Math.floor(Math.random() * nameArray.length)];
  return element;
};

// Генерация случайных чисел (от min до max включительно)
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание массива 8 мок-объектов
var createArrayAd = function () {
  var AdArray = [];
  for (var i = 0; i <= 7; i++) {
    var Ad = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png',
      },
      offer: {
        title: 'Уютная квартира',
        address: '600, 350',
        price: 10000,
        type: getRandomElement(typesOffer),
        rooms: 3,
        guests: 2,
        checkin: getRandomElement(timesOffer),
        checkout: getRandomElement(timesOffer),
        features: ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'],
        description: 'Описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      location: {
        x: getRandomIntInclusive(1, 1200),
        y: getRandomIntInclusive(130, 630),
      },
    };
    AdArray.push(Ad);
  }
  return AdArray;
};

// Создание DOM-элемента на основе мок-объекта
var createPin = function (mockedAd) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = mockedAd.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = mockedAd.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = mockedAd.author.avatar;
  pinElement.querySelector('img').alt = mockedAd.offer.title;
  return pinElement;
};

// Создание блока DOM-элементов, которые будут встроены в разметку
var createFragmentPins = function () {
  var fragment = document.createDocumentFragment();
  var mockedAds = createArrayAd();
  for (var el = 0; el < mockedAds.length; el++) {
    fragment.appendChild(createPin(mockedAds[el]));
  }
  return fragment;
};

var cardTemplate = document.querySelector('#card')
    .content;

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
  for (var i = 0; i < ArrayAd[0].offer.features.length; i++) {
    var elementFeature = makeElement('li', 'popup__feature');
    elementFeature.classList.add('popup__feature--' + createArrayAd()[0].offer.features[i]);
    fragment.appendChild(elementFeature);
  }
  return fragment;
};

// Создание набора фотографий для карточки объявления createCard
var createFragmentPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ArrayAd[0].offer.photos.length; i++) {
    var elementPhoto = makeElement('img', 'popup__photo');
    elementPhoto.src = ArrayAd[0].offer.photos[i];
    elementPhoto.width = 45;
    elementPhoto.height = 40;
    elementPhoto.alt = 'Фотография жилья';
    fragment.appendChild(elementPhoto);
  }
  return fragment;
};

// Создание DOM-элемента - карточки объявления
var createCard = function (advertisement) {
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

// Создание массива и вставка карточки в разметку
var ArrayAd = createArrayAd();
var mapFilters = document.querySelector('.map__filters-container');
mapFilters.before(createCard(ArrayAd[0]));

// Поиск шаблона копируемого DOM-элемента
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// Временное решение - переключение карты в активное состояние (удаление класса)
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Вставка блока DOM-элементов в разметку
var pinBlock = document.querySelector('.map__pins');
pinBlock.appendChild(createFragmentPins());
