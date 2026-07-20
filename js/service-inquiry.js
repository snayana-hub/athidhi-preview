// Athidhi — service inquiry form -> Supabase (publishable key is public and safe with RLS)
window.ATHIDHI_SB = window.ATHIDHI_SB || {
  url: "https://greonfzhizexhjrwthuz.supabase.co",
  key: "sb_publishable_9StZFe6SJFiRub3Lw2euFg_69Z7HRRT"
};
window.athidhiClient = window.athidhiClient || function () {
  return window.supabase.createClient(window.ATHIDHI_SB.url, window.ATHIDHI_SB.key);
};

(function () {
  function lang() { return document.documentElement.getAttribute("lang") || "de"; }
  function t(de, en) { return lang() === "en" ? en : de; }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("si-form");
    if (!form || !window.supabase) return;
    var status = document.getElementById("si-status");
    var service = window.ATHIDHI_SERVICE || "general";
    var dateEl = form.querySelector("[name=event_date]");
    if (dateEl) {
      var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      dateEl.min = today.toISOString().slice(0, 10);
    }
    var sb = window.athidhiClient();

    function applyPh(){var l=lang();form.querySelectorAll("[data-de-placeholder]").forEach(function(el){var v=el.getAttribute("data-"+l+"-placeholder");if(v!=null)el.setAttribute("placeholder",v);});}
    applyPh();
    document.querySelectorAll(".lang button").forEach(function(bt){bt.addEventListener("click",function(){setTimeout(applyPh,0);});});

    function val(n){ var el=form.querySelector("[name="+n+"]"); return el ? (el.value||"").trim() : ""; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // anti-spam: throttle rapid repeat submits
      var nowT = Date.now();
      if (window.__siLast && nowT - window.__siLast < 4000) return;
      // honeypot: bots fill the hidden "company" field; silently drop
      if ((val("company") || "").trim() !== "") {
        form.reset(); applyPh();
        status.className = "si-status"; status.classList.add("ok");
        status.textContent = t("Danke! Ihre Anfrage ist eingegangen. Wir melden uns so schnell wie möglich.",
                               "Thank you! Your enquiry has been received. We will get back to you as soon as possible.");
        return;
      }
      status.className = "si-status"; status.textContent = "";
      var name = val("name"), phone = val("phone"), email = val("email");
      if (!name) {
        status.classList.add("err");
        status.textContent = t("Bitte geben Sie Ihren Namen an.", "Please enter your name.");
        return;
      }
      if (!phone && !email) {
        status.classList.add("err");
        status.textContent = t("Bitte geben Sie eine Telefonnummer oder E-Mail an.", "Please provide a phone number or email.");
        return;
      }
      var guests = val("guests");
      var row = {
        service: service,
        branch: val("branch") || null,
        name: name,
        phone: phone || null,
        email: email || null,
        event_date: val("event_date") || null,
        guests: guests ? parseInt(guests, 10) : null,
        message: val("message") || null
      };
      // Turnstile-ready hook: if a Cloudflare Turnstile widget (.cf-turnstile) is added
      // later, require its token before submitting. No widget present today = no-op.
      if (form.querySelector(".cf-turnstile")) {
        var tok = (form.querySelector('[name="cf-turnstile-response"]') || {}).value;
        if (!tok) {
          status.classList.add("err");
          status.textContent = t("Bitte bestätigen Sie, dass Sie kein Roboter sind.", "Please confirm you are not a robot.");
          return;
        }
      }
      window.__siLast = Date.now();
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true; var old = btn.textContent; btn.textContent = t("Wird gesendet …", "Sending …");

      sb.from("service_inquiries").insert(row).then(function (res) {
        btn.disabled = false; btn.textContent = old;
        if (res.error) {
          status.classList.add("err");
          status.textContent = t("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
                                 "Something went wrong. Please try again or call us.");
          return;
        }
        form.reset(); applyPh();
        status.classList.add("ok");
        status.textContent = t("Danke! Ihre Anfrage ist eingegangen. Wir melden uns so schnell wie möglich.",
                               "Thank you! Your enquiry has been received. We will get back to you as soon as possible.");
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  });
})();
