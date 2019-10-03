'use strict';

var typesOffer = ['palace', 'flat', 'house', 'bungalo'];
var timesOffer = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 84;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var map = document.querySelector('.map');
var activationMapTrigger = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');
var adFieldsets = adForm.querySelectorAll('fieldset');
var filterSelects = mapFiltersForm.getElementsByTagName('select');
var filterFieldsets = mapFiltersForm.getElementsByTagName('fieldset');
var adAddress = adForm.querySelector('#address');
var roomsSelect = document.querySelector('#room_number');
var similarPinTemplate = document.querySelector('#pin') // Поиск шаблона копируемого DOM-элемента
    .content
    .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
    .content;
var priceForm = document.querySelector('#price');
var typeForm = document.querySelector('#type');
var minPriceDictionary = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0,
};
var timeCheckIn = document.querySelector('#timein');
var timeCheckOut = document.querySelector('#timeout');

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

// Деактивация элементов (для форм)
var deactivateElements = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = true;
  }
};

// Активация элементов (для форм)
var activateElements = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = false;
  }
};

// Активация страницы
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateElements(adFieldsets);
  activateElements(filterSelects);
  activateElements(filterFieldsets);
};

// Получение координат элемента
var getElementCoordinates = function (element) {
  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = element.getBoundingClientRect();
  var offsetX = elemRect.left - bodyRect.left;
  var offsetY = elemRect.top - bodyRect.top;
  var coordinates = {
    left: offsetX,
    top: offsetY
  };
  return coordinates;
};

// Ограничение выбора количества гостей для количества комнат
var validateRoomsGuests = function () {
  var roomsCapacityMap = {
    '1': {
      'guests': ['1'],
      'tipText': '1 комната для 1 гостя'
    },
    '2': {
      'guests': ['1', '2'],
      'tipText': '2 комнаты для 1 и 2 гостей'
    },
    '3': {
      'guests': ['1', '2', '3'],
      'tipText': '3 комнаты для 1, 2 и 3 гостей'
    },
    'any': {
      'guests': ['any'],
      'tipText': '100 комнат не для гостей'
    },
  };

  var rooms = roomsSelect.value;
  var guests = document.querySelector('#capacity').value;

  if (roomsCapacityMap[rooms].guests.includes(guests)) {
    roomsSelect.setCustomValidity('');
  } else {
    roomsSelect.setCustomValidity(roomsCapacityMap[rooms].tipText);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  adCard.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  adCard.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Листенеры на метки для отображения карточки
var openCardforPin = function () {
  for (var i = 0; i < pinsMap.length; i++) {
    var cardOpen = pinsMap[i];
    cardOpen.addEventListener('click', function () {
      openPopup();
    });
    cardOpen.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopup();
      }
    });
  }
};

// Изменение min значения цены в разметке в зависимости от типа жилья
var changeMinPrice = function () {
  priceForm.min = minPriceDictionary[typeForm.value];
  priceForm.placeholder = minPriceDictionary[typeForm.value];
};

// Время выезда
var changeTimeCheckOut = function () {
  timeCheckOut.value = timeCheckIn.value;
};

// Время заезда
var changeTimeCheckIn = function () {
  timeCheckIn.value = timeCheckOut.value;
};

// Создание массива и вставка карточки в разметку
var ArrayAd = createArrayAd();
var mapFilters = document.querySelector('.map__filters-container');
mapFilters.before(createCard(ArrayAd[0]));
var adCard = document.querySelector('.map__card');
adCard.classList.add('hidden');

// Вставка блока DOM-элементов в разметку
var pinBlock = document.querySelector('.map__pins');
pinBlock.appendChild(createFragmentPins());

// Листенер на главную метку map__pin--main для активации страницы нажатием мышки
activationMapTrigger.addEventListener('mousedown', function () {
  activateMap();
  var left = getElementCoordinates(activationMapTrigger).left + Math.round(PIN_MAIN_WIDTH / 2);
  var top = getElementCoordinates(activationMapTrigger).top + PIN_MAIN_HEIGHT;
  // вызов метода, который устанавливает значения поля ввода адреса
  adAddress.value = left + ', ' + top;
});

// Листенер на главную метку map__pin--main для активации страницы нажатием Enter
activationMapTrigger.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
  adAddress.value = getElementCoordinates(activationMapTrigger).offsetX + ', '
  + getElementCoordinates(activationMapTrigger).offsetY;
});

// Валидация количества комнат для количества гостей
roomsSelect.addEventListener('change', validateRoomsGuests);

// Деактивация страницы
map.classList.add('map--faded');
adForm.classList.add('ad-form--disabled');
deactivateElements(adFieldsets);
deactivateElements(filterSelects);
deactivateElements(filterFieldsets);

var popupClose = document.querySelector('.popup__close');

// Листенер для закрытия карточки по клику
popupClose.addEventListener('click', function () {
  closePopup();
});

// Листенер для закрытия карточки по нажатию ESC
popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Запуск функции с листенерами на метках карты для открытия карточки
var pinsMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
openCardforPin();

typeForm.addEventListener('change', function () {
  changeMinPrice();
});

// Листенер на изменение времени заезда
timeCheckIn.addEventListener('change', function () {
  changeTimeCheckOut();
});

// Листенер на изменение времени выезда
timeCheckOut.addEventListener('change', function () {
  changeTimeCheckIn();
});
