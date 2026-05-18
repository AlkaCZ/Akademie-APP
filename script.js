const courseThumbnails = {
  idea: {
    src: 'assets/idea.png',
    alt: 'Ikona nápadu a žárovky - kurz Ověř svůj nápad'
  },
  offer: {
    src: 'assets/proposal.png',
    alt: 'Ikona business strategie - kurz Vyladění nabídky'
  },
  marketing: {
    src: 'assets/social-media.png',
    alt: 'Ikona marketingového grafu - kurz Marketing & growth'
  },
  finance: {
    src: 'assets/budget.png',
    alt: 'Ikona finanční analýzy - kurz Finance & pricing'
  }
};

const courseActions = {
  idea: { label: 'Pokračovat', href: 'mission.html', className: 'primary-red' },
  offer: { label: 'Začít kurz', href: 'mission.html', className: '' },
  marketing: { label: 'Začít kurz', href: 'mission.html', className: '' },
  finance: { label: 'Začít kurz', href: 'mission.html', className: '' }
};

function enhanceCourseActions() {
  document.querySelectorAll('[data-course-id]').forEach(card => {
    const id = card.getAttribute('data-course-id');
    const row = card.querySelector('.course-row');
    const badge = row ? row.querySelector('.badge') : null;
    const cfg = courseActions[id];

    if (!row || !badge || !cfg) return;

    row.innerHTML = '';
    row.appendChild(badge);

    const link = document.createElement('a');
    link.href = cfg.href;
    link.className = `action course-open ${cfg.className}`.trim();
    link.textContent = cfg.label;

    row.appendChild(link);
  });
}

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
    img.className = 'course-icon';

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

function setupAssistantChips() {
  const input = document.querySelector('#assistantPrompt');
  if (!input) return;

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.textContent.trim();
      input.focus();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  enhanceCourses();
  enhanceCourseActions();
  setupSearch();
  setupBottomNav();
  setupHeroPulse();
  setupAssistantChips();
});