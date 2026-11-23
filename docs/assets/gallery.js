// Photo albums as a slideshow: one large photo at a time with previous/next
// arrows and a counter. Click the photo for a full-screen view.
// Keyboard arrows, swipe on phones, Escape closes full screen.
// (Without JavaScript the album falls back to a plain grid of thumbnails.)
(function () {
  var albums = document.querySelectorAll('.album');
  if (!albums.length) return;

  // ---------- full-screen viewer (shared) ----------
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo viewer');
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-close" type="button" aria-label="Close">×</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous photo">‹</button>' +
    '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-count"></figcaption></figure>' +
    '<button class="lb-next" type="button" aria-label="Next photo">›</button>';
  document.body.appendChild(box);
  var lbImg = box.querySelector('.lb-img'), lbCount = box.querySelector('.lb-count');
  var active = null, lastFocus = null;

  function lbShow() {
    var s = active;
    lbImg.src = s.items[s.index].big;
    lbImg.alt = s.items[s.index].alt;
    lbCount.textContent = (s.index + 1) + ' / ' + s.items.length;
  }
  function lbOpen(show) {
    active = show; lastFocus = document.activeElement;
    box.hidden = false; document.body.classList.add('lb-open');
    lbShow(); box.querySelector('.lb-close').focus();
  }
  function lbClose() {
    box.hidden = true; document.body.classList.remove('lb-open');
    lbImg.removeAttribute('src');
    if (active) active.go(active.index); // keep the slideshow in step with the viewer
    if (lastFocus) lastFocus.focus();
  }
  function lbStep(d) { active.index = (active.index + d + active.items.length) % active.items.length; lbShow(); }
  box.querySelector('.lb-close').addEventListener('click', lbClose);
  box.querySelector('.lb-prev').addEventListener('click', function () { lbStep(-1); });
  box.querySelector('.lb-next').addEventListener('click', function () { lbStep(1); });
  box.addEventListener('click', function (e) { if (e.target === box) lbClose(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') lbClose();
    else if (e.key === 'Tab') { // keep keyboard focus inside the viewer
      var btns = box.querySelectorAll('button');
      var first = btns[0], last = btns[btns.length - 1];
      if (!box.contains(document.activeElement)) { first.focus(); e.preventDefault(); }
      else if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
    else if (e.key === 'ArrowLeft') lbStep(-1);
    else if (e.key === 'ArrowRight') lbStep(1);
  });
  addSwipe(box, function (d) { if (!box.hidden) lbStep(d); });

  // ---------- slideshow per album ----------
  albums.forEach(function (album) {
    var items = Array.prototype.map.call(album.querySelectorAll('a.album-item'), function (a) {
      return { big: a.getAttribute('href'), alt: a.querySelector('img').alt };
    });
    if (!items.length) return;

    var show = { items: items, index: 0 };
    var wrap = document.createElement('div');
    wrap.className = 'slideshow';
    wrap.innerHTML =
      '<div class="ss-frame">' +
        '<button class="ss-open" type="button" aria-label="Open photo full screen"><img class="ss-img" alt=""></button>' +
        '<button class="ss-prev" type="button" aria-label="Previous photo">‹</button>' +
        '<button class="ss-next" type="button" aria-label="Next photo">›</button>' +
      '</div>' +
      '<p class="ss-count meta" aria-live="polite"></p>';
    album.parentNode.insertBefore(wrap, album);
    album.hidden = true;

    var img = wrap.querySelector('.ss-img'), count = wrap.querySelector('.ss-count');
    show.go = function (i) {
      show.index = (i + items.length) % items.length;
      img.src = items[show.index].big;
      img.alt = items[show.index].alt;
      count.textContent = (show.index + 1) + ' / ' + items.length;
      (new Image()).src = items[(show.index + 1) % items.length].big; // preload next
    };
    show.go(0);

    wrap.querySelector('.ss-prev').addEventListener('click', function () { show.go(show.index - 1); });
    wrap.querySelector('.ss-next').addEventListener('click', function () { show.go(show.index + 1); });
    wrap.querySelector('.ss-open').addEventListener('click', function () { lbOpen(show); });
    wrap.tabIndex = -1;
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { show.go(show.index - 1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { show.go(show.index + 1); e.preventDefault(); }
    });
    addSwipe(wrap.querySelector('.ss-frame'), function (d) { show.go(show.index + d); });
  });

  function addSwipe(el, cb) {
    var x = null;
    el.addEventListener('touchstart', function (e) { x = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x === null) return;
      var dx = e.changedTouches[0].clientX - x;
      if (Math.abs(dx) > 50) cb(dx < 0 ? 1 : -1);
      x = null;
    });
  }
})();
