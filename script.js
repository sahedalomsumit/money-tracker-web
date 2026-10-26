// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.getElementById('cursor');
if (cursor) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    // Smooth lagging effect
    const easing = 0.15;
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    cursor.style.transform = `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// Aura Background Movement
const aura1 = document.getElementById('aura-1');
const aura2 = document.getElementById('aura-2');
if (aura1 && aura2) {
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
    
    gsap.to(aura1, {
      x: moveX,
      y: moveY,
      duration: 3,
      ease: 'power2.out'
    });
    gsap.to(aura2, {
      x: -moveX,
      y: -moveY,
      duration: 3,
      ease: 'power2.out'
    });
  });
}

// Sticky Header Logic
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('py-4');
    header.classList.remove('py-6');
  } else {
    header.classList.remove('py-4');
    header.classList.add('py-6');
  }
});


// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuSpans = menuBtn.querySelectorAll('span');

let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  
  if (isMenuOpen) {
    document.body.style.overflow = 'hidden';
    mobileMenu.style.display = 'flex';
    gsap.to(mobileMenu, { x: 0, opacity: 1, duration: 0.6, ease: 'power4.out' });
    
    // Animate spans
    menuSpans[0].classList.add('translate-y-2', 'rotate-45');
    menuSpans[1].classList.add('opacity-0', 'translate-x-3');
    menuSpans[2].classList.add('-translate-y-2', '-rotate-45');
    
    const links = mobileMenu.querySelectorAll('a');
    gsap.fromTo(links, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    );
  } else {
    closeMenu();
  }
});

function closeMenu() {
  isMenuOpen = false;
  document.body.style.overflow = 'unset';
  
  menuSpans[0].classList.remove('translate-y-2', 'rotate-45');
  menuSpans[1].classList.remove('opacity-0', 'translate-x-3');
  menuSpans[2].classList.remove('-translate-y-2', '-rotate-45');
  
  const tl = gsap.timeline();
  tl.to(mobileMenu.querySelectorAll('a'), {
    y: 30,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power2.in'
  });
  tl.to(mobileMenu, {
    x: '100%',
    opacity: 0,
    duration: 0.5,
    ease: 'power4.in',
    onComplete: () => { mobileMenu.style.display = 'none'; }
  }, "-=0.2");
}

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => {
  const direction = el.dataset.direction || 'up';
  let startVars = { opacity: 0 };
  
  switch(direction) {
    case 'left': startVars.x = -40; break;
    case 'right': startVars.x = 40; break;
    case 'down': startVars.y = -30; break;
    case 'up': default: startVars.y = 30; break;
  }
  
  gsap.fromTo(el, 
    { ...startVars, autoAlpha: 0 },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// Showcase Tab Switcher (Core Screens vs Guided Onboarding)
const screensTabBtn = document.getElementById('screens-tab-btn');
const onboardingTabBtn = document.getElementById('onboarding-tab-btn');
const toggleIndicator = document.getElementById('toggle-indicator');
const screensGrid = document.getElementById('screens-grid');
const onboardingGrid = document.getElementById('onboarding-grid');

if (screensTabBtn && onboardingTabBtn && toggleIndicator && screensGrid && onboardingGrid) {
  screensTabBtn.addEventListener('click', () => {
    toggleIndicator.style.transform = 'translateX(0)';
    screensTabBtn.classList.add('text-white');
    screensTabBtn.classList.remove('text-gray-500');
    onboardingTabBtn.classList.remove('text-white');
    onboardingTabBtn.classList.add('text-gray-500');

    gsap.to(onboardingGrid, {
      opacity: 0,
      y: 10,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        onboardingGrid.classList.add('hidden');
        screensGrid.classList.remove('hidden');
        gsap.fromTo(screensGrid, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      }
    });
  });

  onboardingTabBtn.addEventListener('click', () => {
    toggleIndicator.style.transform = 'translateX(100%)';
    onboardingTabBtn.classList.add('text-white');
    onboardingTabBtn.classList.remove('text-gray-500');
    screensTabBtn.classList.remove('text-white');
    screensTabBtn.classList.add('text-gray-500');

    gsap.to(screensGrid, {
      opacity: 0,
      y: 10,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        screensGrid.classList.add('hidden');
        onboardingGrid.classList.remove('hidden');
        gsap.fromTo(onboardingGrid, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      }
    });
  });
}

// Screenshot Lightbox Modal
const lightbox = document.getElementById('screenshot-lightbox');
const lightboxImg = document.getElementById('screenshot-lightbox-img');
const lightboxCaption = document.getElementById('screenshot-lightbox-caption');
const lightboxClose = document.getElementById('screenshot-lightbox-close');

if (lightbox && lightboxImg) {
  const openLightbox = (src, caption) => {
    lightboxImg.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.screenshot-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.dataset.caption || (img ? img.alt : '');
      if (img) {
        openLightbox(img.src, caption);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'screenshot-lightbox-backdrop') {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
