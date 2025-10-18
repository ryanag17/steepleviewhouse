// script.js — FINAL COMBINED VERSION

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================
     LIGHTBOX
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
     GALLERY / SLIDESHOW MANAGER
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
        restartAuto();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.gallery-dot'));

    // Initialize first image
    images.forEach((img, i) => {
      img.classList.toggle('active', i === 0);
    });

    function showSlide(index) {
      const nextIndex = ((index % images.length) + images.length) % images.length;
      images[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
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

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartAuto(); });

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

    gallery.addEventListener('mouseenter', stopAuto);
    gallery.addEventListener('mouseleave', startAuto);

    startAuto();
  });


  /* ==========================================
     RESPONSIVE NAVBAR TOGGLE
     ========================================== */
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');

  if (toggle && navList) {
    // Create overlay element once
    const overlay = document.createElement('div');
    overlay.classList.add('mobile-overlay');
    document.body.appendChild(overlay);

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navList.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
      toggle.classList.remove('active');
      navList.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

});
