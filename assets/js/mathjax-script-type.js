// This script ensures MathJax processes <script type="math/tex"> blocks
// See: https://docs.mathjax.org/en/latest/web/typeset.html
window.addEventListener('DOMContentLoaded', function() {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
});
