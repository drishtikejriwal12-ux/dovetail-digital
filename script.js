(function () {
  // Mobile menu
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  function setMenu(open) {
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    mmenu.hidden = !open;
  }
  burger.addEventListener('click', function () { setMenu(mmenu.hidden); });
  mmenu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  // Concept brief toggles
  document.querySelectorAll('[data-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.dataset.toggle);
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('[data-sign]').textContent = open ? '−' : '+';
    });
  });

  // Services accordion
  var services = [
    { num: '01', name: 'Brand Identity', line: 'Build brands that look, feel, and sound unmistakably themselves.', items: ['Brand strategy and positioning', 'Logo design and visual identity', 'Typography and colour systems', 'Art direction', 'Brand guidelines', 'Brand applications and collateral'] },
    { num: '02', name: 'UX/UI Design', line: 'Create intuitive digital experiences that put people first.', items: ['User research and discovery', 'Information architecture', 'User journeys and wireframes', 'Interface design', 'Interactive prototyping', 'Design systems', 'Usability-focused design'] },
    { num: '03', name: 'Web Design', line: 'Turn digital first impressions into lasting connections.', items: ['Website strategy', 'Creative direction', 'Website UX and UI', 'Responsive web design', 'Landing pages', 'Interactive experiences', 'Developer-ready design handoff'] },
    { num: '04', name: 'Product Design', line: 'Shape digital products that solve real problems with clarity and purpose.', items: ['Product discovery', 'User flows and interaction design', 'Product UX/UI', 'Design systems', 'Prototyping', 'Responsive product interfaces', 'Iterative design improvements'] }
  ];
  var list = document.getElementById('services-list');
  var current = 0;
  function renderServices() {
    list.innerHTML = '';
    services.forEach(function (s, i) {
      var open = current === i;
      var wrap = document.createElement('div');
      var btn = document.createElement('button');
      btn.className = 'srow';
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-controls', 'svc-' + i);
      btn.innerHTML = '<span class="snum">' + s.num + '</span>' +
        '<span><span class="sname serif">' + s.name + '</span><span class="sline">' + s.line + '</span></span>' +
        '<span class="ssign" aria-hidden="true">' + (open ? '−' : '+') + '</span>';
      btn.addEventListener('click', function () {
        current = open ? -1 : i;
        renderServices();
        var next = list.querySelectorAll('.srow')[i];
        if (next) next.focus();
      });
      wrap.appendChild(btn);
      var ul = document.createElement('ul');
      ul.className = 'sitems';
      ul.id = 'svc-' + i;
      ul.hidden = !open;
      ul.innerHTML = s.items.map(function (t) { return '<li>' + t + '</li>'; }).join('');
      wrap.appendChild(ul);
      list.appendChild(wrap);
    });
  }
  renderServices();

  // Contact form
  var form = document.getElementById('form');
  var thanks = document.getElementById('thanks');
  var f = { name: form.elements.name, email: form.elements.email, message: form.elements.message };
  var errs = { name: document.getElementById('e-name'), email: document.getElementById('e-email'), message: document.getElementById('e-msg') };
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var tried = false;

  function validate() {
    var bad = {
      name: f.name.value.trim() === '',
      email: !emailRe.test(f.email.value.trim()),
      message: f.message.value.trim() === ''
    };
    Object.keys(bad).forEach(function (k) {
      errs[k].hidden = !(tried && bad[k]);
      f[k].setAttribute('aria-invalid', String(tried && bad[k]));
    });
    return !(bad.name || bad.email || bad.message);
  }
  form.addEventListener('input', function () { if (tried) validate(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    tried = true;
    if (!validate()) return;
    // INTEGRATION POINT: send the form data (name, email, company, service, message)
    // to your form endpoint here, e.g. fetch('/api/contact', { method:'POST', body:new FormData(form) }),
    // and only show the success state once it responds OK. Until then, no data leaves the page.
    document.getElementById('t-name').textContent = f.name.value.trim();
    document.getElementById('t-email').textContent = f.email.value.trim();
    form.hidden = true;
    thanks.hidden = false;
  });
  document.getElementById('reset').addEventListener('click', function () {
    form.reset();
    tried = false;
    validate();
    thanks.hidden = true;
    form.hidden = false;
  });
})();
