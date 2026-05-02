'use strict';

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navbar.classList.toggle('menu-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navbar.classList.remove('menu-open');
  });
});

// Animated counter
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const countersStarted = new Set();
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted.has(entry.target)) {
      countersStarted.add(entry.target);
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = Array.from(revealElements).indexOf(entry.target) % 4 * 100;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// Publication filter
const filters = document.querySelectorAll('.pub-filter');
const pubItems = document.querySelectorAll('.pub-item');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    pubItems.forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Kirim Pesan`;
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--primary)';
      } else {
        link.style.color = '';
      }
    }
  });
}, { passive: true });
