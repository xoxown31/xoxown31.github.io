// assets/js/answer_toggle.js
(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    const paragraphs = el.querySelectorAll(':scope > p');
    if (paragraphs.length < 2) return;

    const title = paragraphs[0];
    const rest = Array.from(paragraphs).slice(1);

    // 본문 wrapper
    const content = document.createElement('div');
    content.className = 'answer-content';
    rest.forEach(p => content.appendChild(p));

    // 상태 저장
    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;
    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');

    // 타이틀 line
    title.classList.add('answer-title-line');
    title.setAttribute('tabindex', '0');
    title.setAttribute('role', 'button');
    title.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // 화살표 추가
    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');
    title.prepend(caret);

    // toggle
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

    // 본문 추가
    el.appendChild(content);
  }

  function initWhenReady() {
    const list = document.querySelectorAll('blockquote.answer, blockquote.answer-title');
    if (!list.length) return setTimeout(initWhenReady, 150);
    list.forEach((el, i) => enhance(el, i));
  }

  // ✅ 핵심 부분: MathJax 렌더링 완료 후 실행
  function runAfterMathJax() {
    if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise.then(() => {
        initWhenReady();
      });
    } else {
      // MathJax가 없는 경우 fallback
      if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', initWhenReady);
      else initWhenReady();
    }
  }

  runAfterMathJax();
})();