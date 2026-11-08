/*
 * Meta Pixel + WhatsApp lead tracking for the NewKairo landing page.
 *
 * To turn tracking on: paste your Pixel ID between the quotes below,
 * commit, and Vercel redeploys automatically.
 * Find it in Meta Business Suite > Events Manager > your Pixel > Settings.
 */
var META_PIXEL_ID = '';

(function () {
  var on = /^\d{8,20}$/.test(META_PIXEL_ID);

  if (on) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // Every WhatsApp button counts as a lead ("Contact" event), tagged with what was tapped.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
    if (!a) return;
    var label = (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 60);
    if (on && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: label,
        content_category: document.documentElement.lang === 'ar' ? 'NewKairo AR' : 'NewKairo EN'
      });
    }
  }, true);
})();
