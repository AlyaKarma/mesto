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

