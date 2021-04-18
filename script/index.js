const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

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

const reverseCard = initialCards.reverse();

const popupImgPic = popupImg.querySelector('.popup__img');
const popupImgTxt = popupImg.querySelector('.popup__caption');

const togglePopupVisible = (modal) =>  modal.classList.toggle('popup_visible');


const insertCardItem = (item) => {
  const listItem = createCard(item);
  const cardImage = listItem.querySelector('.card__image');
  const cardTitle = listItem.querySelector('.card__title');
  cardImage.src = item.link;
  cardImage.alt = 'Изображение';
  cardTitle.textContent = item.name;
  cardList.prepend(listItem);
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
    togglePopupVisible(popupImg);
  }

  const cardImage = listItem.querySelector('.card__image');
  cardImage.addEventListener('click', imgClickHandler);
  return listItem; //возвращается созданная карточка
}

reverseCard.forEach(item => {
  insertCardItem(item);
});


const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const item = {name: popupTitle.value, link: popupLink.value};
  insertCardItem(item);
  togglePopupVisible(popupAdd);
  popupFormAdd.reset();
}


const handleProfileSubmit = evt => {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  togglePopupVisible(popupProfile);
}

const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_visible');
    togglePopupVisible(activePopup);
  }
}

popupFormProfile.addEventListener('submit', handleProfileSubmit);
popupFormAdd.addEventListener('submit', handleCardSubmit);

popupOpenProfile.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  togglePopupVisible(popupProfile);
  document.addEventListener('keyup', handleEsc);

})

popupOpenAdd.addEventListener('click', function() {
  togglePopupVisible(popupAdd);
  document.addEventListener('keyup', handleEsc);
})

popupCloseProfile.addEventListener('click', () => {
  togglePopupVisible(popupProfile);
  document.removeEventListener('keyup', handleEsc);
});

popupProfile.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    togglePopupVisible(popupProfile);
  }
});

popupCloseAdd.addEventListener('click', () => {
  togglePopupVisible(popupAdd);
  document.removeEventListener('keyup', handleEsc);
});

popupAdd.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    togglePopupVisible(popupAdd);
  }
});

popupCloseImg.addEventListener('click', () => togglePopupVisible(popupImg));
