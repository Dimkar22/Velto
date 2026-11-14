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
function openModal(event) {
  if (event) event.preventDefault(); // Блокируем стандартное поведение
  const modal = document.getElementById('ruStoreModal');
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('ruStoreModal');
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}

// Закрытие при клике на фон
window.onclick = function(event) {
  const modal = document.getElementById('ruStoreModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Закрытие на Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// --- ЗАЩИТА КОНТЕНТА ---

// 1. Запрет на копирование (Ctrl+C / Cmd+C)
document.addEventListener('copy', (e) => {
  e.preventDefault();
});

// 2. Запрет на вырезание
document.addEventListener('cut', (e) => {
  e.preventDefault();
});

// 3. Запрет на правую кнопку мыши (контекстное меню)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 4. Блокировка клавиш (PrintScreen, Ctrl+S, Ctrl+U, Ctrl+P)
document.addEventListener('keydown', (e) => {
  if (e.key === 'PrintScreen' || e.keyCode === 44) {
    e.preventDefault();
    // Очищаем буфер обмена, чтобы скриншот не сохранился
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(''); 
    }
  }
  
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U' || e.key === 'p' || e.key === 'P')) {
    e.preventDefault();
  }
});
