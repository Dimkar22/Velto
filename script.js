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

  // 3. РАБОТА МОДАЛЬНОГО ОКНА
  const modal = document.getElementById('modal-container');
  const blocks = document.querySelectorAll('.modal-block');

  document.querySelectorAll('.js-open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      blocks.forEach(b => b.style.display = 'none');
      const activeBlock = document.querySelector(`.modal-block[data-block="${target}"]`);
      if (activeBlock) activeBlock.style.display = 'block';

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

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

  // 4. ЖИВОЙ ЧАТ
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
          setTimeout(playChat, 4000);
          return;
        }
        const msg = messages[msgIndex];
        const msgDiv = document.createElement('div');
        msgDiv.className = `message message--${msg.type}`;
        msgDiv.textContent = msg.text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        msgIndex++;
        setTimeout(showNext, 1500);
      }
      setTimeout(showNext, 1000);
    }
    playChat();
  }

  // 5. ЗАЩИТА
  document.addEventListener('copy', (e) => e.preventDefault());
  document.addEventListener('cut', (e) => e.preventDefault());
  document.addEventListener('contextmenu', (e) => e.preventDefault());
});
