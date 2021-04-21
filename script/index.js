const popupProfile = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

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




const popupImgPic = popupImg.querySelector('.popup__img');
const popupImgTxt = popupImg.querySelector('.popup__caption');



const openPopupProfile = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keyup', handleEsc);
};

const closePopupProfile = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keyup', handleEsc);
};


const openPopupAdd = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keyup', handleEsc);
};

const closePopupAdd = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keyup', handleEsc);
};

const openPopupImg = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keyup', handleEsc);
};

const closePopupImg = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keyup', handleEsc);
};

const insertCardItem = (item) => {
  const listItem = createCard(item);

  cardList.prepend(listItem);
}

function disableButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__save_disabled');
}

function createCard(item) {
  const listItem = cardTemplate.cloneNode(true); //создается DOM элемент карточки
  const cardDelete = listItem.querySelector('.card__delete'); //в карточку вставляются данные и навешиваются обработчики
  cardDelete.addEventListener('click', () => listItem.remove());

  const cardLike = listItem.querySelector('.card__like-btn');
  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
  });

  const imgClickHandler = (evt) => {
    popupImgPic.src = item.link;
    popupImgPic.alt = 'Изображение';
    popupImgTxt.textContent = item.name;
    openPopupImg(popupImg);
  }

  const cardImage = listItem.querySelector('.card__image');
  const cardTitle = listItem.querySelector('.card__title');
  cardImage.src = item.link;
  cardImage.alt = 'Изображение';
  cardTitle.textContent = item.name;
  cardImage.addEventListener('click', imgClickHandler);
  return listItem; //возвращается созданная карточка
}


const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const item = {name: popupTitle.value, link: popupLink.value};
  insertCardItem(item);
  closePopupAdd(popupAdd);
  popupFormAdd.reset();
  disableButton(popupSaveCard);
}


const handleProfileSubmit = evt => {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  closePopupProfile(popupProfile);
}

const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_visible');
    closePopupProfile(activePopup);
  }
}

popupFormProfile.addEventListener('submit', handleProfileSubmit);
popupFormAdd.addEventListener('submit', (evt) => {
  handleCardSubmit(evt);
});

popupOpenProfile.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  openPopupProfile(popupProfile);
})

popupOpenAdd.addEventListener('click', function() {
  openPopupAdd(popupAdd);
  document.addEventListener('keyup', handleEsc);
})

popupCloseProfile.addEventListener('click', () => {
  closePopupProfile(popupProfile);
});

popupProfile.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopupProfile(popupProfile);
  }
});

popupCloseAdd.addEventListener('click', () => {
  closePopupAdd(popupAdd);
});

popupAdd.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopupAdd(popupAdd);
  }
});

popupCloseImg.addEventListener('click', () => closePopupImg(popupImg));
