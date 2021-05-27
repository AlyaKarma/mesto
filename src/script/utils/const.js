const popupProfile = document.querySelector('.popup_type_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession')

const popupAdd = document.querySelector('.popup_type_add');

const popupImg = document.querySelector('.popup_type_img');

const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error_active',
}

export {
  popupProfile,
  popupName,
  popupProfession,
  popupAdd,
  popupImg,
  parameters
}

