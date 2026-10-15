(function () {
  // Mobile menu
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  function setMenu(open) {
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    mmenu.hidden = !open;
  }
  if (burger && mmenu) {
    burger.addEventListener('click', function () { setMenu(mmenu.hidden); });
    mmenu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  }

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
    if (!list) return;
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

  // Contact form (home page only)
  var form = document.getElementById('form');
  if (!form) return;
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
    // No backend: open the visitor's email app with the message ready to send to the studio.
    // To use a form service instead, replace this with a fetch() to its endpoint and show the
    // success state only once it responds OK.
    var lines = [
      'Name: ' + f.name.value.trim(),
      'Email: ' + f.email.value.trim(),
      'Company: ' + (form.elements.company.value.trim() || '-'),
      'Service: ' + (form.elements.service.value || '-'),
      '',
      f.message.value.trim()
    ];
    window.location.href = 'mailto:dovetail.digital@gmail.com' +
      '?subject=' + encodeURIComponent('Project enquiry from ' + f.name.value.trim()) +
      '&body=' + encodeURIComponent(lines.join('\n'));
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
