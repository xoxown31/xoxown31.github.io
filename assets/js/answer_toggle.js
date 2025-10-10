(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    const isTitled = el.classList.contains('answer-title');

    // 기존 내용을 fragment로 복사
    const frag = document.createDocumentFragment();
    while (el.firstChild) frag.appendChild(el.firstChild);

    // 라벨 결정 (기본값)
    let label = '정답 보기';
    if (isTitled) {
      // 첫 번째 요소가 <p> 또는 텍스트일 수 있음
      const firstNode = frag.firstChild;
      if (firstNode && firstNode.textContent && firstNode.textContent.trim()) {
        label = firstNode.textContent.trim();
        frag.removeChild(firstNode);
      }
    } else if (el.dataset.answerLabel) {
      label = el.dataset.answerLabel;
    }

    // 고유 키 생성
    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;

    // 버튼 + 콘텐츠 컨테이너 구성
    const wrap = document.createElement('div');
    wrap.className = 'answer-wrap';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'answer-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', uid + '-content');
    btn.innerHTML = `
      <span class="caret" aria-hidden="true"></span>
      <span class="label">${label}</span>
    `;
    wrap.appendChild(btn);

    const content = document.createElement('div');
    content.className = 'answer-content';
    content.id = uid + '-content';
    content.appendChild(frag);

    // 기존 콜아웃 내용 유지 (Just the Docs callout 구조 보존)
    el.appendChild(wrap);
    el.appendChild(content);

    // open 상태 복원
    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // 클릭 토글
    btn.addEventListener('click', () => {
      const nowOpen = el.getAttribute('data-open') !== 'true';
      el.setAttribute('data-open', nowOpen ? 'true' : 'false');
      btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      try {
        localStorage.setItem(key, nowOpen ? '1' : '0');
      } catch (e) {}
    });
  }

  // Just the Docs가 DOM을 모두 만든 후 실행되도록 보장
  function initWhenReady() {
    const targets = document.querySelectorAll(
      'blockquote.answer, blockquote.answer-title, p.answer, p.answer-title'
    );
    if (!targets.length) {
      // 콜아웃 렌더링이 지연되면 다시 시도
      return setTimeout(initWhenReady, 150);
    }
    targets.forEach((el, i) => enhance(el, i));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initWhenReady);
  else initWhenReady();
})();