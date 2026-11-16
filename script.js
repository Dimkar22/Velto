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

  // 2. Анимация появления элементов
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 3. Работа модального окна
  const modal = document.getElementById('modal-container');
  const allBlocks = document.querySelectorAll('.modal-block');
  const formBlock = document.querySelector('.modal-block[data-block="general"]');
  const successBlock = document.querySelector('.modal-block[data-block="success"]');

  document.querySelectorAll('.js-open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      allBlocks.forEach(b => b.style.display = 'none');
      
      if (target === 'ios') {
        document.querySelector('.modal-block[data-block="ios"]').style.display = 'block';
      } else if (target === 'pc') {
        document.querySelector('.modal-block[data-block="pc"]').style.display = 'block';
      } else {
        formBlock.style.display = 'block';
        formBlock.querySelector('form').reset();
      }
      
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

  // 4. Отправка формы через Web3Forms
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
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        body: json
      })
      .then(async (response) => {
        const result = await response.json();
        
        if (response.status === 200 && result.success) {
          formBlock.style.display = 'none';
          successBlock.style.display = 'block';
          form.reset();
        } else {
          alert("Ошибка при отправке. Попробуйте позже.");
        }
      })
      .catch(() => {
        alert("Ошибка сети. Проверьте интернет.");
      })
      .finally(() => {
        submitBtn.textContent = 'Отправить заявку';
        submitBtn.disabled = false;
      });
    });
  }

  // 5. Живой чат с эффектом "Печатает..."
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
      showNext();
    }

    function showNext() {
      if (msgIndex >= messages.length) {
        setTimeout(playChat, 4000);
        return;
      }

      const msg = messages[msgIndex];
      
      if (msg.type === 'in') {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message--in';
        typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
          chatBody.removeChild(typingDiv);
          addMessage(msg);
        }, 1500);
      } else {
        setTimeout(() => {
          addMessage(msg);
        }, 500);
      }
    }

    function addMessage(msg) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `message message--${msg.type}`;
      msgDiv.textContent = msg.text;
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
      
      msgIndex++;
      setTimeout(showNext, 1200);
    }

    playChat();
  }

  // 6. Защита от копирования
  document.addEventListener('copy', (e) => e.preventDefault());
  document.addEventListener('cut', (e) => e.preventDefault());
  document.addEventListener('contextmenu', (e) => e.preventDefault());
});
