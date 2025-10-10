(function () {
  if (window.__AnswerToggleInit) return;
  window.__AnswerToggleInit = true;

  function enhance(el, idx) {
    const isTitled = el.classList.contains('answer-title');
    const frag = document.createDocumentFragment();
    [...el.childNodes].forEach(n => frag.appendChild(n));

    let label = '정답 보기';
    if (isTitled) {
      const firstP = frag.querySelector && frag.querySelector('p');
      if (firstP && firstP.textContent.trim()) {
        label = firstP.textContent.trim();
        firstP.remove();
      }
    } else if (el.dataset.answerLabel) {
      label = el.dataset.answerLabel;
    }

    const key = 'jtd-answer:' + location.pathname + '#' + (el.id || idx);

    const wrap = document.createElement('div');
    wrap.className = 'answer-wrap';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'answer-toggle';
    btn.setAttribute('aria-expanded', 'false');
    const cid = (el.id || ('answer-' + idx)) + '-content';
    btn.setAttribute('aria-controls', cid);
    btn.innerHTML =
      '<span class="caret" aria-hidden="true"></span><span class="label"></span>';
    btn.querySelector('.label').textContent = label;

    const content = document.createElement('div');
    content.className = 'answer-content';
    content.id = cid;
    content.appendChild(frag);

    el.innerHTML = '';
    el.appendChild(wrap);
    el.appendChild(content);

    const saved = localStorage.getItem(key);
    const open = saved === '1';
    el.setAttribute('data-open', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');

    btn.addEventListener('click', () => {
      const nowOpen = el.getAttribute('data-open') !== 'true';
      el.setAttribute('data-open', nowOpen ? 'true' : 'false');
      btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      try { localStorage.setItem(key, nowOpen ? '1' : '0'); } catch (e) {}
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelectorAll(
      'blockquote.answer, blockquote.answer-title, p.answer, p.answer-title'
    );
    list.forEach((el, i) => enhance(el, i));
  });
})();
