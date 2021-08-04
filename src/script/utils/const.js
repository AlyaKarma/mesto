const popupProfileForm = document.querySelector('#popupProfile');
const popupName = popupProfileForm.querySelector('#sign-name');
const popupProfession = popupProfileForm.querySelector('#sign-profession')

const popupAddForm = document.querySelector('#popupAdd');

const popupImg = document.querySelector('#popupImg');

const popupAvatar = document.querySelector('#popupAddAvatar');
const avatar = document.querySelector('.profile__avatar');

const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error_active',
}

export {
  popupProfileForm,
  popupName,
  popupProfession,
  popupAddForm,
  popupImg,
  parameters,
  popupAvatar,
  avatar
}

