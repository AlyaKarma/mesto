import {Card} from './Card.js';
import {initialCards} from './initialCards.js';

const popupProfile = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
export const popupImg = document.querySelector('.popup_type_img');

const popupOpenProfile = document.querySelector('.profile__open-btn');
const popupOpenAdd = document.querySelector('.profile__open-add');

const popupCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const popupCloseAdd = document.querySelector('.popup__close-btn_type_add')
const popupCloseImg = document.querySelector('.popup__close-btn_type_img');

const popupInput = document.querySelector('.popup__input');
const popupSaveInfo = document.querySelector('#saveInfo');
const popupSaveCard = document.querySelector('#saveCard');
const popupSaveDisabled = document.querySelector('.popup__save_disabled');

const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession')
const popupTitle = document.querySelector('.popup__input_type_title');
const popupLink = document.querySelector('.popup__input_type_link');
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');

const popupFormProfile = document.querySelector('.popup__form_type_profile');
const popupFormAdd = document.querySelector('.popup__form_type_add');

const cardList = document.querySelector('.card__list');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card__item');



export const popupImgPic = popupImg.querySelector('.popup__img');
export const popupImgTxt = popupImg.querySelector('.popup__caption');



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

function disableButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add(enableValidation.disabledButtonClass);
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

// const reverseCard = initialCards.reverse();

// reverseCard.forEach(item => {
//   insertCardItem(item);
// });

// function createCard(item) {
//   const listItem = cardTemplate.cloneNode(true); //создается DOM элемент карточки
//   const cardDelete = listItem.querySelector('.card__delete'); //в карточку вставляются данные и навешиваются обработчики
//   cardDelete.addEventListener('click', () => listItem.remove());

//   const cardLike = listItem.querySelector('.card__like-btn');
//   cardLike.addEventListener('click', (evt) => {
//     evt.target.classList.toggle('card__like-btn_active');
//   });


//   const cardImage = listItem.querySelector('.card__image');
//   const cardTitle = listItem.querySelector('.card__title');
//   cardImage.src = item.link;
//   cardImage.alt = 'Изображение';
//   cardTitle.textContent = item.name;
//   cardImage.addEventListener('click', imgClickHandler);
//   return listItem; //возвращается созданная карточка
// }


const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const item = {name: popupTitle.value, link: popupLink.value};
  insertCardItem(item);
  closePopup(popupAdd);
  popupFormAdd.reset();
  disableButton(popupSaveCard);
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
