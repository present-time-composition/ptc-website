// Contact form: sends the message straight from the page through a form service
// (Web3Forms), so visitors don't need an email app. GitHub Pages can't send email itself.
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var note = form.querySelector('.form-note');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    if (f.botcheck && f.botcheck.checked) return; // filled in by spam bots only

    var key = form.dataset.key;
    if (!key || key === 'YOUR_ACCESS_KEY') {
      note.textContent = 'The contact form isn’t connected yet.';
      return;
    }

    var name = f.first.value.trim() + ' ' + f.last.value.trim();
    button.disabled = true;
    note.textContent = 'Sending…';

    fetch(form.dataset.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: 'Message from the PTC website: ' + name,
        from_name: 'PTC website',
        name: name,
        email: f.email.value.trim(),
        message: f.message.value.trim()
      })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok && d.success, d: d }; }); })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          note.textContent = 'Thank you, your message has been sent. We’ll get back to you as soon as possible.';
        } else {
          note.textContent = 'Sorry, your message couldn’t be sent. Please try again later.';
        }
      })
      .catch(function () {
        note.textContent = 'Sorry, your message couldn’t be sent. Please check your connection and try again.';
      })
      .then(function () { button.disabled = false; });
  });
})();
