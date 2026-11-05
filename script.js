document.documentElement.classList.add('js');

const opening = document.querySelector('.opening');
const revealItems = document.querySelectorAll('.scene:not(.letter-section)');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

opening?.classList.add('is-visible');

const envelope = document.getElementById('envelope');

envelope?.addEventListener('click', () => {
  const isOpened = envelope.classList.toggle('is-opened');
  envelope.setAttribute('aria-expanded', String(isOpened));
  envelope.setAttribute('aria-label', `点击${isOpened ? '合上' : '打开'}生日信封`);
});

const revealTravelButton = document.getElementById('revealTravel');
const travelReveal = document.getElementById('travelReveal');

revealTravelButton?.addEventListener('click', () => {
  if (!travelReveal || !revealTravelButton) return;

  travelReveal.hidden = false;
  revealTravelButton.setAttribute('aria-expanded', 'true');
  revealTravelButton.classList.add('is-opened');
  revealTravelButton.classList.add('is-collapsing');
  revealTravelButton.disabled = true;
  revealTravelButton.setAttribute('aria-hidden', 'true');
  revealTravelButton.closest('.sealed-gift-section')?.classList.add('has-revealed-gift');
  travelReveal.classList.add('is-revealed');
});

const modal = document.getElementById('videoModal');
const openVideoButton = document.getElementById('openVideo');
const closeModalButton = document.getElementById('closeModal');
const memoryVideo = document.getElementById('memoryVideo');
const videoHelp = document.querySelector('.video-help');

const openModal = () => {
  if (!modal) return;
  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');
  closeModalButton?.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('visible');
  modal.setAttribute('aria-hidden', 'true');
  memoryVideo?.pause();
  openVideoButton?.focus();
};

openVideoButton?.addEventListener('click', openModal);
closeModalButton?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

memoryVideo?.addEventListener('error', () => {
  if (videoHelp) {
    videoHelp.textContent = '暂时找不到视频。请将视频命名为 memory-video.mp4，并放在网页同一文件夹后重新打开。';
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('visible')) {
    closeModal();
  }
});
