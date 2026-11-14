// --- Плавная прокрутка к якорям ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Анимация появления секций при скролле (Reveal) ---
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // Отключаем наблюдение после появления
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// --- Логика модального окна RuStore ---
function openModal(event) {
  if (event) event.preventDefault(); // Блокируем скролл наверх
  const modal = document.getElementById('ruStoreModal');
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
}

function closeModal() {
  const modal = document.getElementById('ruStoreModal');
  modal.classList.remove('is-active');
  document.body.style.overflow = ''; // Возвращаем прокрутку
}

// Закрытие при клике на темный фон
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

// --- Кнопка "Наверх" ---
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  // Если прокрутили больше 300 пикселей — показываем кнопку
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('is-visible');
  } else {
    scrollTopBtn.classList.remove('is-visible');
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
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(''); 
    }
  }
  
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U' || e.key === 'p' || e.key === 'P')) {
    e.preventDefault();
  }
});
