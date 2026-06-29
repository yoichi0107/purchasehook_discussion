/* パーチェイスフック理論 LP — main.js
   スクロールで各セクションを軽くフェードイン（IntersectionObserver）。
   派手なアニメ・パララックスは行わない。外部依存なし。 */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var targets = document.querySelectorAll(".reveal");

  // フォールバック：IO 非対応 or モーション低減設定なら即表示
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  targets.forEach(function (el) {
    io.observe(el);
  });
})();
