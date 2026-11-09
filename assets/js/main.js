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

  // review pop-ups: show up to 2 Google reviews once per visit
  (function () {
    var box = document.getElementById('rtoast'), R = window.AK_REVIEWS || [];
    if (!box || !R.length) return;
    try { if (sessionStorage.getItem('akRevShown')) return; sessionStorage.setItem('akRevShown', '1'); } catch (e) {}
    var order = R.slice().sort(function () { return Math.random() - .5; }).slice(0, 2), i = 0, closed = false, t;
    function fill(r) {
      box.querySelector('.rt-name').textContent = r.n;
      box.querySelector('.rt-when').textContent = r.w;
      box.querySelector('.rt-av').textContent = r.n.charAt(0);
      box.querySelector('.rt-text').textContent = '“' + r.t + '”';
    }
    function hide(next) { box.classList.remove('show'); setTimeout(function () { box.hidden = true; if (next) next(); }, 450); }
    function show() {
      if (closed || i >= order.length) return;
      fill(order[i++]); box.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('show'); }); });
      t = setTimeout(function () { hide(function () { t = setTimeout(show, 6000); }); }, 8000);
    }
    box.querySelector('.rt-x').addEventListener('click', function () { closed = true; clearTimeout(t); hide(); });
    setTimeout(show, 5000);
  })();

  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
