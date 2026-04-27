(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const preloader = document.querySelector('.preloader');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  };

  const setupNavigation = () => {
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      });
    });
  };

  const setupReveal = () => {
    const revealItems = document.querySelectorAll('.reveal, .card');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((el) => observer.observe(el));
  };

  const setupCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = Number(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 80));

      const tick = () => {
        current += increment;
        if (current >= target) {
          el.textContent = `${target}${suffix}`;
          return;
        }
        el.textContent = `${current}${suffix}`;
        requestAnimationFrame(tick);
      };

      tick();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => observer.observe(counter));
  };

  const setupParallax = () => {
    const targets = document.querySelectorAll('.parallax');
    if (!targets.length) return;

    const update = () => {
      const y = window.scrollY;
      targets.forEach((el) => {
        const speed = Number(el.getAttribute('data-speed') || 0.12);
        el.style.transform = `translateY(${y * speed}px)`;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  };

  const hidePreloader = () => {
    if (!preloader) return;
    window.setTimeout(() => {
      preloader.classList.add('hidden');
    }, 420);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', hidePreloader);

  onScroll();
  setupNavigation();
  setupReveal();
  setupCounters();
  setupParallax();
})();
