// assets/js/answer_toggle.js
(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    // 1️⃣ p 구조 확보
    const paragraphs = el.querySelectorAll(':scope > p');
    if (paragraphs.length === 0) return;

    const title = paragraphs[0];
    const rest = Array.from(paragraphs).slice(1);

    // 2️⃣ MathJax script를 제외한 첫 텍스트 노드만 라벨로 추출
    let label = '정답 보기';
    for (const node of title.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        label = node.textContent.trim();
        node.remove(); // 원래 텍스트 제거 (중복 방지)
        break;
      }
    }

    // 3️⃣ 본문 컨테이너 생성
    const content = document.createElement('div');
    content.className = 'answer-content';
    rest.forEach(p => content.appendChild(p));

    // 4️⃣ 상태 키 및 복원
    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;
    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');

    // 5️⃣ 타이틀 라인 세팅
    title.classList.add('answer-title-line');
    title.setAttribute('tabindex', '0');
    title.setAttribute('role', 'button');
    title.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // 화살표 아이콘 추가 (맨 앞)
    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');
    title.prepend(caret);

    // 만약 label이 완전히 제거되었으면 텍스트 노드 추가
    if (!title.textContent.trim()) {
      title.appendChild(document.createTextNode(label));
    }

    // 6️⃣ 클릭 시 토글
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

    // 7️⃣ 본문 삽입
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
