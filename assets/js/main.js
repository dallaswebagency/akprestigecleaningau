// AK Prestige Cleaning - site scripts
(function () {
  // mobile nav
  var b = document.querySelector('.burger'), m = document.querySelector('.mnav');
  if (b && m) {
    b.addEventListener('click', function () { m.classList.add('open'); });
    m.querySelector('.close').addEventListener('click', function () { m.classList.remove('open'); });
    m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.classList.remove('open'); }); });
  }

  // reveal on scroll
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // before / after slider
  document.querySelectorAll('.ba').forEach(function (ba) {
    var r = ba.querySelector('input'), w = ba.querySelector('.after-wrap'), h = ba.querySelector('.handle');
    function set(v) { w.style.clipPath = 'inset(0 0 0 ' + v + '%)'; h.style.left = v + '%'; }
    r.addEventListener('input', function () { set(r.value); });
    set(r.value);
  });

  // services tabs: highlight current section
  var tabs = document.querySelectorAll('.svc-tabs a');
  if (tabs.length && 'IntersectionObserver' in window) {
    var map = {};
    tabs.forEach(function (t) { var s = document.querySelector(t.getAttribute('href')); if (s) map[s.id] = t; });
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { tabs.forEach(function (t) { t.classList.remove('on'); }); map[e.target.id].classList.add('on'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { tio.observe(document.getElementById(id)); });
  }

  // quote forms: compose an email to the business with the details entered
  document.querySelectorAll('form.quote-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var lines = [], fd = new FormData(f), seen = {};
      fd.forEach(function (v, k) {
        if (!v) return;
        if (seen[k] !== undefined) { lines[seen[k]] += ', ' + v; return; }
        seen[k] = lines.length; lines.push(k + ': ' + v);
      });
      var body = encodeURIComponent('Hi AK Prestige Cleaning,\n\nI would like a free quote.\n\n' + lines.join('\n'));
      window.location.href = 'mailto:Bailey@akprestigecleaningau.com?subject=' + encodeURIComponent('Free Quote Request') + '&body=' + body;
      var ok = f.querySelector('.form-ok'); if (ok) ok.classList.add('show');
    });
  });

  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
