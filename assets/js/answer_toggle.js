(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    const isTitled = el.classList.contains('answer-title');
    const frag = document.createDocumentFragment();
    while (el.firstChild) frag.appendChild(el.firstChild);

    // 1️⃣ 첫 문단 텍스트 추출 후 제거
    let label = '정답 보기';
    if (isTitled) {
      const firstEl = frag.querySelector('p, :scope > *');
      if (firstEl && firstEl.textContent.trim()) {
        label = firstEl.textContent.trim();
        firstEl.remove(); // 본문에서는 제거
      }
    } else if (el.dataset.answerLabel) {
      label = el.dataset.answerLabel;
    }

    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;

    // 2️⃣ 타이틀 줄(.answer-wrap) 생성
    const wrap = document.createElement('div');
    wrap.className = 'answer-wrap';
    wrap.setAttribute('role', 'button');
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-expanded', 'false');
    wrap.innerHTML = `<span class="caret" aria-hidden="true"></span><span class="label">${label}</span>`;

    // 3️⃣ 본문 영역
    const content = document.createElement('div');
    content.className = 'answer-content';
    content.id = uid + '-content';
    content.appendChild(frag);

    el.appendChild(wrap);
    el.appendChild(content);

    // 4️⃣ 상태 복원
    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');
    wrap.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // 5️⃣ 토글 핸들러
    const toggle = () => {
      const nowOpen = el.getAttribute('data-open') !== 'true';
      el.setAttribute('data-open', nowOpen ? 'true' : 'false');
      wrap.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      try { localStorage.setItem(key, nowOpen ? '1' : '0'); } catch (e) {}
    };
    wrap.addEventListener('click', toggle);
    wrap.addEventListener('keypress', e => {
      if (e.key === ' ' || e.key === 'Enter') toggle();
    });
  }

  // 렌더 완료 후 실행
  function initWhenReady() {
    const targets = document.querySelectorAll(
      'blockquote.answer, blockquote.answer-title, p.answer, p.answer-title'
    );
    if (!targets.length) return setTimeout(initWhenReady, 150);
    targets.forEach((el, i) => enhance(el, i));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initWhenReady);
  else initWhenReady();
})();