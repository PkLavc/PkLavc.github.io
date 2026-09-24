(function () {
  'use strict';

  var loginForm = document.querySelector('[data-login-form]');
  var loginScreen = document.querySelector('[data-login-screen]');
  var adminShell = document.querySelector('[data-admin-shell]');
  if (!loginForm || !loginScreen || !adminShell) return;

  var sectionLabels = { overview: 'Visão geral', ads: 'Publicidade', users: 'Usuários' };
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    loginScreen.hidden = true;
    adminShell.hidden = false;
    document.body.classList.add('is-admin-open');
  });

  document.querySelectorAll('[data-section]').forEach(function (button) {
    button.addEventListener('click', function () {
      var selected = button.getAttribute('data-section');
      document.querySelectorAll('[data-section]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      document.querySelectorAll('[data-panel]').forEach(function (panel) {
        var active = panel.getAttribute('data-panel') === selected;
        panel.hidden = !active;
        panel.classList.toggle('is-visible', active);
      });
      document.querySelector('[data-current-section]').textContent = sectionLabels[selected];
      document.querySelector('[data-page-title]').textContent = sectionLabels[selected];
    });
  });

  var logout = document.querySelector('[data-logout]');
  if (logout) logout.addEventListener('click', function () {
    adminShell.hidden = true;
    loginScreen.hidden = false;
    document.body.classList.remove('is-admin-open');
  });
}());
