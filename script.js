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
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// --- Кнопка "Наверх" ---
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('is-visible');
  } else {
    scrollTopBtn.classList.remove('is-visible');
  }
});

// --- Модальное окно (Универсальное) ---
function showComingSoon(platform) {
  const modal = document.getElementById('infoModal');
  const title = document.getElementById('modal-title');
  const text = document.getElementById('modal-text');
  const icon = document.getElementById('modal-icon');

  if (platform === 'RuStore') {
    title.textContent = 'Скоро в RuStore!';
    text.textContent = 'Мы активно готовим релиз Velto для магазина приложений. Следите за новостями в нашем Telegram-канале!';
    icon.textContent = '📱';
  } else if (platform === 'iOS') {
    title.textContent = 'iOS версия скоро будет!';
    text.textContent = 'Мы активно разрабатываем приложение для iPhone. Следите за новостями в нашем Telegram-канале!';
    icon.textContent = '🍏';
  } else if (platform === 'PC (Windows / macOS)') {
    title.textContent = 'Версия для ПК скоро будет!';
    text.textContent = 'Приложение для Windows и macOS уже в разработке. Мы сообщим, как только оно будет готово!';
    icon.textContent = '💻';
  }

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('infoModal');
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}

// Закрытие при клике на фон
window.onclick = function(event) {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) closeModal();
}

// Закрытие на Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeModal();
});

// --- ЖИВОЙ ЧАТ В ТЕЛЕФОНЕ (Анимация) ---
const chatBody = document.getElementById('chat-body');
const messages = [
  { text: "Привет! Как тебе новый мессенджер? 👋", type: "in", delay: 1000 },
  { text: "Просто огонь! Очень быстрый 🔥", type: "out", delay: 2500 },
  { text: "А дизайн какой красивый 😍", type: "in", delay: 4500 },
  { text: "Согласен! Переходим всей командой", type: "out", delay: 6000 },
  { text: "Очень ждем релиз в RuStore!", type: "in", delay: 8000 }
];

function playChatAnimation() {
  chatBody.innerHTML = '';
  messages.forEach((msg, index) => {
    setTimeout(() => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `message message--${msg.type}`;
      msgDiv.textContent = msg.text;
      msgDiv.style.animation = `msgAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
      chatBody.appendChild(msgDiv);
      
      chatBody.scrollTop = chatBody.scrollHeight;

      if (index === messages.length - 1) {
        setTimeout(playChatAnimation, 5000);
      }
    }, msg.delay);
  });
}

window.addEventListener('load', playChatAnimation);

// --- ЗАЩИТА КОНТЕНТА ---
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === 'PrintScreen' || e.keyCode === 44) {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(''); 
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U' || e.key === 'p' || e.key === 'P')) {
    e.preventDefault();
  }
});
