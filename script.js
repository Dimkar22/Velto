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

// --- Анимация появления секций при скролле ---
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// --- ЛОГИКА WAITLIST (Лист ожидания) ---
function openWaitlist() {
  const modal = document.getElementById('waitlistModal');
  document.getElementById('waitlist-form').style.display = 'block';
  document.getElementById('waitlist-success').style.display = 'none';
  document.getElementById('waitlist-input').value = '';
  
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('waitlist-input').focus(), 300);
}

function closeModal() {
  const modal = document.getElementById('waitlistModal');
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}

function submitWaitlist(e) {
  e.preventDefault();
  const input = document.getElementById('waitlist-input').value;
  if (!input) return;

  // Имитация загрузки (здесь потом можно добавить отправку на сервер)
  const btn = e.target.querySelector('button');
  btn.textContent = 'Отправка...';
  
  setTimeout(() => {
    document.getElementById('waitlist-form').style.display = 'none';
    document.getElementById('waitlist-success').style.display = 'block';
    btn.textContent = 'В лист ожидания';
  }, 800);
}

// Закрытие модалки
window.onclick = function(event) {
  if (event.target === document.getElementById('waitlistModal')) closeModal();
}
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeModal();
});


// --- ЖИВОЙ ЧАТ С ЭФФЕКТОМ ПЕЧАТИ ---
const chatBody = document.getElementById('chat-body');
const messages = [
  { text: "Привет! Как тебе новый мессенджер? 👋", type: "in" },
  { text: "Просто огонь! Очень быстрый 🔥", type: "out" },
  { text: "А дизайн какой красивый 😍", type: "in" },
  { text: "Согласен! Переходим всей командой", type: "out" },
  { text: "Скоро в RuStore, ждем всех!", type: "in" }
];

let msgIndex = 0;

function typeMessage(messageObj) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message message--${messageObj.type} typing`;
  chatBody.appendChild(msgDiv);
  
  let i = 0;
  const text = messageObj.text;
  
  function type() {
    if (i < text.length) {
      msgDiv.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor"></span>';
      i++;
      chatBody.scrollTop = chatBody.scrollHeight;
      setTimeout(type, 40); // Скорость печати (40мс на символ)
    } else {
      msgDiv.innerHTML = text;
      msgDiv.classList.remove('typing');
      chatBody.scrollTop = chatBody.scrollHeight;
      
      msgIndex++;
      if (msgIndex < messages.length) {
        setTimeout(() => typeMessage(messages[msgIndex]), 1000); // Пауза перед следующим
      } else {
        setTimeout(() => {
          chatBody.innerHTML = '';
          msgIndex = 0;
          typeMessage(messages[0]);
        }, 4000); // Перезапуск чата через 4 секунды
      }
    }
  }
  
  type();
}

// Запуск чата
window.addEventListener('load', () => {
  setTimeout(() => typeMessage(messages[0]), 1000);
});


// --- ЗАЩИТА КОНТЕНТА ---
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === 'PrintScreen' || e.keyCode === 44) {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(''); 
  }
});
