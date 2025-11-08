document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initRevealAnimations();
  initBackToTop();
  initWeather();
  initHeroStatus();
  initTestimonialCarousel();
  initFaqSearch();
  initWorkflowEnhancements();
  initTranslations();
  initParallax();
  initStaggerAnimations();
  initActiveSection();
  initSmoothScrollEnhancement();
  initCardTilt();
});

function initNavigation() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  const toggle = nav.querySelector('.nav__toggle');
  const menu = nav.querySelector('.nav__menu');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  const openMenu = () => {
    nav.classList.add('nav--open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    if (nav.classList.contains('nav--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('nav--open')) return;
    if (!nav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      closeMenu();
    }
  });
}

function initScrollEffects() {
  const nav = document.querySelector('[data-nav]');
  const backToTop = document.querySelector('.back-to-top');

  const updateOnScroll = () => {
    const scrolled = window.scrollY > 16;
    if (nav) {
      nav.classList.toggle('nav--scrolled', scrolled);
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', window.scrollY > 320);
    }
  };

  updateOnScroll();
  window.addEventListener('scroll', updateOnScroll, { passive: true });
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initWeather() {
  const card = document.querySelector('[data-weather]');
  if (!card) return;

  const elements = {
    temp: card.querySelector('[data-weather-temp]'),
    description: card.querySelector('[data-weather-description]'),
    feels: card.querySelector('[data-weather-feels]'),
    wind: card.querySelector('[data-weather-wind]'),
    rain: card.querySelector('[data-weather-rain]'),
    visibility: card.querySelector('[data-weather-visibility]'),
    updated: card.querySelector('[data-weather-updated]'),
    forecast: card.querySelector('[data-weather-forecast]'),
    refresh: card.querySelector('[data-weather-refresh]'),
  };

  const ENDPOINT = 'https://api.open-meteo.com/v1/forecast?latitude=48.2045&longitude=20.8889&current_weather=true&hourly=temperature_2m,apparent_temperature,precipitation_probability,visibility,wind_speed_10m&windspeed_unit=kmh&timezone=Europe%2FBudapest';
  const REFRESH_INTERVAL = 30 * 60 * 1000;
  let refreshTimer = null;

  const getLocale = () => document.documentElement.lang || 'hu';

  const DESCRIPTIONS = {
    hu: {
      clear: 'Derült ég',
      partly: 'Változó felhőzet',
      overcast: 'Borult idő',
      fog: 'Ködös, párás',
      drizzle: 'Szitáló eső',
      rain: 'Esős idő',
      snow: 'Havazás',
      storm: 'Zivatar',
    },
    ru: {
      clear: 'Ясно',
      partly: 'Переменная облачность',
      overcast: 'Пасмурно',
      fog: 'Туман',
      drizzle: 'Морось',
      rain: 'Дождь',
      snow: 'Снег',
      storm: 'Гроза',
    },
    pl: {
      clear: 'Bezchmurne niebo',
      partly: 'Zachmurzenie zmienne',
      overcast: 'Pochmurno',
      fog: 'Mgła',
      drizzle: 'Mżawka',
      rain: 'Deszczowo',
      snow: 'Śnieg',
      storm: 'Burza',
    },
    ro: {
      clear: 'Cer senin',
      partly: 'Cer variabil',
      overcast: 'Cer acoperit',
      fog: 'Ceață',
      drizzle: 'Burniță',
      rain: 'Ploaie',
      snow: 'Ninsoare',
      storm: 'Furtună',
    },
    lt: {
      clear: 'Giedra',
      partly: 'Nepastoviai debesuota',
      overcast: 'Debesuota',
      fog: 'Rūkas',
      drizzle: 'Dulksna',
      rain: 'Lietinga',
      snow: 'Sninga',
      storm: 'Audra',
    },
    uk: {
      clear: 'Ясно',
      partly: 'Змінна хмарність',
      overcast: 'Похмуро',
      fog: 'Туман',
      drizzle: 'Мрячить',
      rain: 'Дощ',
      snow: 'Сніг',
      storm: 'Гроза',
    },
    sk: {
      clear: 'Jasno',
      partly: 'Premenlivá oblačnosť',
      overcast: 'Zamračené',
      fog: 'Hmla',
      drizzle: 'Mrholenie',
      rain: 'Dažď',
      snow: 'Sneženie',
      storm: 'Búrka',
    },
    sl: {
      clear: 'Jasno nebo',
      partly: 'Spremenljiva oblačnost',
      overcast: 'Oblačno',
      fog: 'Megleno',
      drizzle: 'Pršenje',
      rain: 'Deževno',
      snow: 'Snežno',
      storm: 'Nevihte',
    },
  };

  const UPDATED_LABEL = {
    hu: 'Utolsó frissítés',
    ru: 'Обновлено',
    pl: 'Ostatnia aktualizacja',
    ro: 'Ultima actualizare',
    lt: 'Paskutinis atnaujinimas',
    uk: 'Останнє оновлення',
    sk: 'Posledná aktualizácia',
    sl: 'Zadnja posodobitev',
  };

  const FEELS_PREFIX = {
    hu: 'Hőérzet',
    ru: 'Ощущается как',
    pl: 'Odczuwalna',
    ro: 'Se simte ca',
    lt: 'Juntamas',
    uk: 'Відчувається як',
    sk: 'Pocitová',
    sl: 'Občutek',
  };

  const getDescription = (code) => {
    const locale = getLocale();
    const bundle = DESCRIPTIONS[locale] || DESCRIPTIONS.hu;
    if (code === 0) return bundle.clear;
    if ([1, 2].includes(code)) return bundle.partly;
    if (code === 3) return bundle.overcast;
    if ([45, 48].includes(code)) return bundle.fog;
    if ([51, 53, 55].includes(code)) return bundle.drizzle;
    if ([61, 63, 65, 80, 81, 82].includes(code)) return bundle.rain;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return bundle.snow;
    if ([66, 67, 95, 96, 99].includes(code)) return bundle.storm;
    return bundle.overcast;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(getLocale(), {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatUpdate = (date) => {
    const locale = getLocale();
    const prefix = UPDATED_LABEL[locale] || UPDATED_LABEL.hu;
    const time = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
    return `${prefix}: ${time}`;
  };

  const toKm = (meters) => {
    if (typeof meters !== 'number') return '--';
    return `${Math.round(meters / 1000)} km`;
  };

  const renderForecast = (hourly, startIndex) => {
    if (!elements.forecast) return;
    elements.forecast.innerHTML = '';
    const items = [];
    for (let i = 1; i <= 3; i += 1) {
      const idx = startIndex + i;
      if (!hourly.time[idx]) continue;
      items.push({
        time: hourly.time[idx],
        temp: hourly.temperature_2m?.[idx],
        rain: hourly.precipitation_probability?.[idx],
      });
    }

    items.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'weather__forecast-item';

      const timeEl = document.createElement('time');
      timeEl.dateTime = item.time;
      timeEl.textContent = formatTime(item.time);

      const tempEl = document.createElement('span');
      tempEl.textContent = `${Math.round(item.temp ?? 0)}°C`;

      const rainEl = document.createElement('span');
      rainEl.textContent = `${Math.round(item.rain ?? 0)}%`;

      wrapper.append(timeEl, tempEl, rainEl);
      elements.forecast.appendChild(wrapper);
    });
  };

  const setStateLoading = (isLoading) => {
    card.classList.toggle('is-loading', isLoading);
    if (elements.refresh) {
      elements.refresh.disabled = isLoading;
    }
  };

  const applyData = (data) => {
    const { current_weather: current, hourly } = data;
    if (!current || !hourly) {
      throw new Error('Incomplete weather payload');
    }

    const now = new Date();
    const hourIndex = hourly.time.findIndex((timestamp) => new Date(timestamp) >= now);
    const validIndex = hourIndex > -1 ? hourIndex : hourly.time.length - 1;
    const feelsValue = hourly.apparent_temperature?.[validIndex];
    const rainChance = hourly.precipitation_probability?.[validIndex];
    const visibilityValue = hourly.visibility?.[validIndex];
    const windSpeed = hourly.wind_speed_10m?.[validIndex] ?? current.windspeed;

    if (elements.temp) {
      elements.temp.textContent = `${Math.round(current.temperature)}°C`;
    }
    if (elements.description) {
      elements.description.textContent = getDescription(current.weathercode);
    }
    if (elements.feels) {
      const locale = getLocale();
      const prefix = FEELS_PREFIX[locale] || FEELS_PREFIX.hu;
      elements.feels.textContent = `${prefix}: ${Math.round(feelsValue ?? current.temperature)}°C`;
    }
    if (elements.wind) {
      elements.wind.textContent = `${Math.round(windSpeed)} km/h`;
    }
    if (elements.rain) {
      elements.rain.textContent = `${Math.round(rainChance ?? 0)}%`;
    }
    if (elements.visibility) {
      elements.visibility.textContent = toKm(visibilityValue ?? 10000);
    }
    if (elements.updated) {
      elements.updated.textContent = formatUpdate(new Date());
    }

    renderForecast(hourly, validIndex);
  };

  const setErrorState = () => {
    if (elements.description) {
      const locale = getLocale();
      elements.description.textContent = locale === 'hu' ? 'Nem elérhető' : 'Unavailable';
    }
  };

  const fetchWeather = async () => {
    setStateLoading(true);
    try {
      const response = await fetch(ENDPOINT, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      applyData(payload);
    } catch (error) {
      console.error('Weather fetch failed', error);
      setErrorState();
    } finally {
      setStateLoading(false);
    }
  };

  if (elements.refresh) {
    elements.refresh.addEventListener('click', () => {
      fetchWeather();
    });
  }

  fetchWeather();

  if (refreshTimer) {
    window.clearInterval(refreshTimer);
  }
  refreshTimer = window.setInterval(fetchWeather, REFRESH_INTERVAL);
}

function initHeroStatus() {
  const status = document.querySelector('[data-status]');
  if (!status) return;

  const countEl = status.querySelector('[data-status-count]');
  const indicator = status.querySelector('.hero__status-indicator');
  if (!countEl) return;

  const MIN = 12;
  const MAX = 25;

  const computeHourlySlots = () => {
    const now = new Date();
    const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const hourSeed = daySeed * 37 + now.getHours() * 17;
    const baseRandom = Math.sin(hourSeed) * 10000;
    const normalized = baseRandom - Math.floor(baseRandom);
    const biased = Math.pow(normalized, 0.5); // bias toward higher availability
    const value = Math.round(MIN + biased * (MAX - MIN));
    return Math.max(MIN, Math.min(MAX, value));
  };

  let currentValue = computeHourlySlots();

  const update = (value) => {
    const nextValue = value ?? computeHourlySlots();
    countEl.textContent = String(nextValue);
    status.classList.add('is-updating');
    if (indicator) {
      indicator.classList.add('is-pulsing');
      window.setTimeout(() => indicator.classList.remove('is-pulsing'), 900);
    }
    window.setTimeout(() => status.classList.remove('is-updating'), 450);
    currentValue = nextValue;
  };

  update(currentValue);
  window.setInterval(() => update(), 60 * 60 * 1000);
}

function initTestimonialCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  const track = carousel?.querySelector('[data-carousel-track]');
  if (!carousel || !track) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const dotsHost = document.querySelector('[data-carousel-dots]');

  let activeIndex = 0;
  let autoplayId = null;

  const dotButtons = slides.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'testimonial-carousel__dot';
    button.setAttribute('aria-label', `${index + 1}. értékelés`);
    button.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    return button;
  });

  if (dotsHost) {
    dotsHost.innerHTML = '';
    dotButtons.forEach((dot) => dotsHost.appendChild(dot));
  }

  const updateAria = (index) => {
    const total = slides.length;
    slides.forEach((slide, idx) => {
      slide.setAttribute('aria-label', `${idx + 1} / ${total}`);
      slide.classList.toggle('is-active', idx === index);
    });
    dotButtons.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === index);
      dot.setAttribute('aria-pressed', String(idx === index));
    });
  };

  const goToSlide = (index) => {
    const total = slides.length;
    activeIndex = (index + total) % total;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    updateAria(activeIndex);
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 8000);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  prevButton?.addEventListener('click', () => {
    goToSlide(activeIndex - 1);
    restartAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    goToSlide(activeIndex + 1);
    restartAutoplay();
  });

  carousel.addEventListener('pointerenter', stopAutoplay);
  carousel.addEventListener('pointerleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  goToSlide(0);
  startAutoplay();
}

