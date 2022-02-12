'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////////////////////////////////////////////
// Modal window
////////////////////////////////////////////////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////////////
//Scroll to functionality//
///////////////////////////////////////////////////////////////////////////

// 1 ----

learnMoreBtn.addEventListener('click', function (e) {
  // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, window.pageYOffset);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  const s1Coords = section1.getBoundingClientRect();
  // window.scroll(s1Coords.left, s1Coords.top + window.pageYOffset);

  // below is the old way of scrolling

  // window.scroll({
  //   left: s1Coords.left,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //New way of scrolling

  section1.scrollIntoView({ behavior: 'smooth' });
});

//2---

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id !== '#') {
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  }
});
