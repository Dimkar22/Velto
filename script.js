document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Модальное окно
  const modal = document.getElementById('modal-container');
  const allBlocks = document.querySelectorAll('.modal-block');

  document.querySelectorAll('.js-open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      allBlocks.forEach(b => b.style.display = 'none');
      
      const activeBlock = document.querySelector(`.modal-block[data-block="${target}"]`);
      if (activeBlock) activeBlock.style.display = 'block';

      modal.classList.add('is-active');
    });
  });

  document.querySelectorAll('.js-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
  });

  // 2. Отправка формы
  const form = document.getElementById('waitlist-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      const submitBtn = form.querySelector('button[type="submit"]');
      
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      })
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 200 && result.success) {
          document.querySelector('.modal-block[data-block="general"]').style.display = 'none';
          document.querySelector('.modal-block[data-block="success"]').style.display = 'block';
          form.reset();
        } else {
          alert("Ошибка отправки.");
        }
      })
      .finally(() => {
        submitBtn.textContent = 'Отправить';
        submitBtn.disabled = false;
      });
    });
  }

  // 3. Живой чат
  const chatBody = document.getElementById('chat-body');
  if (chatBody) {
    const messages = [
      { text: "Привет! Как тебе новый мессенджер? 👋", type: "in" },
      { text: "Просто огонь! Очень быстрый 🔥", type: "out" },
      { text: "Согласен! Переходим всей командой", type: "out" }
    ];
    
    let msgIndex = 0;
    function playChat() {
      chatBody.innerHTML = '';
      msgIndex = 0;
      showNext();
    }

    function showNext() {
      if (msgIndex >= messages.length) { setTimeout(playChat, 4000); return; }
      const msg = messages[msgIndex];
      const msgDiv = document.createElement('div');
      msgDiv.className = `message message--${msg.type}`;
      msgDiv.textContent = msg.text;
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
      msgIndex++;
      setTimeout(showNext, 1500);
    }
    playChat();
  }
});
