const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupOpenBtn = document.querySelector('.profile__open-btn');
const popupOpenAdd = document.querySelector('.profile__open-add');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const popupCloseAdd = document.querySelector('.popup__close-btn_type_add')
const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession')
const popupTitle = document.querySelector('.popup__input_type_title');
const popupLink = document.querySelector('.popup__input_type_link');
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const popupForm = document.querySelector('.popup__form');
const popupFormAdd = document.querySelector('.popup__form_type_add');
const cardList = document.querySelector('.card__list');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card__item');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopup = () => {
  popup.classList.add('popup_visible');
}

const closePopup = () => {
  popup.classList.remove('popup_visible');
}

const openPopupAdd = () => {
  popupAdd.classList.add('popup_visible');
}

const closePopupAdd = () => {
  popupAdd.classList.remove('popup_visible');
}

const insertCardItem = (item) => {
  const listItem = cardTemplate.cloneNode(true);
  const cardImage = listItem.querySelector('.card__image');
  const cardTitle = listItem.querySelector('.card__title');
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardList.prepend(listItem);

  const cardDelete = listItem.querySelector('.card__delete');
  cardDelete.addEventListener('click', () => listItem.remove());

  const cardLike = listItem.querySelector('.card__like-btn');
  cardLike.addEventListener('click', () => {
    cardLike.classList.add('.card__like-btn_active');
  });
}

const cards = initialCards.forEach(item => {
  insertCardItem(item);
});


const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();
  const item = {name: popupTitle.value, link: popupLink.value};
  insertCardItem(item);
  closePopupAdd();
}


const formSubmitHandler = evt => {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  closePopup();
}


popupForm.addEventListener('submit', formSubmitHandler);
popupFormAdd.addEventListener('submit', formSubmitHandlerAdd);


popupOpenBtn.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  openPopup();
})

popupCloseBtn.addEventListener('click', closePopup);


popupOpenAdd.addEventListener('click', function() {
  openPopupAdd();
})

popupCloseAdd.addEventListener('click', closePopupAdd);
