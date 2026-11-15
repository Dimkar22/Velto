document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Анимация появления
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // 3. ЛОГИКА WAITLIST (Лист ожидания)
  const modal = document.getElementById('waitlistModal');
  const formBlock = document.getElementById('waitlist-form');
  const successBlock = document.getElementById('waitlist-success');
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistInput = document.getElementById('waitlist-input');

  // Открытие модалки (навешиваем на все кнопки с классом js-open-waitlist)
  document.querySelectorAll('.js-open-waitlist').forEach(btn => {
    btn.addEventListener('click', () => {
      formBlock.style.display = 'block';
      successBlock.style.display = 'none';
      waitlistInput.value = '';
      
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => waitlistInput.focus(), 300);
    });
  });

  // Закрытие модалки
  document.querySelectorAll('.js-close-modal').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // Отправка формы
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = waitlistInput.value.trim();
      if (!val) return;

      const submitBtn = waitlistForm.querySelector('button');
      submitBtn.textContent = 'Отправка...';
      
      setTimeout(() => {
        formBlock.style.display = 'none';
        successBlock.style.display = 'block';
        submitBtn.textContent = 'В лист ожидания';
      }, 800);
    });
  }


  // 4. ЖИВОЙ ЧАТ (Анимация)
  const chatBody = document.getElementById('chat-body');
  if (chatBody) {
    const messages = [
      { text: "Привет! Как тебе новый мессенджер? 👋", type: "in" },
      { text: "Просто огонь! Очень быстрый 🔥", type: "out" },
      { text: "А дизайн какой красивый 😍", type: "in" },
      { text: "Согласен! Переходим всей командой", type: "out" },
      { text: "Скоро в RuStore, ждем всех!", type: "in" }
    ];

    let msgIndex = 0;

    function playChat() {
      chatBody.innerHTML = '';
      msgIndex = 0;
      
      function showNext() {
        if (msgIndex >= messages.length) {
          setTimeout(playChat, 4000); // Перезапуск
          return;
        }

        const msg = messages[msgIndex];
        const msgDiv = document.createElement('div');
        msgDiv.className = `message message--${msg.type}`;
        msgDiv.textContent = msg.text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        msgIndex++;
        setTimeout(showNext, 1500); // Пауза между сообщениями
      }

      setTimeout(showNext, 1000);
    }

    playChat();
  }


  // 5. ЗАЩИТА
  document.addEventListener('copy', (e) => e.preventDefault());
  document.addEventListener('cut', (e) => e.preventDefault());
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'PrintScreen' || e.keyCode === 44) {
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(''); 
    }
  });

});
