(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    const paragraphs = el.querySelectorAll('p');
    if (paragraphs.length === 0) return;

    const title = paragraphs[0];
    const body = Array.from(paragraphs).slice(1);

    // 본문 영역을 <div class="answer-content">로 감싸기
    const content = document.createElement('div');
    content.className = 'answer-content';
    body.forEach(p => content.appendChild(p));

    // 상태 복원용 키
    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;

    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');

    // title 클릭 시 토글
    title.classList.add('answer-title-line');
    title.addEventListener('click', () => {
      const nowOpen = el.getAttribute('data-open') !== 'true';
      el.setAttribute('data-open', nowOpen ? 'true' : 'false');
      try { localStorage.setItem(key, nowOpen ? '1' : '0'); } catch (e) {}
    });

    // 삽입
    el.appendChild(content);
  }

  function initWhenReady() {
    const list = document.querySelectorAll('blockquote.answer, p.answer');
    if (!list.length) return setTimeout(initWhenReady, 150);
    list.forEach((el, i) => enhance(el, i));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initWhenReady);
  else initWhenReady();
})();
