'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var HTTP_RESPONSE_OK = 200;
  var METHOD_LOAD = 'GET';
  var METHOD_UPLOAD = 'POST';

  // Загрузка данных с сервера
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_RESPONSE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(METHOD_LOAD, URL_LOAD);
    xhr.send();
  };

  // Загрузка данных на сервер
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_RESPONSE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(METHOD_UPLOAD, URL_UPLOAD);
    xhr.send(data);
  };
})();
