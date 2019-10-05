'use strict';

(function () {
  var typesOffer = ['palace', 'flat', 'house', 'bungalo'];
  var timesOffer = ['12:00', '13:00', '14:00'];

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

  // Создание массива мок-данных
  var ArrayAd = createArrayAd();
  window.data = {
    ArrayAd: ArrayAd
  };
})();
