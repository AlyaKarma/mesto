const lviv = new URL('../../images/lviv.jpeg', import.meta.url);
const brussels = new URL('../../images/brussels.jpeg', import.meta.url);
const milan = new URL('../../images/milan.jpeg', import.meta.url);
const vienna = new URL('../../images/vienna.jpeg', import.meta.url);
const budapest = new URL('../../images/budapest.jpeg', import.meta.url);
const paris = new URL('../../images/paris.jpeg', import.meta.url);

const initialCards = [
  {
    name: 'Львов',
    link: lviv
  },
  {
    name: 'Брюссель',
    link: brussels
  },
  {
    name: 'Милан',
    link: milan
  },
  {
    name: 'Вена',
    link: vienna
  },
  {
    name: 'Будапешт',
    link: budapest
  },
  {
    name: 'Париж',
    link: paris
  }
];

export {
  initialCards
};
