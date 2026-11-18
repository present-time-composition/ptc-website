// Click-to-load videos: Vimeo / YouTube only load (and receive the visitor's data)
// after the visitor presses play. Until then a local photo is shown.
(function () {
  document.querySelectorAll('.video-consent').forEach(function (box) {
    var button = box.querySelector('.video-play');
    if (!button) return;
    button.addEventListener('click', function () {
      var src = box.dataset.src;
      src += (src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
      var frame = document.createElement('iframe');
      frame.src = src;
      frame.title = box.dataset.title || 'Video';
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      box.innerHTML = '';
      box.classList.remove('video-consent');
      box.appendChild(frame);
    });
  });
})();
