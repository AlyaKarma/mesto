import './index.css';
import {
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


// _______________Валидация

const popupProfileValidator = new FormValidator(parameters, popupProfileForm);
popupProfileValidator.enableValidation();
const popupAddValidator = new FormValidator(parameters, popupAddForm);
popupAddValidator.enableValidation();


// _______________Модальное окно профиля

const userInfoHandler = new UserInfo({nameSelector: '.profile__name', professionSelector: '.profile__profession'});
const popupProfileHandler = new PopupWithForm('#popupProfile', handleProfileSubmit);
popupProfileHandler.setEventListeners();

function SetInfoProfile() {
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
  SetInfoProfile();
});

//_________________Модальное окно изображений

const popupImageHandler = new PopupWithImage('#popupImg');
popupImageHandler.setEventListeners();
export const handleCardClick = (name, link) => {
  popupImageHandler.openPopup(name, link);
}

//_________________Модальное окно добавления карточки

const popupAddHandler = new PopupWithForm('#popupAdd', handleAddCardSubmit);
popupAddHandler.setEventListeners();

function handleAddCardSubmit (items) {
  section.addItem(createNewCard(items, '.card__template'))
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


initialCards.reverse();

const section = new Section ({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createNewCard(item, '.card__template'))
  }
}, '.card__list');

section.renderItems();

