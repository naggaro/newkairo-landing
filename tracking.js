/*
 * Meta Pixel + Google Ads + WhatsApp lead tracking for the NewKairo landing page.
 */
var META_PIXEL_ID = '1544970890037752';
var GOOGLE_ADS_ID = 'AW-18564890988';
var GOOGLE_ADS_WHATSAPP_LABEL = '6TTKCOyc_bQdEOyCt5RF';

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

  // Google Ads tag
  var gOn = /^AW-\d+$/.test(GOOGLE_ADS_ID);
  if (gOn) {
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
  }

  // Every WhatsApp button counts as a lead in Meta (Contact) and Google Ads (WhatsApp click).
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
    if (gOn && GOOGLE_ADS_WHATSAPP_LABEL && window.gtag) {
      window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_ID + '/' + GOOGLE_ADS_WHATSAPP_LABEL });
    }
  }, true);
})();
