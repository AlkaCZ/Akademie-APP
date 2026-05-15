const courseThumbnails = {
  idea: {
    src: 'https://pplx-res.cloudinary.com/image/upload/t_thumbnail_512_smart/pplx_search_images/5c6ba9c3603ab699acdd9e57ab1dfeffaf36ae04.jpg',
    alt: 'Ilustrace start-up rakety a notebooku pro kurz ověření nápadu'
  },
  offer: {
    src: 'https://pplx-res.cloudinary.com/image/upload/t_thumbnail_512_smart/pplx_search_images/ef2207c9c5ebaedeb824583fd776e9764083e5f7.jpg',
    alt: 'Ilustrace business strategie a plánování nabídky'
  },
  marketing: {
    src: 'https://pplx-res.cloudinary.com/image/upload/t_thumbnail_512_smart/pplx_search_images/114a6e3a86899626e0d747cc3bf47bfec89a83a9.jpg',
    alt: 'Ilustrace marketingového dashboardu a růstu kampaní'
  }
};

function enhanceCourses() {
  document.querySelectorAll('[data-course-id]').forEach(card => {
    const id = card.getAttribute('data-course-id');
    const visual = card.querySelector('.course-visual');
    const cfg = courseThumbnails[id];
    if (!visual || !cfg) return;

    const img = document.createElement('img');
    img.src = cfg.src;
    img.alt = cfg.alt;
    img.loading = 'lazy';
    img.width = 340;
    img.height = 191;

    visual.innerHTML = '';
    visual.appendChild(img);
  });
}

function setupSearch() {
  const searchWrap = document.querySelector('[data-search]');
  if (!searchWrap) return;

  const input = searchWrap.querySelector('input');
  if (!input) return;

  const cards = Array.from(document.querySelectorAll('[data-course-id]'));

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

function setupBottomNav() {
  const nav = document.querySelector('[data-bottom-nav]');
  const phone = document.querySelector('.phone');
  if (!nav || !phone) return;

  if (nav.parentElement !== phone) {
    phone.appendChild(nav);
  }

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', evt => {
      const href = link.getAttribute('href');
      if (!href) return;

      nav.classList.add('nav-pressed');

      setTimeout(() => {
        window.location.href = href;
      }, 120);

      evt.preventDefault();
    });
  });
}

function setupHeroPulse() {
  const hero = document.querySelector('.hero-card');
  if (!hero) return;
  hero.classList.add('hero-animate');
}

document.addEventListener('DOMContentLoaded', () => {
  enhanceCourses();
  setupSearch();
  setupBottomNav();
  setupHeroPulse();
});