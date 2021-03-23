let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile_open_btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popupOverlay = document.querySelector('.popup__overlay');
let popupName = document.querySelector('.popup__input_type_name');
let popupProfession = document.querySelector('.popup__input_type_profession')
let nameProfile = document.querySelector('.profile__name');
let professionProfile = document.querySelector('.profile__profession');

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
}

popupOpenBtn.addEventListener('click', function() {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  openPopup();
})

popupCloseBtn.addEventListener('click', closePopup);
