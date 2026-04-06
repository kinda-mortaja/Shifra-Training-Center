/* ============================================================
   SHIFRA TRAINING CENTER — main.js (v2 — Improved)
   ============================================================ */

// ---- Navbar: sticky shadow on scroll ----
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---- Hamburger menu toggle ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ---- Fade-in on scroll (Intersection Observer) ----
const fadeEls = document.querySelectorAll(
  '.offer-card, .course-card, .course-tile, .why-card, .testimonial-card, .team-card, .stat-item, .mv-card'
);

if (fadeEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.children;
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ---- Courses page: category filter tabs ----
const tabBtns     = document.querySelectorAll('.tab-btn');
const catSections = document.querySelectorAll('.cat-section');

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      catSections.forEach(sec => {
        sec.style.display = (cat === 'all' || sec.dataset.cat === cat) ? 'block' : 'none';
      });

      if (cat !== 'all') {
        const target = document.querySelector(`.cat-section[data-cat="${cat}"]`);
        if (target) {
          setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }
      }
    });
  });
}

// ---- Contact form submission ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const successEl = document.getElementById('formSuccess');
    if (successEl) {
      successEl.style.display = 'flex';
      contactForm.reset();
      setTimeout(() => { successEl.style.display = 'none'; }, 5000);
    }
  });
}

// ---- Course tiles: click to navigate to course detail ----
document.querySelectorAll('.course-tile, .course-card').forEach(card => {
  // Only add click listener if there's no direct <a> button inside
  const hasLink = card.querySelector('a.btn');
  if (!hasLink) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = 'course-detail.html';
    });
  }
});

// ---- Active nav link based on current page ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.remove('active');
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
