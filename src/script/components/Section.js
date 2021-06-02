export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem() {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  addItem (items) {
    this._renderer(items, this._container);
  };
}
