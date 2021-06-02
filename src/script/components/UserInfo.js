export default class UserInfo {
  constructor({nameSelector, professionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo = () => {
    return {userName: this._name.textContent, userProfession: this._profession.textContent};
  };

  setUserInfo = (newProfile) => {
    this._name.textContent = newProfile.name;
    this._profession.textContent = newProfile.profession;
  };
}
