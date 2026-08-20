/* ============================================================
   EDDIE'S DELIVERY — main.js
   ============================================================ */

/* ---------- Nav: scrolled class ---------- */
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile hamburger ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Scroll-reveal (IntersectionObserver) ---------- */
const revealEls = document.querySelectorAll('.step, .service-card, .why__card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings by index
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Partner form: basic validation & feedback ---------- */
const form = document.getElementById('partner-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submit = form.querySelector('[type="submit"]');
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ff3c3c';
        valid = false;
      }
    });

    if (!valid) return;

    // Success animation
    submit.textContent = '✅ Inquiry Sent!';
    submit.style.background = 'linear-gradient(135deg, #00d4aa, #00b890)';
    submit.disabled = true;

    setTimeout(() => {
      submit.textContent = 'Send Inquiry ✉️';
      submit.style.background = '';
      submit.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ---------- Smooth anchor scrolling with offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
