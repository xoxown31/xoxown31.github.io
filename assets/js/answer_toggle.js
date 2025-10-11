// assets/js/answer_toggle.js
(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    // 첫 번째 단락(p:first-child)
    const paragraphs = el.querySelectorAll(':scope > p');
    if (paragraphs.length === 0) return;

    const title = paragraphs[0];
    const body = Array.from(paragraphs).slice(1);

    // 1️⃣ LaTeX/MathJax 스크립트를 타이틀 판단에서 제외
    const plainTextNodes = Array.from(title.childNodes)
      .filter(n =>
        n.nodeType === Node.TEXT_NODE &&
        n.textContent.trim().length > 0
      );
    let label = plainTextNodes.length > 0
      ? plainTextNodes.map(n => n.textContent.trim()).join(' ')
      : '정답 보기';

    // 혹시 title에 아무 텍스트가 없고 수식만 있을 경우 기본 라벨 유지
    if (!label.trim()) label = '정답 보기';

    // 2️⃣ 본문 <div> 생성
    const content = document.createElement('div');
    content.className = 'answer-content';
    body.forEach(p => content.appendChild(p));

    // 3️⃣ 상태 복원
    const uid = el.id || `answer-${idx}-${Math.random().toString(36).slice(2, 6)}`;
    const key = `jtd-answer:${location.pathname}#${uid}`;
    const saved = localStorage.getItem(key);
    const isOpen = saved === '1';
    el.setAttribute('data-open', isOpen ? 'true' : 'false');

    // 4️⃣ 타이틀 세팅
    title.classList.add('answer-title-line');
    title.setAttribute('tabindex', '0');
    title.setAttribute('role', 'button');
    title.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // 타이틀 내부에 있는 스크립트 수식은 그대로 둠 (MathJax가 처리하게)
    // 단, 텍스트만 굵게 표시되도록 함
    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;
    title.prepend(labelSpan);

    // 5️⃣ 토글 이벤트
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

    // 6️⃣ 내용 삽입
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
