'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const operationsTab = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

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

///////////////////////////////////////////////////////////////////////////////////
/// TABBED COMPONENT
///////////////////////////////////////////////////////////////////////////////////

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    //1- tab
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;
    operationsTab.forEach((tab) =>
      tab.classList.remove('operations__tab--active')
    );
    clicked.classList.add('operations__tab--active');

    //2-content
    operationsContent.forEach((content) =>
      content.classList.remove('operations__content--active')
    );
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });

//////////////////////////////////////////////////////////////////////////////////
// Adding effects for the Nav
//////////////////////////////////////////////////////////////////////////////////

const navHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    navLinks.forEach((el) => {
      if (el !== e.target) {
        el.style.opacity = this;
      }
    });
    nav.querySelector('img').style.opacity = this;
  }
};

nav.addEventListener('mouseover', navHover.bind(0.5));
nav.addEventListener('mouseout', navHover.bind(1));

////////////////////////////////////////////////////////////////////////////////////////// ADDING STICKY NAVIGATION //////////////
//////////////////////////////////////////////////////////////////////////////////////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const sticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////////////////////////////////////////////
//////// REVEAL SECTIONS //////////////////
////////////////////////////////////////////////////////////////////////////////////

const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////////////////////////////////////////////
///// LAZY LOAD IMAGES ///////////
/////////////////////////////////////////////////////////////////////////////////

const imgs = document.querySelectorAll('img[data-src]');

const imgLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgs.forEach((img) => imgObserver.observe(img));
