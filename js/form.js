'use strict';

(function () {
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var typeForm = document.querySelector('#type');
  var timeCheckIn = document.querySelector('#timein');
  var timeCheckOut = document.querySelector('#timeout');
  var priceForm = document.querySelector('#price');
  var formReset = document.querySelector('.ad-form__reset');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var housingTypeValue = housingType.value;
  var housingPriceValue = housingPrice.value;
  var housingRoomsValue = housingRooms.value;
  var housingGuestsValue = housingGuests.value;
  var housingFeaturesValues = [];

  var MinPriceDictionary = {
    'PALACE': 10000,
    'FLAT': 1000,
    'HOUSE': 5000,
    'BUNGALO': 0
  };

  var RangePriceDictionary = {
    'LOW': [0, 10000],
    'MIDDLE': [10000, 50000],
    'HIGH': [50000, Infinity]
  };

  // Ограничение выбора количества гостей для количества комнат
  var validateRoomsGuests = function () {
    var RoomsCapacityMap = {
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
      '100': {
        'guests': ['0'],
        'tipText': '100 комнат не для гостей'
      },
    };

    var rooms = roomsSelect.value;
    var guests = document.querySelector('#capacity').value;
    if (RoomsCapacityMap[rooms].guests.includes(guests)) {
      roomsSelect.setCustomValidity('');
    } else {
      console.log (RoomsCapacityMap[rooms].tipText);
      roomsSelect.setCustomValidity(RoomsCapacityMap[rooms].tipText);
    }
  };

  // Изменение min значения цены в разметке в зависимости от типа жилья
  var changeMinPrice = function () {
    priceForm.min = MinPriceDictionary[typeForm.value.toUpperCase()];
    priceForm.placeholder = MinPriceDictionary[typeForm.value.toUpperCase()];
  };

  // Время выезда
  var changeTimeCheckOut = function () {
    timeCheckOut.value = timeCheckIn.value;
  };

  // Время заезда
  var changeTimeCheckIn = function () {
    timeCheckIn.value = timeCheckOut.value;
  };

  // Фильтрация объявлений
  var filterAds = function () {
    var filteredEl = window.data.allAdsFromServer;

    if (housingTypeValue !== 'any') {
      filteredEl = window.data.allAdsFromServer.filter(function (el) {
        return el.offer.type === housingTypeValue;
      });
    }

    if (housingPriceValue !== 'any') {
      var minPrice = RangePriceDictionary[housingPriceValue.toUpperCase()][0];
      var maxPrice = RangePriceDictionary[housingPriceValue.toUpperCase()][1];
      filteredEl = filteredEl.filter(function (el) {
        return (el.offer.price >= minPrice && el.offer.price < maxPrice);
      });
    }

    if (housingRoomsValue !== 'any') {
      filteredEl = filteredEl.filter(function (el) {
        return el.offer.rooms === Number(housingRoomsValue);
      });
    }

    if (housingGuestsValue !== 'any') {
      filteredEl = filteredEl.filter(function (el) {
        return el.offer.guests === Number(housingGuestsValue);
      });
    }

    filteredEl = filteredEl.filter(function (el) {
      var inAdFeatures = function (element) {
        return el.offer.features.includes(element);
      };
      var result = housingFeaturesValues.every(inAdFeatures);
      return result;
    });

    return filteredEl;
  };

  // Отображение новых отфильтрованных объявлений
  var updateAds = window.debounce(function () {
    var filteredEl = filterAds(); // фильтруем элементы
    window.main.deletePinsCards(); // удаляем пины и карточки
    window.data.renderPinsCards(filteredEl); // создаем из отфильтрованного массива новые пины и карточки
  });

  // Создание массива с отмеченными чекбоксами
  var getSelectedFeatures = function () {
    var selectedFeatures = [];
    var featuresCheckboxes = document.querySelectorAll('input[name=features]:checked');
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      selectedFeatures.push(featuresCheckboxes[i].value);
    }
    return selectedFeatures;
  };

  // Валидация количества комнат для количества гостей
  roomsSelect.addEventListener('change', validateRoomsGuests);
  guestsSelect.addEventListener('change', validateRoomsGuests);

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

  // Листенер - фильтрация на изменение типа жилья
  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value; // фиксируем выбранное значение
    updateAds();
  });

  // Листенер - фильтрация на изменение стоимости жилья
  housingPrice.addEventListener('change', function () {
    housingPriceValue = housingPrice.value;
    updateAds();
  });

  // Листенер - фильтрация на изменение количества комнат
  housingRooms.addEventListener('change', function () {
    housingRoomsValue = housingRooms.value;
    updateAds();
  });

  // Листенер - фильтрация на изменение количества гостей
  housingGuests.addEventListener('change', function () {
    housingGuestsValue = housingGuests.value;
    updateAds();
  });

  // Листенер - фильтрация на изменение опций жилья (wifi, кондиционер и т.п.)
  housingFeatures.addEventListener('click', function () {
    housingFeaturesValues = getSelectedFeatures();
    updateAds();
  });

  formReset.addEventListener('click', window.main.deactivatePageWithoutReload);

})();