function initWorkflowEnhancements() {
  const steps = document.querySelectorAll('.workflow__step');
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.45 }
  );

  steps.forEach((step) => observer.observe(step));
}

function initFaqSearch() {
  const input = document.querySelector('[data-faq-search]');
  const items = Array.from(document.querySelectorAll('[data-faq-item]'));
  const container = document.querySelector('.faq__grid');
  if (!input || !items.length || !container) return;

  const defaultOpenState = items.map((details) => details.hasAttribute('open'));

  const filter = (value) => {
    const term = value.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((details, index) => {
      const text = details.textContent?.toLowerCase() ?? '';
      const match = !term || text.includes(term);
      details.hidden = !match;

      if (match) {
        visibleCount += 1;
        if (term) {
          details.open = true;
        } else {
          details.open = defaultOpenState[index];
        }
      } else {
        details.open = false;
      }
    });

    container.classList.toggle('is-empty', visibleCount === 0);
  };

  input.addEventListener('input', (event) => {
    filter(event.target.value);
  });
}

function initTranslations() {
  const languageSelect = document.getElementById('language-select');
  if (!languageSelect) return;

  const STORAGE_KEY = 'jacek-preferred-lang';
  const DEFAULT_LANG = 'hu';
  const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
  const ariaNodes = Array.from(document.querySelectorAll('[data-i18n-aria-label]'));
  const placeholderNodes = Array.from(document.querySelectorAll('[data-i18n-placeholder]'));
  let translationCache = null;

  const fetchTranslations = async () => {
    if (translationCache) return translationCache;

    try {
      const response = await fetch('translations.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      translationCache = await response.json();
    } catch (error) {
      console.error('Nem sikerült betölteni a fordításokat:', error);
      translationCache = window.JACEK_TRANSLATIONS || null;
    }

    return translationCache;
  };

  const applyLanguage = async (language, persist = false) => {
    const translations = await fetchTranslations();
    if (!translations) return;

    const selectedLang = translations[language] ? language : DEFAULT_LANG;
    const fallback = translations[DEFAULT_LANG] || {};
    const current = translations[selectedLang] || {};

    textNodes.forEach((node) => {
      const key = node.dataset.i18n;
      const value = current.text?.[key] ?? fallback.text?.[key];
      if (typeof value === 'string') {
        node.innerHTML = value;
      }
    });

    ariaNodes.forEach((node) => {
      const key = node.dataset.i18nAriaLabel;
      const value = current.aria?.[key] ?? fallback.aria?.[key];
      if (typeof value === 'string') {
        node.setAttribute('aria-label', value);
      }
    });

    placeholderNodes.forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      const value = current.text?.[key] ?? fallback.text?.[key];
      if (typeof value === 'string') {
        node.setAttribute('placeholder', value);
      }
    });

    document.documentElement.lang = selectedLang;
    document.documentElement.setAttribute('data-lang', selectedLang);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, selectedLang);
      } catch (error) {
        console.warn('Nem sikerült menteni a nyelvi beállítást:', error);
      }
    }

    if (languageSelect.value !== selectedLang) {
      languageSelect.value = selectedLang;
    }
  };

  fetchTranslations().then((translations) => {
    if (!translations) return;
    const storedLang = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (error) {
        return null;
      }
    })();

    const initialLang = storedLang && translations[storedLang] ? storedLang : DEFAULT_LANG;
    languageSelect.value = initialLang;
    applyLanguage(initialLang);
  });

  languageSelect.addEventListener('change', (event) => {
    applyLanguage(event.target.value, true);
  });
}

