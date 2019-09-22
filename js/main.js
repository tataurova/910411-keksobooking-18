'use strict';

var typesOffer = ['palace', 'flat', 'house', 'bungalo'];
var timesOffer = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// Временное решение - переключение карты в активное состояние (удаление класса)
var map = document.querySelector('.map');;
map.classList.remove('map--faded');


// Выбор случайного элемента массива
var getRandomElementArray = function (nameArray) {
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
        avatar: 'img/avatars/user0' + [i + 1] + '.png',
      },
      offer: {
        title: 'Уютная квартира',
        address: '600, 350',
        price: 10000,
        type: getRandomElementArray(typesOffer),
        rooms: 3,
        guests: 2,
        checkin: getRandomElementArray(timesOffer),
        checkout: getRandomElementArray(timesOffer),
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

// Изменение свойств мок-объекта
var renderPin = function () {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = createArrayAd()[i].location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = createArrayAd()[i].location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = createArrayAd()[i].author.avatar;
  pinElement.querySelector('img').alt = createArrayAd()[i].offer.title;
  return pinElement;
};

// Поиск шаблона копируемого объекта - метки
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// Создание блока объектов - меток, которые будут встроены в карту
var fragment = document.createDocumentFragment ();
for (var i = 0; i < createArrayAd().length; i++) {
  fragment.appendChild(renderPin());
};

// Вставка блока объектов - меток в разметку
var pinBlock = document.querySelector('.map__pins');
pinBlock.appendChild(fragment);
