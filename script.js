/* ───────────────────────────────────────────────
   Dinesh Saini Portfolio — script.js
─────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  // const cursor     = document.createElement('div');
  // const cursorRing = document.createElement('div');
  // cursor.classList.add('cursor');
  // cursorRing.classList.add('cursor-ring');
  // document.body.append(cursor, cursorRing);

  // let mouseX = 0, mouseY = 0;
  // let ringX  = 0, ringY  = 0;

  // document.addEventListener('mousemove', e => {
  //   mouseX = e.clientX;
  //   mouseY = e.clientY;
  //   cursor.style.left = mouseX + 'px';
  //   cursor.style.top  = mouseY + 'px';
  // });

  // // Smooth ring follow
  // function animateCursor() {
  //   ringX += (mouseX - ringX) * 0.12;
  //   ringY += (mouseY - ringY) * 0.12;
  //   cursorRing.style.left = ringX + 'px';
  //   cursorRing.style.top  = ringY + 'px';
  //   requestAnimationFrame(animateCursor);
  // }
  // animateCursor();

  // Scale on interactive elements
  // document.querySelectorAll('a, button, .skill-card, .project-card, .timeline-card').forEach(el => {
  //   el.addEventListener('mouseenter', () => {
  //     cursorRing.style.width  = '60px';
  //     cursorRing.style.height = '60px';
  //     cursorRing.style.borderColor = 'var(--violet)';
  //   });
  //   el.addEventListener('mouseleave', () => {
  //     cursorRing.style.width  = '36px';
  //     cursorRing.style.height = '36px';
  //     cursorRing.style.borderColor = 'var(--lilac)';
  //   });
  // });


  /* ── HERO ANIMATE-IN ── */
  const heroEls = document.querySelectorAll('.hero .reveal');
  setTimeout(() => {
    heroEls.forEach(el => el.classList.add('animate'));
  }, 100);


  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');

  // Build mobile nav
  const mobileNav = document.createElement('nav');
  mobileNav.classList.add('mobile-nav');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const links = document.querySelectorAll('.nav-links a');
  const ul = document.createElement('ul');
  links.forEach(link => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = link.href;
    a.textContent = link.textContent;
    a.addEventListener('click', closeMenu);
    li.appendChild(a);
    ul.appendChild(li);
  });
  mobileNav.appendChild(ul);
  document.body.append(mobileNav, overlay);

  function openMenu()  { mobileNav.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeMenu() { mobileNav.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; }

  hamburger.addEventListener('click', () => mobileNav.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);


  /* ── PARALLAX ── */
  const parallaxBg     = document.getElementById('parallax-bg');
  const parallaxMid    = document.getElementById('parallax-mid');
  const parallaxBottom = document.getElementById('parallax-bottom');

  function handleParallax() {
    const scrollY = window.scrollY;

    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrollY * 0.35}px)`;
    }

    // Mid section parallax
    if (parallaxMid) {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const offset = scrollY - skillsSection.offsetTop;
        parallaxMid.style.transform = `translateY(${offset * 0.2}px)`;
      }
    }

    // Bottom section parallax
    if (parallaxBottom) {
      const projSection = document.getElementById('projects');
      if (projSection) {
        const offset = scrollY - projSection.offsetTop;
        parallaxBottom.style.transform = `translateY(${offset * 0.15}px)`;
      }
    }
  }

  // Floating shapes depth
  const shapes = document.querySelectorAll('.shape');
  function animateShapes() {
    const scrollY = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = 0.08 + i * 0.04;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  window.addEventListener('scroll', () => {
    handleParallax();
    animateShapes();
  }, { passive: true });


  /* ── SCROLL REVEAL (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal:not(.hero .reveal), .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);

      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));


  /* ── 3D CARD TILT ── */
  const tiltCards = document.querySelectorAll('.skill-card, .project-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const rotX = ((e.clientY - centerY) / (rect.height / 2)) * -6;
      const rotY = ((e.clientX - centerX) / (rect.width  / 2)) *  6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── SMOOTH NAV SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── CONTACT FORM MOCK SUBMIT ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #6dbf7e, #4aaf63)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        form.reset();
      }, 2800);
    });
  }


  /* ── SKILL TAGS HOVER WAVE ── */
  document.querySelectorAll('.skill-tags span').forEach((tag, i) => {
    tag.style.transitionDelay = (i * 40) + 'ms';
  });


  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollMid >= top && scrollMid < bottom) {
        navAs.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.style.color = 'var(--violet)';
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });


  /* ── TYPED HERO TAG ── */
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const fullText = heroTag.textContent;
    heroTag.textContent = '';
    let i = 0;
    function type() {
      if (i < fullText.length) {
        heroTag.textContent += fullText[i++];
        setTimeout(type, 55);
      }
    }
    setTimeout(type, 400);
  }


  /* ── TIMELINE PROGRESS LINE ANIMATION ── */
  const timelineLine = document.querySelector('.timeline::before');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
      }
    });
  }, { threshold: 0.3 });
  timelineItems.forEach(item => tlObserver.observe(item));

});
