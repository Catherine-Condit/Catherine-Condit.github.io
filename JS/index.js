window.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".Navbar");
    navbar.classList.remove("hidden");
    navbar.classList.add("slide-in");
  });

// Scroll-based animation trigger
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Slideshow
let currentIndex = 0;
const slides = document.querySelectorAll('.mySlides');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    const track = document.getElementById('Slideshow_Track');
    const slide = slides[0];
    const slideWidth = slide.offsetWidth;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = index * (slideWidth + gap);

    // Center the slide
    track.style.transform = `translateX(calc(50vw - ${offset + slideWidth / 2}px))`;

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active');
        }
    });

    currentIndex = index;
}


function nextSlide() {
    showSlide((currentIndex + 1) % totalSlides);
}

function currentSlide(index) {
    showSlide(index);
    resetInterval();
}

function startSlideshow() {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

window.onload = startSlideshow;
window.onresize = () => showSlide(currentIndex); // recenter on resize


/*dark light mode switch*/
const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Load preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.setAttribute('data-theme', 'light');
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });

/*navbar scroll*/
const navLinks = document.querySelectorAll('.Navbar a');
const sections = document.querySelectorAll('section[id]');

// Click-based active switch
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Scroll-based active switch
window.addEventListener('scroll', () => {
  // === Fade out hero content ===
  const hero = document.querySelector('.hero');
  const content = document.querySelector('.hero-content');
  if (hero && content) {
    const maxScroll = hero.offsetHeight;
    const currentScroll = window.scrollY;
    const progress = Math.min(currentScroll / maxScroll, 1);
    content.style.opacity = 1 - (progress*2);
  }

  // === Navbar active link switching ===
  const navLinks = document.querySelectorAll('.Navbar a');
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60; // Offset for sticky navbar
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});