// ============================================
// ADVANCED ENHANCEMENTS
// ============================================

/**
 * Parallax scrolling effect for hero images
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.hero__image img');
  
  if (!parallaxElements.length) return;
  
  const handleScroll = () => {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach((el, index) => {
      const speed = index === 0 ? 0.5 : 0.3;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Stagger animations for feature cards
 */
function initStaggerAnimations() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (!featureCards.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    observer.observe(servicesSection);
  }
}

/**
 * Active section highlighting in navigation
 */
function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');
  
  if (!sections.length || !navLinks.length) return;
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach((link) => {
          link.classList.remove('is-current');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-current');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach((section) => observer.observe(section));
}

/**
 * Enhanced smooth scrolling with easing
 */
function initSmoothScrollEnhancement() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navHeight = document.querySelector('[data-nav]')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 3D tilt effect for cards on mouse move
 */
function initCardTilt() {
  const cards = document.querySelectorAll('.pricing-card, .wine__card');
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(10px)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Enhanced image lazy loading with intersection observer
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('is-loaded');
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );
    
    images.forEach((img) => {
      img.classList.add('lazy-image');
      imageObserver.observe(img);
    });
  }
}

/**
 * Keyboard navigation enhancements
 */
function initKeyboardNavigation() {
  // Focus visible styles
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
  
  // Skip to main content
  const skipLink = document.querySelector('[href="#main"]');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.getElementById('main') || document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
        main.removeAttribute('tabindex');
      }
    });
  }
}

