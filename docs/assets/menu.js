// Phone "Menu" button and the "about" dropdown.
// Escape or a click/tap outside closes whichever is open.
(function () {
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-toggle');
  var subBtn = document.querySelector('.sub-toggle');
  var item = subBtn && subBtn.parentElement;

  function subOpen() { return !!item && item.classList.contains('open'); }
  function setSub(open) {
    if (!item) return;
    item.classList.toggle('open', open);
    subBtn.setAttribute('aria-expanded', open);
  }
  function menuOpen() { return !!menuBtn && header.classList.contains('open'); }
  function setMenu(open) {
    if (!menuBtn) return;
    header.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!menuOpen()); });
  }
  if (subBtn) {
    subBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setSub(!subOpen());
    });
  }

  document.addEventListener('click', function (e) {
    if (subOpen() && !item.contains(e.target)) setSub(false);
    if (menuOpen() && !header.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    // Only move focus when something was actually open, so Escape elsewhere
    // (e.g. while typing in the contact form) leaves the visitor where they are.
    if (subOpen()) { setSub(false); subBtn.focus(); }
    else if (menuOpen()) { setMenu(false); menuBtn.focus(); }
  });
})();
