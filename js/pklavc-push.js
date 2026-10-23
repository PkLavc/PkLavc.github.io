/* User-initiated Web Push preferences for Blog and Store. */
(() => {
  "use strict";
  if (!/^\/(blog|store)(\/|$)/.test(location.pathname) || !("Notification" in window) ||
      !("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const locale = /^\/(?:blog|store)\/pt(\/|$)/.test(location.pathname) ? "pt" :
    /^\/(?:blog|store)\/es(\/|$)/.test(location.pathname) ? "es" : "en";
  const onStore = location.pathname.startsWith("/store");
  const labels = {
    en: { activate:"Notifications", title:"PKLAVC notifications", subtitle:"Choose what you want to receive. You can change this anytime.", tech:"Tech news", games:"Games news", store:"Store offers", save:"Enable / save", off:"Disable", close:"Close", unavailable:"Push is temporarily unavailable.", blocked:"Notifications are blocked in your browser settings.", ios:"On iPhone or iPad, first add this site to your Home Screen and open it as an app.", saved:"Preferences saved.", disabled:"Notifications disabled.", failed:"Unable to save preferences. Try again." },
    pt: { activate:"Notificações", title:"Notificações PKLAVC", subtitle:"Escolha o que deseja receber. Você pode alterar depois.", tech:"Notícias Tech", games:"Notícias Games", store:"Ofertas da loja", save:"Ativar / salvar", off:"Desativar", close:"Fechar", unavailable:"As notificações estão temporariamente indisponíveis.", blocked:"O navegador bloqueou as notificações. Altere as permissões nas configurações.", ios:"No iPhone ou iPad, adicione o site à Tela de Início e abra como aplicativo.", saved:"Preferências salvas.", disabled:"Notificações desativadas.", failed:"Não foi possível salvar. Tente novamente." },
    es: { activate:"Notificaciones", title:"Notificaciones PKLAVC", subtitle:"Elige lo que quieres recibir. Puedes cambiarlo después.", tech:"Noticias Tech", games:"Noticias Games", store:"Ofertas de la tienda", save:"Activar / guardar", off:"Desactivar", close:"Cerrar", unavailable:"Las notificaciones no están disponibles temporalmente.", blocked:"Las notificaciones están bloqueadas en el navegador.", ios:"En iPhone o iPad, añade este sitio a la pantalla de inicio y ábrelo como aplicación.", saved:"Preferencias guardadas.", disabled:"Notificaciones desactivadas.", failed:"No se pudo guardar. Inténtalo de nuevo." }
  }[locale];
  const pushApi = "https://api.pklavc.com/push";
  const style = document.createElement("style");
  style.textContent = '#pklavc-push-button{position:fixed;bottom:18px;right:18px;z-index:2147483000;background:#121b2b;border:1px solid #34c9e5;color:#fff;border-radius:24px;box-shadow:0 5px 22px #0007;padding:10px 14px;font:600 13px/1.25 system-ui,sans-serif;cursor:pointer}' +
    '#pklavc-push-dialog{position:fixed;inset:0;z-index:2147483001;background:#0009;display:flex;align-items:center;justify-content:center;padding:18px}' +
    '#pklavc-push-dialog[hidden]{display:none}' +
    '#pklavc-push-dialog .push-card{background:#101927;color:#fff;width:min(100%,390px);border:1px solid #466079;border-radius:15px;box-shadow:0 18px 55px #000b;padding:20px;font:400 14px/1.5 system-ui,sans-serif}' +
    '#pklavc-push-dialog h2{font:700 21px/1.4 system-ui,sans-serif;margin:0 0 7px;color:#fff}' +
    '#pklavc-push-dialog p{margin:0 0 16px}' +
    '#pklavc-push-dialog label{display:flex;align-items:center;gap:10px;margin:10px 0;cursor:pointer}' +
    '#pklavc-push-dialog input{accent-color:#28c9e8;width:18px;height:18px}' +
    '#pklavc-push-dialog .push-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}' +
    '#pklavc-push-dialog button{background:#20354c;color:#fff;border:1px solid #506377;border-radius:8px;padding:9px 12px;cursor:pointer}' +
    '#pklavc-push-dialog button.primary{background:#007995;border-color:#32d6ee}' +
    '#pklavc-push-dialog .push-status{min-height:1.5em;margin:14px 0 0;color:#9de7ef}' +
    '#pklavc-push-button[hidden]{display:none!important}' +
    '@media (max-width:767px), (hover:none) and (pointer:coarse){#pklavc-push-button,#pklavc-push-dialog{display:none!important}}';
  document.head.appendChild(style);
  const button = document.createElement("button");
  button.id = "pklavc-push-button";
  button.type = "button";
  button.textContent = "♧ " + labels.activate;
  button.setAttribute("aria-haspopup","dialog");
  const dialog = document.createElement("div");
  dialog.id = "pklavc-push-dialog";
  dialog.hidden = true;
  dialog.innerHTML = '<div class="push-card" role="dialog" aria-modal="true" aria-labelledby="pklavc-push-title">' +
    '<h2 id="pklavc-push-title"></h2><p class="push-subtitle"></p>' +
    '<label><input data-push-topic="tech" type="checkbox"><span></span></label>' +
    '<label><input data-push-topic="games" type="checkbox"><span></span></label>' +
    '<label><input data-push-topic="store" type="checkbox"><span></span></label>' +
    '<div class="push-actions"><button class="primary" data-push-save type="button"></button>' +
    '<button data-push-off type="button"></button><button data-push-close type="button"></button></div>' +
    '<p class="push-status" role="status" aria-live="polite"></p></div>';
  dialog.querySelector("h2").textContent = labels.title;
  dialog.querySelector(".push-subtitle").textContent = labels.subtitle;
  for (const topic of ["tech", "games", "store"]) {
    dialog.querySelector('[data-push-topic="' + topic + '"]').nextElementSibling.textContent = labels[topic];
  }
  const save = dialog.querySelector("[data-push-save]");
  const off = dialog.querySelector("[data-push-off]");
  const close = dialog.querySelector("[data-push-close]");
  const status = dialog.querySelector(".push-status");
  save.textContent = labels.save;
  off.textContent = labels.off;
  close.textContent = labels.close;
  function notify(message) { status.textContent = message; }
  function prefs() {
    try { return JSON.parse(localStorage.getItem("pklavc_push_topics") || "null"); } catch { return null; }
  }
  function setBusy(v) { save.disabled = off.disabled = Boolean(v); }
  function checked() {
    return Object.fromEntries(["tech", "games", "store"].map(k => [k, dialog.querySelector('[data-push-topic="' + k + '"]').checked]));
  }
  async function endpoint(path, options) {
    const res = await fetch(pushApi + path, { cache:"no-store", ...options });
    if (!res.ok) throw Error("HTTP " + res.status);
    return res.json();
  }
  function decodePublicKey(base64url) {
    const padded = base64url.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(base64url.length/4)*4,"=");
    return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
  }
  function isStandalone() {
    return matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }
  button.addEventListener("click", () => {
    dialog.hidden = false;
    notify("");
    const old = prefs();
    for (const name of ["tech","games","store"]) {
      dialog.querySelector('[data-push-topic="' + name + '"]').checked =
        old && typeof old[name] === "boolean" ? old[name] : onStore ? name === "store" : name !== "store";
    }
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !isStandalone()) notify(labels.ios);
    close.focus();
  });
  function dismiss(){ dialog.hidden=true; button.focus(); }
  close.addEventListener("click", dismiss);
  dialog.addEventListener("click", e => { if(e.target === dialog) dismiss(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape" && !dialog.hidden) dismiss(); });
  save.addEventListener("click", async () => {
    const topics = checked();
    if (!Object.values(topics).some(Boolean)) { notify(labels.failed); return; }
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !isStandalone()) { notify(labels.ios); return; }
    if (Notification.permission === "denied") { notify(labels.blocked); return; }
    const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (permission !== "granted") { notify(labels.blocked); return; }
    setBusy(true);
    try {
      const cfg = await endpoint("/config");
      if (!cfg.enabled || !cfg.publicKey) { notify(labels.unavailable); return; }
      await navigator.serviceWorker.register("/push-sw.js", { scope:"/" });
      const ready = await navigator.serviceWorker.ready;
      const subscription = await ready.pushManager.getSubscription() ||
        await ready.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey:decodePublicKey(cfg.publicKey) });
      await endpoint("/subscribe", { method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subscription:subscription.toJSON(),topics,locale}) });
      localStorage.setItem("pklavc_push_topics", JSON.stringify(topics));
      notify(labels.saved);
    } catch { notify(labels.failed); }
    finally { setBusy(false); }
  });
  off.addEventListener("click", async () => {
    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration("/");
      const current = registration && await registration.pushManager.getSubscription();
      if (current) {
        await endpoint("/unsubscribe", {method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({endpoint:current.endpoint})});
        await current.unsubscribe();
      }
      localStorage.removeItem("pklavc_push_topics");
      notify(labels.disabled);
    } catch { notify(labels.failed); }
    finally { setBusy(false); }
  });
  document.body.append(button,dialog);
  // Do not obstruct footer notices or legal links while they are visible.
  const footer = document.querySelector("footer.store-footer, footer[data-unified-footer], footer");
  if (footer && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(entries => {
      button.hidden = entries.some(entry => entry.isIntersecting);
    });
    footerObserver.observe(footer);
  }
})();