/**
 * Scroll progress indicator
 */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-label', 'Oldal görgetési folyamat');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  document.body.appendChild(progressBar);
  
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  };
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Custom cursor follower
 */
function initCustomCursor() {
  // Only on desktop
  if (window.innerWidth < 1024) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor__dot';
  cursor.appendChild(cursorDot);
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Add hover states
  const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .pricing-card, .wine__card');
  
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('custom-cursor--active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--active');
    });
  });
}

/**
 * Magnetic buttons effect
 */
function initMagneticButtons() {
  if (window.innerWidth < 1024) return;
  
  const buttons = document.querySelectorAll('.btn, .back-to-top');
  
  buttons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.3;
      const moveY = y * 0.3;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

/**
 * Animated number counters
 */
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((counter) => observer.observe(counter));
}

/**
 * Text reveal animation
 */
function initTextReveal() {
  const textElements = document.querySelectorAll('[data-text-reveal]');
  
  textElements.forEach((element) => {
    const text = element.textContent;
    element.innerHTML = '';
    
    const words = text.split(' ');
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'text-reveal-word';
      span.textContent = word + ' ';
      span.style.animationDelay = `${index * 0.05}s`;
      element.appendChild(span);
    });
  });
}

/**
 * Premium loading screen with truck animation
 */
