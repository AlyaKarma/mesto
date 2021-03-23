let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__open-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popupName = document.querySelector('.popup__input_type_name');
let popupProfession = document.querySelector('.popup__input_type_profession')
let nameProfile = document.querySelector('.profile__name');
let professionProfile = document.querySelector('.profile__profession');
let popupSave =document.querySelector('.popup__save');

function openPopup() {
  popup.classList.add('popup_visible');
}

function closePopup() {
  popup.classList.remove('popup_visible');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  closePopup();
}

popupSave.addEventListener('click', formSubmitHandler);

popupOpenBtn.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  openPopup();
})

popupCloseBtn.addEventListener('click', closePopup);
