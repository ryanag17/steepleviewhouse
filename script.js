// script.js - REPLACE YOUR OLD FILE WITH THIS

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================
     LIGHTBOX (unchanged logic)
     ========================== */
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const closeBtn = document.querySelector('.lightbox-close');
  let lbCurrent = 0;

  function showLightbox(idx) {
    if (!thumbs[idx]) return;
    lbImg.src = thumbs[idx].src;
    lightbox.style.display = 'flex';
    lbCurrent = idx;
  }

  if (thumbs.length) {
    thumbs.forEach((img, idx) => img.addEventListener('click', () => showLightbox(idx)));
  }
  if (prev) prev.addEventListener('click', () => showLightbox((lbCurrent - 1 + thumbs.length) % thumbs.length));
  if (next) next.addEventListener('click', () => showLightbox((lbCurrent + 1) % thumbs.length));
  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.style.display = 'none';
    });
  }

  /* ==========================================
     Unified Gallery / Slideshow manager
     ========================================== */

  const galleries = document.querySelectorAll('.apartment-gallery');

  galleries.forEach((gallery) => {
    const images = Array.from(gallery.querySelectorAll('.gallery-image-wrapper img'));
    const dotsContainer = gallery.querySelector('.gallery-dots');
    const prevBtn = gallery.querySelector('.prev');
    const nextBtn = gallery.querySelector('.next');

    if (!images.length || !dotsContainer) return;

    // Configuration
    const AUTO_MS = 4000; // auto slide time (ms)
    let currentIndex = 0;
    let intervalId = null;

    // Ensure dotsContainer is empty (prevent duplicates if re-run)
    dotsContainer.innerHTML = '';

    // Create dots matching images
    images.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('gallery-dot');
      dot.dataset.index = i;
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.dataset.index);
        showSlide(idx);
        restartAuto(); // keep implicit user interactions in sync with auto timer
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.gallery-dot'));

    // Initialize classes based on markup — ensure exactly one active
    images.forEach((img, i) => {
      img.classList.toggle('active', i === 0);
    });

    function showSlide(index) {
      const nextIndex = ((index % images.length) + images.length) % images.length; // normalize
      // remove old actives
      images[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');

      // set new actives
      images[nextIndex].classList.add('active');
      dots[nextIndex].classList.add('active');

      currentIndex = nextIndex;
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    // Prev / Next buttons
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartAuto(); });

    // Auto slide management
    function startAuto() {
      stopAuto();
      intervalId = setInterval(nextSlide, AUTO_MS);
      gallery.dataset.autoplay = "true";
    }

    function stopAuto() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      gallery.dataset.autoplay = "false";
    }

    function restartAuto() {
      stopAuto();
      startAuto();
    }

    // Pause on hover and resume
    gallery.addEventListener('mouseenter', stopAuto);
    gallery.addEventListener('mouseleave', startAuto);

    // Start automatic rotation
    startAuto();
  });

});

// Responsive menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});