function initLoadingScreen() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="page-loader__content">
      <div class="page-loader__text">Jacek Tirparking</div>
      <div class="page-loader__subtext">Betöltés...</div>
      <div class="page-loader__progress-wrapper">
        <div class="parking-sign">
          <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
            <!-- Sign pole -->
            <rect x="27" y="50" width="6" height="30" fill="#888"/>
            <!-- Sign board -->
            <rect x="5" y="5" width="50" height="50" fill="#0066cc" rx="3"/>
            <text x="30" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">P</text>
          </svg>
        </div>
        <div class="truck-loader">
          <div class="truck-loader__truck">
            <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              <!-- Truck body -->
              <rect x="80" y="30" width="70" height="35" fill="url(#truckGradient)" rx="3"/>
              <rect x="50" y="40" width="30" height="25" fill="url(#truckGradient)" rx="2"/>
              
              <!-- Truck cabin window -->
              <rect x="55" y="45" width="20" height="15" fill="rgba(255,255,255,0.3)" rx="1"/>
              
              <!-- Jacek text on truck -->
              <text x="115" y="52" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">JACEK</text>
              
              <!-- Wheels -->
              <circle cx="70" cy="70" r="8" fill="#333" stroke="url(#wheelGradient)" stroke-width="2"/>
              <circle cx="70" cy="70" r="4" fill="#666"/>
              <circle cx="130" cy="70" r="8" fill="#333" stroke="url(#wheelGradient)" stroke-width="2"/>
              <circle cx="130" cy="70" r="4" fill="#666"/>
              
              <!-- Headlights -->
              <circle cx="48" cy="55" r="2" fill="#ffeb3b" opacity="0.8"/>
              
              <defs>
                <linearGradient id="truckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#4d6aff;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#ff7d3b;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#888;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#444;stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div class="page-loader__progress">
          <div class="page-loader__bar"></div>
        </div>
      </div>
    </div>
  `;
  
  document.body.prepend(loader);
  
  const bar = loader.querySelector('.page-loader__bar');
  let progress = 0;
  
  // Track actual page load progress
  const updateProgress = (value) => {
    progress = Math.min(value, 100);
    bar.style.width = `${progress}%`;
  };
  
  // Initial progress for DOM ready
  updateProgress(30);
  
  // Simulate resource loading progress
  let simulatedProgress = 30;
  const progressInterval = setInterval(() => {
    if (simulatedProgress < 90) {
      simulatedProgress += Math.random() * 10;
      updateProgress(simulatedProgress);
    }
  }, 150);
  
  // Wait for all resources to load
  const hideLoader = () => {
    clearInterval(progressInterval);
    updateProgress(100);
    
    setTimeout(() => {
      loader.classList.add('page-loader--hidden');
      setTimeout(() => loader.remove(), 600);
    }, 300);
  };
  
  // Listen for page fully loaded
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    
    // Fallback: remove after 5 seconds max
    setTimeout(() => {
      if (loader.parentElement) {
        hideLoader();
      }
    }, 5000);
  }
}

/**
 * Toast notification system
 */
const Toast = {
  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icon = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    }[type] || 'ℹ';
    
    toast.innerHTML = `
      <div class="toast__icon">${icon}</div>
      <div class="toast__message">${message}</div>
      <button class="toast__close" aria-label="Bezárás">×</button>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
    });
    
    // Close button
    const closeBtn = toast.querySelector('.toast__close');
    closeBtn.addEventListener('click', () => {
      this.hide(toast);
    });
    
    // Auto hide
    if (duration > 0) {
      setTimeout(() => {
        this.hide(toast);
      }, duration);
    }
    
    return toast;
  },
  
  hide(toast) {
    toast.classList.remove('toast--visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
};

/**
 * Enhanced carousel with drag support
 */
function enhanceTestimonialCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  const track = carousel?.querySelector('[data-carousel-track]');
  
  if (!carousel || !track) return;
  
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let translateX = 0;
  
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.cursor = 'grabbing';
    track.style.transition = 'none';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    currentX = e.pageX;
    const diff = currentX - startX;
    track.style.transform = `translateX(calc(-${translateX}% + ${diff}px))`;
  });
  
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    track.style.cursor = 'grab';
    track.style.transition = '';
    
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe right - previous
        carousel.querySelector('[data-carousel-prev]')?.click();
      } else {
        // Swipe left - next
        carousel.querySelector('[data-carousel-next]')?.click();
      }
    } else {
      // Reset position
      track.style.transform = `translateX(-${translateX}%)`;
    }
  });
  
  // Touch support
  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    track.style.transform = `translateX(calc(-${translateX}% + ${diff}px))`;
  });
  
  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    isDragging = false;
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        carousel.querySelector('[data-carousel-prev]')?.click();
      } else {
        carousel.querySelector('[data-carousel-next]')?.click();
      }
    } else {
      track.style.transform = `translateX(-${translateX}%)`;
    }
  });
}

