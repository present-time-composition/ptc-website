// Phone "Menu" button and the "about" dropdown.
(function () {
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-toggle');
  var subBtn = document.querySelector('.sub-toggle');
  var item = subBtn && subBtn.parentElement;  function setSub(open) {
    if (!item) return;
    item.classList.toggle('open', open);
    subBtn.setAttribute('aria-expanded', open);
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }
  if (subBtn) {
    subBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setSub(!item.classList.contains('open'));
    });
    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) setSub(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setSub(false); subBtn.focus(); }
    });
  }
})();
