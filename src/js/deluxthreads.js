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
