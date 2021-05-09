import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';


const popupProfile = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
export const popupImg = document.querySelector('.popup_type_img');

const popupOpenProfile = document.querySelector('.profile__open-btn');
const popupOpenAdd = document.querySelector('.profile__open-add');

const popupCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const popupCloseAdd = document.querySelector('.popup__close-btn_type_add')
const popupCloseImg = document.querySelector('.popup__close-btn_type_img');


const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession')
const popupTitle = document.querySelector('.popup__input_type_title');
const popupLink = document.querySelector('.popup__input_type_link');
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');

const popupFormProfile = document.querySelector('.popup__form_type_profile');
const popupFormAdd = document.querySelector('.popup__form_type_add');

export const popupImgPic = popupImg.querySelector('.popup__img');
export const popupImgTxt = popupImg.querySelector('.popup__caption');

const cardList = document.querySelector('.card__list');


const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error_active',
}

const popupProfileValidator = new FormValidator(parameters, popupProfile);
const popupAddValidator = new FormValidator(parameters, popupAdd);



popupProfileValidator.enableValidation();
popupAddValidator.enableValidation();

export const openPopup = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keyup', handleEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keyup', handleEsc);
};

const insertCardItem = (item) => {
  const listItem = createCard(item, '.card__template');

  cardList.prepend(listItem);
}


const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector);
  const cardElement = card.createCard();

  return cardElement;
}

initialCards.reverse();

initialCards.forEach(item => {
  insertCardItem(item);
});


const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const item = {name: popupTitle.value, link: popupLink.value};
  insertCardItem(item);
  closePopup(popupAdd);
  popupFormAdd.reset();
}


const handleProfileSubmit = evt => {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  closePopup(popupProfile);
}

const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_visible');
    closePopup(activePopup);
  }
}

popupFormProfile.addEventListener('submit', handleProfileSubmit);
popupFormAdd.addEventListener('submit', (evt) => {
  handleCardSubmit(evt);
});

popupOpenProfile.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  openPopup(popupProfile);
})

popupOpenAdd.addEventListener('click', function() {
  openPopup(popupAdd);
  popupAddValidator.disableButtonSubmit();
  document.addEventListener('keyup', handleEsc);
})

popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfile.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupProfile);
  }
});

popupCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

popupAdd.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupAdd);
  }
});

popupImg.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupImg);
  }
});

popupCloseImg.addEventListener('click', () => closePopup(popupImg));
