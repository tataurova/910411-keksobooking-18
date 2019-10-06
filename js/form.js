'use strict';

(function () {
  var roomsSelect = document.querySelector('#room_number');
  var typeForm = document.querySelector('#type');
  var timeCheckIn = document.querySelector('#timein');
  var timeCheckOut = document.querySelector('#timeout');
  var priceForm = document.querySelector('#price');
  var minPriceDictionary = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0,
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

  // Валидация количества комнат для количества гостей
  roomsSelect.addEventListener('change', validateRoomsGuests);

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
})();
