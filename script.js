const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const dateInput = document.getElementById('travelDate');
if (dateInput) {
  dateInput.setAttribute('min', '2026-02-01');
  dateInput.setAttribute('max', '2026-02-29');
  dateInput.value = '2026-02-14';
}

const modal = document.getElementById('videoModal');
const openVideoButton = document.getElementById('openVideo');
const playMemoryButton = document.getElementById('playMemory');
const closeModalButton = document.getElementById('closeModal');
const previewLinkButton = document.getElementById('previewLink');

const openModal = () => {
  if (!modal) return;
  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('visible');
  modal.setAttribute('aria-hidden', 'true');
};

openVideoButton?.addEventListener('click', openModal);
playMemoryButton?.addEventListener('click', openModal);
closeModalButton?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

previewLinkButton?.addEventListener('click', () => {
  window.alert('把你的视频链接放在这里：例如 https://your-video-link.com');
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
