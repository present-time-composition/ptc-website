// Photo albums: thumbnails open a full-screen viewer with previous/next,
// keyboard arrows, Escape to close, and swipe on phones.
(function () {
  var galleries = document.querySelectorAll('.album');
  if (!galleries.length) return;

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

  var img = box.querySelector('.lb-img');
  var count = box.querySelector('.lb-count');
  var links = [], index = 0, lastFocus = null;

  function show(i) {
    index = (i + links.length) % links.length;
    var a = links[index];
    img.src = a.getAttribute('href');
    img.alt = a.querySelector('img').alt;
    count.textContent = (index + 1) + ' / ' + links.length;
    // load the next photo in advance
    var next = links[(index + 1) % links.length];
    if (next) { (new Image()).src = next.getAttribute('href'); }
  }
  function open(list, i) {
    links = list; lastFocus = document.activeElement;
    box.hidden = false; document.body.classList.add('lb-open');
    show(i);
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true; document.body.classList.remove('lb-open');
    img.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  galleries.forEach(function (g) {
    var list = Array.prototype.slice.call(g.querySelectorAll('a.album-item'));
    list.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(list, i); });
    });
  });

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
  var startX = null;
  box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
