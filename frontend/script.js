document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.gallery-thumb'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const closeBtn = document.querySelector('.lightbox-close');
  let current = 0;

  function showLightbox(idx) {
    lbImg.src = images[idx].src;
    lightbox.style.display = 'flex';
    current = idx;
  }

  images.forEach((img, idx) => img.addEventListener('click', () => showLightbox(idx)));
  prev.addEventListener('click', () => showLightbox((current-1+images.length)%images.length));
  next.addEventListener('click', () => showLightbox((current+1)%images.length));
  closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.apartment-gallery');

  galleries.forEach(gallery => {
    let index = 0;
    const images = gallery.querySelectorAll('img');
    if (images.length === 0) return;

    images[index].classList.add('active');

    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 4000); // 4 seconds per slide
  });
});
