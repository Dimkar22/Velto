// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Анимация появления карточек
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

// --- Логика модального окна RuStore ---
function openModal() {
  const modal = document.getElementById('ruStoreModal');
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden'; // Блокируем скролл фона
}

function closeModal() {
  const modal = document.getElementById('ruStoreModal');
  modal.classList.remove('is-active');
  document.body.style.overflow = ''; // Возвращаем скролл
}

// Закрытие окна при клике на темный фон
window.onclick = function(event) {
  const modal = document.getElementById('ruStoreModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Закрытие по кнопке Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
