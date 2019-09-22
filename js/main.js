'use strict';

var typesOffer = ['palace', 'flat', 'house', 'bungalo'];
var timesOffer = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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
}

// Создание массива 8 мок-объектов
var createArrayAd = function () {
  var AdArray = [];
  for (var i = 0; i <= 7; i++) {
    console.log(i);
    var Ad = {
      author: {
//        avatar: 'img/avatars/user0' + [i + 1] + '.png',
        avatar: `img/avatars/user0${i + 1}.png`,
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
  };
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