/**
 * Performance monitoring (dev mode)
 */
function initPerformanceMonitoring() {
  if (!window.location.search.includes('debug=true')) return;
  
  const monitor = document.createElement('div');
  monitor.className = 'perf-monitor';
  monitor.innerHTML = `
    <div class="perf-monitor__item">
      <span class="perf-monitor__label">FPS:</span>
      <span class="perf-monitor__value" id="fps-counter">60</span>
    </div>
    <div class="perf-monitor__item">
      <span class="perf-monitor__label">Load:</span>
      <span class="perf-monitor__value" id="load-time">-</span>
    </div>
  `;
  
  document.body.appendChild(monitor);
  
  // FPS Counter
  let lastTime = performance.now();
  let frames = 0;
  
  function updateFPS() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      document.getElementById('fps-counter').textContent = fps;
      frames = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(updateFPS);
  }
  
  updateFPS();
  
  // Load time
  window.addEventListener('load', () => {
    const loadTime = (performance.now() / 1000).toFixed(2);
    document.getElementById('load-time').textContent = `${loadTime}s`;
  });
}

// Mobile touch gestures for carousel
function initTouchGestures() {
  const carousels = document.querySelectorAll('.testimonials__wall-track');
  
  carousels.forEach(carousel => {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      carousel.style.cursor = 'grabbing';
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      
      // Visual feedback during drag
      if (Math.abs(diff) > 10) {
        carousel.style.transform = `translateX(${diff * 0.3}px)`;
      }
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      carousel.style.cursor = 'grab';
      carousel.style.transform = '';
      
      const diff = currentX - startX;
      const threshold = 50;
      
      // Swipe left - next slide
      if (diff < -threshold) {
        const nextBtn = carousel.closest('.testimonials__wall').querySelector('.testimonials__wall-btn--next');
        if (nextBtn) nextBtn.click();
      }
      // Swipe right - previous slide
      else if (diff > threshold) {
        const prevBtn = carousel.closest('.testimonials__wall').querySelector('.testimonials__wall-btn--prev');
        if (prevBtn) prevBtn.click();
      }
      
      startX = 0;
      currentX = 0;
    }, { passive: true });
  });
}

// Detect mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth < 768;
}

// Mobile-specific optimizations
function initMobileOptimizations() {
  if (!isMobileDevice()) return;
  
  // Disable complex animations on mobile for better performance
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .hero__floating-card {
        animation: none !important;
      }
      
      * {
        animation-duration: 0.3s !important;
        transition-duration: 0.3s !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add mobile class to body
  document.body.classList.add('is-mobile');
  
  // Optimize scroll performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Handle scroll events here
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Prevent zoom on double tap for buttons
  document.querySelectorAll('.btn, .nav__cta, .back-to-top').forEach(btn => {
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      btn.click();
    });
  });
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
  initLazyLoading();
  initKeyboardNavigation();
  initScrollProgress();
  // initCustomCursor(); // Disabled - user preference
  initMagneticButtons();
  initNumberCounters();
  initTextReveal();
  initLoadingScreen();
  enhanceTestimonialCarousel();
  initPerformanceMonitoring();
  initTouchGestures();
  initMobileOptimizations();
  
  // Make Toast globally available
  window.Toast = Toast;
});

