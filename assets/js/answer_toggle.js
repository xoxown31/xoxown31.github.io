// assets/js/answer_toggle.js
(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    // 1️⃣ callout 내부의 <p> 수집
    const paragraphs = el.querySelectorAll(':scope > p');
    if (paragraphs.length < 2) return; // 타이틀 + 본문이 있어야 토글 가능

    const title = paragraphs[0];
    const contentParas = Array.from(paragraphs).slice(1);

    // 2️⃣ 본문 래퍼 생성
    const content = document.createElement('div');
    content.className = 'answer-content';
    contentParas.forEach(p => content.appendChild(p));

    // 3️⃣ 고유 key로 상태 복원
    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;
    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');

    // 4️⃣ 타이틀 표시 및 클릭 이벤트
    title.classList.add('answer-title-line');
    title.setAttribute('tabindex', '0');
    title.setAttribute('role', 'button');
    title.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    const toggle = () => {
      const nowOpen = el.getAttribute('data-open') !== 'true';
      el.setAttribute('data-open', nowOpen ? 'true' : 'false');
      title.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      try { localStorage.setItem(key, nowOpen ? '1' : '0'); } catch (e) {}
    };

    title.addEventListener('click', toggle);
    title.addEventListener('keypress', e => {
      if (e.key === ' ' || e.key === 'Enter') toggle();
    });

    // 5️⃣ 원래 위치에 내용 추가
    el.appendChild(content);
  }

  function initWhenReady() {
    const list = document.querySelectorAll('blockquote.answer, blockquote.answer-title');
    if (!list.length) return setTimeout(initWhenReady, 150);
    list.forEach((el, i) => enhance(el, i));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initWhenReady);
  else initWhenReady();
})();
