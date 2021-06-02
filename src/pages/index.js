import './index.css';
import {
  lviv,
  brussels,
  milan,
  vienna,
  budapest,
  paris,
  initialCards
} from '../script/utils/initialCards.js';
import {
  popupProfileForm,
  popupName,
  popupProfession,
  popupAddForm,
  popupImg,
  parameters
} from '../script/utils/const.js';
import FormValidator from '../script/components/FormValidator.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import UserInfo from '../script/components/UserInfo.js';
import Section from '../script/components/Section.js';
import Card from '../script/components/Card.js';


// const popupProfile = document.querySelector('.popup_type_profile');
// const popupAdd = document.querySelector('.popup_type_add');
// export const popupImg = document.querySelector('.popup_type_img');

// const popupOpenProfile = document.querySelector('.profile__open-btn');
// const popupOpenAdd = document.querySelector('.profile__open-add');


// const popupName = document.querySelector('.popup__input_type_name');
// const popupProfession = document.querySelector('.popup__input_type_profession')
// const popupTitle = document.querySelector('.popup__input_type_title');
// const popupLink = document.querySelector('.popup__input_type_link');
// const nameProfile = document.querySelector('.profile__name');
// const professionProfile = document.querySelector('.profile__profession');

// const popupFormProfile = document.querySelector('.popup__form_type_profile');
// const popupFormAdd = document.querySelector('.popup__form_type_add');

// export const popupImgPic = popupImg.querySelector('.popup__img');
// export const popupImgTxt = popupImg.querySelector('.popup__caption');

// const cardList = document.querySelector('.card__list');

// const popups = document.querySelectorAll('.popup');


// const parameters = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save',
//   disabledButtonClass: 'popup__save_disabled',
//   inputErrorClass: 'popup__input-error_active',
// }

// _______________Валидация

const popupProfileValidator = new FormValidator(parameters, popupProfileForm);
popupProfileValidator.enableValidation();
const popupAddValidator = new FormValidator(parameters, popupAddForm);
popupAddValidator.enableValidation();


// _______________Модальное окно профиля

const userInfoHandler = new UserInfo({nameSelector: '.profile__name', professionSelector: '.profile__profession'});
const popupProfileHandler = new PopupWithForm('#popupProfile', handleProfileSubmit);
popupProfileHandler.setEventListeners();

function infoProfile() {
  const getUserData = userInfoHandler.getUserInfo();
  popupName.value = getUserData.userName;
  popupProfession.value = getUserData.userProfession;
};

function handleProfileSubmit (newInfo) {
  userInfoHandler.setUserInfo(newInfo);
  popupProfileHandler.closePopup();
};

document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  popupProfileValidator.deleteErrors();
  popupProfileHandler.openPopup();
  infoProfile();
});

//_________________Модальное окно изображений

const popupImageHandler = new PopupWithImage('#popupImg');
export const handleCardClick = (name, link) => {
  popupImageHandler.openPopup(name, link);
  popupImageHandler.setEventListeners();
}

//_________________Модальное окно добавления карточки

const popupAddHandler = new PopupWithForm('#popupAdd', handleAddCardSubmit);
popupAddHandler.setEventListeners();

function handleAddCardSubmit (items) {
  section.addItem(items);
  popupAddHandler.closePopup();
};

document.querySelector('.profile__open-add').addEventListener('click', function () {
  popupAddValidator.deleteErrors();
  popupAddValidator.disableButtonSubmit();
  popupAddHandler.openPopup();
});


//__________________Создание карточки

const createNewCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
};

const insertCardItem = (item, container) => {
  container.prepend(createNewCard(item, '.card__template'));
};

initialCards.reverse();

const section = new Section ({
  items: initialCards,
  renderer: insertCardItem
}, '.card__list');

section.renderItem();

// export const handleCardClick = (name, link) => {
//   popupImgPic.src = link;
//   popupImgPic.alt = name;
//   popupImgTxt.textContent = name;
//   openPopup(popupImg);
// };

// export const openPopup = (popup) => {
//   popup.classList.add('popup_visible');
//   document.addEventListener('keyup', handleEsc);
// };

// const closePopup = (popup) => {
//   popup.classList.remove('popup_visible');
//   document.removeEventListener('keyup', handleEsc);
// };




// const createCard = (data, cardSelector) => {
//   const card = new Card(data, cardSelector, handleCardClick);
//   const cardElement = card.createCard();

//   return cardElement;
// };




// const handleCardSubmit = (evt) => {
//   evt.preventDefault();
//   const item = {name: popupTitle.value, link: popupLink.value};
//   insertCardItem(item);
//   closePopup(popupAdd);
//   popupFormAdd.reset();
// }


// const handleProfileSubmit = evt => {
//   evt.preventDefault();
//   nameProfile.textContent = popupName.value;
//   professionProfile.textContent = popupProfession.value;
//   closePopup(popupProfile);
// }

// const handleEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_visible');
//     closePopup(activePopup);
//   }
// }


// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//       if (evt.target.classList.contains('popup')) {
//         closePopup(popup)
//       }
//       if (evt.target.classList.contains('popup__close')) {
//         closePopup(popup)
//       }
//   });
// });

// popupFormProfile.addEventListener('submit', handleProfileSubmit);
// popupFormAdd.addEventListener('submit', (evt) => {
//   handleCardSubmit(evt);
// });

// popupOpenProfile.addEventListener('click', function() {
//   popupName.value = nameProfile.textContent;
//   popupProfession.value = professionProfile.textContent;
//   openPopup(popupProfile);
// })

// popupOpenAdd.addEventListener('click', function() {
//   openPopup(popupAdd);
//   popupAddValidator.disableButtonSubmit();
// })

