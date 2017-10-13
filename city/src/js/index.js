$(document).ready(function () {

  (function ($) {
    $(function () {

      $('input, select').styler({
        selectPlaceholder: "Select your country"
      });


    });
  })(jQuery);

//modal

  $(".desc__list-item").on('click', (function () {
    $("#myModal").modal('show');
  }));

//fullscreen

  $('.cards__desc-header-fullscreen').on('click', function () {
    $(this).next().toggleClass('cards__desc-text_active');
  })


});


let form = document.querySelector('.form');
let inputEmail = form.querySelector('.header__form-input_email');
let inputName = form.querySelector('.header__form-input_name');
let errorEmail = form.querySelector('.error-email');
let errorName = form.querySelector('.error-name');
let errorSelect = form.querySelector('.error-select');
let errorCheckbox = form.querySelector('.error-checkbox');
let crossEmail = form.querySelector('.form__block-email .form__block-cross');
let crossName = form.querySelector('.form__block-name .form__block-cross');
let placeholderEmail = form.querySelector('.form__block-email .form__block-placeholder');
let placeholderName = form.querySelector('.form__block-name .form__block-placeholder');
let checkboxValidate = form.querySelector('#check');
let selectValidate = form.querySelector('.header__form-select');
let select = form.querySelector('.jq-selectbox__select');
let checkbox = form.querySelector('.jq-checkbox');

let emailValidate = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
let nameValidate = /^[-a-zA-ZА-Яа-я ]+$/;


form.addEventListener('submit', function (e) {
  let bError = false;

  if (!(emailValidate.test(inputEmail.value))) {
    crossEmail.classList.add('form__block-cross_active');
    placeholderEmail.classList.add('form__block-placeholder_active');
    inputEmail.classList.add('header__form-input_active');
    errorEmail.style.display = 'block';
    bError = true;
  } else {
    crossEmail.classList.remove('form__block-cross_active');
    placeholderEmail.classList.remove('form__block-placeholder_active');
    inputEmail.classList.remove('header__form-input_active');
    errorEmail.style.display = 'none';

  }
  if (!(nameValidate.test(inputName.value))) {
    crossName.classList.add('form__block-cross_active');
    placeholderName.classList.add('form__block-placeholder_active');
    inputName.classList.add('header__form-input_active');
    errorName.style.display = 'block';
    bError = true;
  } else {
    crossName.classList.remove('form__block-cross_active');
    placeholderName.classList.remove('form__block-placeholder_active');
    inputName.classList.remove('header__form-input_active');
    errorName.style.display = 'none';

  }


  if (selectValidate.options[selectValidate.selectedIndex].value == "") {
    errorSelect.style.display = 'block';
    bError = true;
  }else{
    errorSelect.style.display = 'none';

  }

  if (checkboxValidate.checked===false) {
    errorCheckbox.style.display = 'block';
    bError = true;
  }else{
    errorCheckbox.style.display = 'none';
  }

  if (bError) {
    e.preventDefault();
  }

});



