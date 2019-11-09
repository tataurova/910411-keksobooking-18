'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__input');
  var photoPreview = document.querySelector('.ad-form__photo');

  window.file = {
    avatarPreview: avatarPreview,
    photoPreview: photoPreview
  };

  var loadPhoto = function (input, preview) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.src) {
          preview.src = reader.result;
        } else {
          var photo = document.createElement('img');
          photo.classList.add('ad-form__img');
          photo.src = reader.result;
          photo.height = 40;
          photo.alt = 'Фотография жилья';
          photoPreview.prepend(photo);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    loadPhoto(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    loadPhoto(photoChooser, photoPreview);
  });

})();
