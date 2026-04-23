const POSTER_SELECTOR = '.poster-wrap img';
const VIDEO_ID        = 'mainVideo';
const OVERLAY_ID      = 'modalOverlay';
const INNER_ID        = 'modalInner';

export function openModal(type) {
  const overlay = document.getElementById(OVERLAY_ID);
  const inner   = document.getElementById(INNER_ID);
  if (!overlay || !inner) return;

  if (type === 'affiche') {
    const img = document.querySelector(POSTER_SELECTOR);
    if (!img) return;
    inner.innerHTML = '<img src="' + img.src + '" alt="Affiche ArcAURA">';
  } else if (type === 'video') {
    const mainVid = document.getElementById(VIDEO_ID);
    if (!mainVid || !mainVid.src) return;
    inner.innerHTML =
      '<video controls autoplay playsinline ' +
      'style="max-width:100%;max-height:85vh;border-radius:10px;background:#000">' +
      '<source src="' + mainVid.src + '"></video>';
  } else {
    return;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const overlay = document.getElementById(OVERLAY_ID);
  const inner   = document.getElementById(INNER_ID);
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';

  const vid = overlay.querySelector('video');
  if (vid) vid.pause();
  if (inner) inner.innerHTML = '';
}

export function bindModal() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('modal-close')) {
        closeModal();
      }
    });
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if (!trigger) return;
    e.preventDefault();
    openModal(trigger.dataset.modal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
