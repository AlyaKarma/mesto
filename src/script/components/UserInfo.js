export default class UserInfo {
  constructor({nameSelector, professionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {userName: this._name.textContent, userProfession: this._profession.textContent};
  };

  setUserInfo = (newProfile) => {
    this._name.textContent = newProfile.name;
    this._profession.textContent = newProfile.about;
  };

  setUserAvatar = (newProfile) => {
    this._avatar.src = newProfile.avatar;
  }
}
