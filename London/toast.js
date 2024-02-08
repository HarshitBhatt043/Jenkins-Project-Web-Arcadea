function checkAllCachedAndRetry() {
  return caches
    .open("subwaylondon")
    .then((e) =>
      fetch("./assets.js")
        .then((e) => {
          if (e.ok) return e.json();
          throw new Error("Unable to fetch assets.js");
        })
        .then((t) => checkAllCached(t, e))
        .then((e) => {
          if (!e)
            return new Promise((e) => {
              setTimeout(() => {
                e(checkAllCachedAndRetry());
              }, 3e4);
            });
          showToast("No Internet Needed For This Now. ENJOY!!!");
        })
    )
    .catch((e) => {});
}
function checkAllCached(e, t) {
  return Promise.all(e.map((e) => t.match(e))).then((e) =>
    e.every((e) => void 0 !== e)
  );
}
function showToast(e) {
  var t = document.getElementById("toast");
  (t.textContent = e),
    t.classList.add("show"),
    setTimeout(function () {
      t.classList.remove("show");
    }, 3e3);
}
window.addEventListener("load", function () {
  checkAllCachedAndRetry();
});
