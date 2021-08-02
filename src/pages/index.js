import './index.css';
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
import Api from '../script/components/Api';



// _______________Валидация

const popupProfileValidator = new FormValidator(parameters, popupProfileForm);
popupProfileValidator.enableValidation();
const popupAddValidator = new FormValidator(parameters, popupAddForm);
popupAddValidator.enableValidation();


// _______________Модальное окно профиля

const userInfoHandler = new UserInfo({nameSelector: '.profile__name', professionSelector: '.profile__profession', avatarSelector: '.profile__avatar'});
const popupProfileHandler = new PopupWithForm('#popupProfile', handleProfileSubmit);
popupProfileHandler.setEventListeners();

function setInfoProfile() {
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
  setInfoProfile();
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
  api.addNewCard(items)
  .then((res) => {
    section.addItem(res);
    popupAddHandler.closePopup();
  })
  // section.addItem(createNewCard(items, '.card__template'))
  // popupAddHandler.closePopup();
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



const prependNewCard = (item, container) => {
  container.prepend(createNewCard(item, '.card__template'))
}

const section = new Section({renderer: prependNewCard}, '.card__list');


const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: '166d82c1-8e93-4726-8a90-1ae34485434b',
    'Content-Type': 'application/json'
  }
})


Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userInfo, defaultCards]) => {
  getUserData(userInfo);
  const reversedCards = defaultCards.reverse();
  section.renderItems(reversedCards)
})
.catch(error => console.log(error));

function getUserData(data) {
  userInfoHandler.setUserInfo(data);
  userInfoHandler.setUserAvatar(data);
}


