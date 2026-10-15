
(function () {
  const params = new URLSearchParams(window.location.search);
  const standId = params.get("id");

  const message = document.getElementById("message");
  const loader = document.getElementById("loader");

  function showError(text) {
    message.textContent = text;
    loader.classList.add("hidden");
  }

  if (!/^\d{3}$/.test(standId || "")) {
    showError("رقم الاستند غير صحيح.");
    return;
  }

  const redirects = window.TAPNGO_REDIRECTS;
  const destination = redirects && redirects[standId];

  if (typeof destination !== "string" || !destination.trim()) {
    showError("عذراً، هذا الاستند غير مفعّل حالياً.");
    return;
  }

  let target;

  try {
    target = new URL(destination);
  } catch {
    showError("رابط الوجهة غير صالح.");
    return;
  }

  if (target.protocol !== "https:" && target.protocol !== "http:") {
    showError("نوع الرابط غير مسموح.");
    return;
  }

  message.textContent = "جاري تحويلك...";
  window.location.replace(target.href);
})();
