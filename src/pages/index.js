import './index.css';
import {
  popupProfileForm,
  popupName,
  popupProfession,
  popupAddForm,
  popupAvatar,
  avatar,
  parameters
} from '../script/utils/const.js';
import FormValidator from '../script/components/FormValidator.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithConfirm from '../script/components/PopupWithConfirm';
import UserInfo from '../script/components/UserInfo.js';
import Section from '../script/components/Section.js';
import Card from '../script/components/Card.js';
import Api from '../script/components/Api';

let cardElement = null;


// _______________Валидация

const popupProfileValidator = new FormValidator(parameters, popupProfileForm);
popupProfileValidator.enableValidation();
const popupAddValidator = new FormValidator(parameters, popupAddForm);
popupAddValidator.enableValidation();
const popupAvatarValidator = new FormValidator(parameters, popupAvatar);
popupAvatarValidator.enableValidation();


// _______________Изменение надписи на кнопках

const toggleButtonText = (popupHandler, isTrue) => {
  if (!isTrue)
  {
    popupHandler.changeButtonText('Сохранение...');
  } else {
    if (popupHandler === popupAddHandler)
    {
      popupHandler.changeButtonText('Создать');
    } else {
      popupHandler.changeButtonText('Сохранить');
    }
  }
}

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
  toggleButtonText(popupProfileHandler, false);
  api.updateUserData(newInfo)
  .then(() => {
    userInfoHandler.setUserInfo(newInfo);
    popupProfileHandler.closePopup();
  })
  .catch(error => console.log(error))
  .finally(() => {
    toggleButtonText(popupProfileHandler, true);
  });
};


document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  popupProfileValidator.deleteErrors();
  popupProfileHandler.openPopup();
  setInfoProfile();
});


// _______________Модальное окно для смены аватара

const popupAvatarHandler = new PopupWithForm('#popupAddAvatar', submitFormHandlerAvatar);
popupAvatarHandler.setEventListeners();
//отправка формы
function submitFormHandlerAvatar() {
  toggleButtonText(popupAvatarHandler, false);
  api.changeAvatar(document.querySelector('.popup__avatar_link').value)
  .then((res => {
    avatar.src = res.avatar;
    popupAvatarHandler.closePopup();
  }))
  .catch(error => console.log(error))
  .finally(() => {
    toggleButtonText(popupAvatarHandler, true);
  });
}
//выбор элементов для открытия модалки с аватаром
const avatarPopupElements = (evt) => {
  if (evt.target.classList.contains('profile__avatar_edit-btn') || evt.target.classList.contains('profile__avatar_overlay'))
  {
    popupAvatarValidator.deleteErrors();
    popupAvatarValidator.disableButtonSubmit();
    popupAvatarHandler.openPopup();
  }
}
//слушатели открытия модалки по кнопке
document.querySelector('.profile__avatar_container').addEventListener('mousedown', avatarPopupElements);

//_________________Модальное окно изображений

const popupImageHandler = new PopupWithImage('#popupImg');
popupImageHandler.setEventListeners();
const handleCardClick = (name, link) => {
  popupImageHandler.openPopup(name, link);
}

//_________________Модальное окно добавления карточки

const popupAddHandler = new PopupWithForm('#popupAdd', handleAddCardSubmit);
popupAddHandler.setEventListeners();

function handleAddCardSubmit (items) {
  toggleButtonText(popupAddHandler, false);
  api.addNewCard(items)
  .then((res) => {
    section.addItem(res);
    popupAddHandler.closePopup();
  })
  .catch(error => console.log(error))
  .finally(() => {
    toggleButtonText(popupAddHandler, true);
  });
};

document.querySelector('.profile__open-add').addEventListener('click', function () {
  popupAddValidator.deleteErrors();
  popupAddValidator.disableButtonSubmit();
  popupAddHandler.openPopup();
});

//__________________Модальное окно для удаления карточек

const popupConfirmHandler = new PopupWithConfirm('#popupConfirm', submitConfirmFormHandler);
popupConfirmHandler.setEventListeners();
//отправка формы
function submitConfirmFormHandler (id) {
  api.deleteCard(id)
  .then(() => {
    cardElement.deleteCard();
    popupConfirmHandler.closePopup();
  })
  .catch(error => console.log(error));
}

//__________________Создание карточки

const createNewCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector, handleCardClick,
    () => {
      cardElement = card;
      handleSendLike(item, cardElement);
    },
    () => {
      cardElement = card;
      handleDeleteLike(item, cardElement)
    },
    () => {
      cardElement = card;
      popupConfirmHandler.openPopup(card.getId());
    });
  const cardElem = card.createCard();

  return cardElem;
};

const prependNewCard = (item, container) => {
  container.prepend(createNewCard(item, '.card__template'))
}

const section = new Section({renderer: prependNewCard}, '.card__list');


//__________________Работа с API

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

//получение данных о пользователе
function getUserData(data) {
  userInfoHandler.setUserInfo(data);
  userInfoHandler.setUserAvatar(data);
}

//установка лайка
const handleSendLike = (data, card) => {
  api.likesCard('PUT', data._id)
  .then((res) => {card.countLikes(res.likes.length)})
  .catch(error => console.log(error))
}
//удаление лайка
const handleDeleteLike = (data, card) => {
  api.likesCard('DELETE', data._id)
  .then((res) => {card.countLikes(res.likes.length)})
  .catch(error => console.log(error))
}
