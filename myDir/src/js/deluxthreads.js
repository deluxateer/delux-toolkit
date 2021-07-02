// Styles
import '../styles/index.scss';

// JS
import './components/button';
import './components/form';
import './components/carousel';

import './base/lazy-load';
import './base/transition';

// Carousel functionality
// set carousel height to be the height of the largest testimonial card plus 2rem
const carousel = document.querySelector('.testimonials .carousel');
const slides = Array.from(document.querySelectorAll('.testimonial-card'));
const slideHeights = slides.map(slide => slide.offsetHeight);
const largestHeight = Math.max(...slideHeights);

carousel.style.height = `${largestHeight + 80}px`;

// Contact Form functionality
const form = document.querySelector('.contact-form');

const confirmMsg = 'Thank you for your submission';
const confirmEl = document.createElement('p');
confirmEl.innerText = confirmMsg;
confirmEl.style.cssText =
  'transition: all 0.5s; opacity: 0; visibility: 0; display: none; background-color: rgb(44, 162, 46); padding: 1rem; border: 1px solid #fff; border-radius: 0.15rem; margin-top: 1rem;';

form.parentNode.insertBefore(confirmEl, form);

form.addEventListener('submit', e => {
  e.preventDefault();
  form.reset();

  confirmEl.style.display = 'block';
  confirmEl.style.opacity = 1;
  confirmEl.style.visibility = 1;

  setTimeout(() => {
    confirmEl.style.opacity = 0;
    confirmEl.style.visibility = 0;

    setTimeout(() => {
      confirmEl.style.display = 'none';
    }, 500);
  }, 5000);
});
