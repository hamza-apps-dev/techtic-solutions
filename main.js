/**
 * Abdulmohsen Al Tamimi Contracting - Kingdom of Saudi Arabia
 * Interactive Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 500);
    });
    // Fallback if load already happened
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1500);
  }

  // 2. Sticky Header
  const header = document.querySelector('.tamimi-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  function stopSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (slides.length > 0) {
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startSlideShow();
      });
    });
    startSlideShow();
  }

  // 4. Drawer Menu Toggle
  const burgerBtn = document.querySelector('.burger-btn');
  const drawerMenu = document.querySelector('.mry-drawer-menu');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  function openDrawer() {
    drawerMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawerMenu?.classList.remove('active');
    document.body.style.overflow = '';
  }

  burgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);

  // Close drawer on clicking outside content
  drawerMenu?.addEventListener('click', (e) => {
    if (e.target === drawerMenu) {
      closeDrawer();
    }
  });

  // 5. Search Modal Toggle
  const searchBtn = document.querySelector('.search-btn');
  const searchModal = document.querySelector('.search-modal');
  const searchCloseBtn = document.querySelector('.search-close-btn');
  const searchInput = document.querySelector('.search-input');
  const searchForm = document.querySelector('.search-form');

  function openSearch() {
    searchModal?.classList.add('active');
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    searchModal?.classList.remove('active');
  }

  searchBtn?.addEventListener('click', openSearch);
  searchCloseBtn?.addEventListener('click', closeSearch);

  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      closeSearch();
    }
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput?.value.trim();
    if (query) {
      alert(`Searching Tamimi Contracting for: "${query}"`);
      closeSearch();
    }
  });

  document.querySelectorAll('.search-tag-badge').forEach((badge) => {
    badge.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = badge.textContent.trim();
        searchForm?.dispatchEvent(new Event('submit'));
      }
    });
  });

  // 6. Video Modal Popup
  const videoPlayBtns = document.querySelectorAll('.hero-video-play-btn, .video-trigger');
  const videoModal = document.querySelector('.video-modal');
  const videoModalClose = document.querySelector('.video-modal-close');
  const videoIframe = document.querySelector('.video-iframe');

  videoPlayBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = btn.getAttribute('data-video') || 'https://www.youtube.com/embed/JA_bzHURJuY?autoplay=1';
      if (videoIframe) {
        videoIframe.src = videoSrc;
      }
      videoModal?.classList.add('active');
    });
  });

  function closeVideo() {
    videoModal?.classList.remove('active');
    if (videoIframe) {
      videoIframe.src = '';
    }
  }

  videoModalClose?.addEventListener('click', closeVideo);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  // 7. Projects Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 8. Animated Counters on Scroll
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let counted = false;

  function runCounters() {
    if (counted || !statNumbers.length) return;
    const firstStat = statNumbers[0];
    const rect = firstStat.getBoundingClientRect();

    if (rect.top <= window.innerHeight * 0.9) {
      counted = true;
      statNumbers.forEach((stat) => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target + '+';
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + '+';
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', runCounters);
  runCounters(); // Initial check

  // 9. Keyboard Esc close for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
      closeVideo();
    }
  });

  // 10. Forms Handling
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting Abdulmohsen Al Tamimi Contracting. Your inquiry has been received and our regional office team will get in touch shortly.');
      contactForm.reset();
    });
  }

  const vendorForm = document.querySelector('#vendorForm');
  if (vendorForm) {
    vendorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your Vendor Registration profile has been submitted successfully to Tamimi Supply Chain & Procurement Division.');
      vendorForm.reset();
    });
  }
});
