const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

const popupOpenBtn = document.querySelector('.profile__open-btn');
const popupOpenAdd = document.querySelector('.profile__open-add');

const popupCloseBtn = document.querySelector('.popup__close-btn');
const popupCloseAdd = document.querySelector('.popup__close-btn_type_add')
const popupCloseImg = document.querySelector('.popup__close-btn_type_img');

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

const reverseCard = initialCards.reverse();

const popupImgPic = popupImg.querySelector('.popup__img');
const popupImgTxt = popupImg.querySelector('.popup__caption');

const togglePopupVisible = (modal) =>  modal.classList.toggle('popup_visible');


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
  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
  });

  const imgClickHandler = (evt) => {
    popupImgPic.src = item.link;
    popupImgTxt.textContent = item.name;
    togglePopupVisible(popupImg);
  }

  cardImage.addEventListener('click', imgClickHandler);
}

const cards = reverseCard.forEach(item => {
  insertCardItem(item);
});


const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();
  const item = {name: popupTitle.value, link: popupLink.value};
  insertCardItem(item);
  togglePopupVisible(popupAdd);
}


const formSubmitHandler = evt => {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  togglePopupVisible(popup);
}


popupForm.addEventListener('submit', formSubmitHandler);
popupFormAdd.addEventListener('submit', formSubmitHandlerAdd);


popupOpenBtn.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  togglePopupVisible(popup);
})


popupOpenAdd.addEventListener('click', function() {
  togglePopupVisible(popupAdd);
})

popupCloseBtn.addEventListener('click', () => togglePopupVisible(popup));

popupCloseAdd.addEventListener('click', () => togglePopupVisible(popupAdd));

popupCloseImg.addEventListener('click', () => togglePopupVisible(popupImg));
