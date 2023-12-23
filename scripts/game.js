const onscreenPixelRatio = window.devicePixelRatio,
  onscreenScaledWidth = onscreenPixelRatio * width,
  onscreenScaledHeight = onscreenPixelRatio * height,
  onscreenCanvas = document.getElementById("mainCanvas");
(onscreenCanvas.width = onscreenScaledWidth),
  (onscreenCanvas.height = onscreenScaledHeight),
  (onscreenCanvas.style.width = width + "px"),
  (onscreenCanvas.style.height = height + "px");
const onscreenCtx = onscreenCanvas.getContext("2d", { alpha: !1 }),
  gameCanvas = document.createElement("canvas");
(gameCanvas.width = width), (gameCanvas.height = height);
const gameCtx = gameCanvas.getContext("2d", { alpha: !1 }),
  gameImagedata = gameCtx.createImageData(width, height),
  gameImagedata32 = new Uint32Array(gameImagedata.data.buffer),
  saveGameImagedata32 = new Uint32Array(gameImagedata32.length);
var gamestateSaved = !1;
const MAX_X_IDX = width - 1,
  MAX_Y_IDX = height - 1,
  MAX_IDX = width * height - 1;
var fpsSetting,
  msPerFrame,
  lastLoop = 0,
  frameDebt = 0,
  lastFPSLabelUpdate = 0;
const refreshTimes = [];
function init() {
  var e = document.getElementById("gameWrapper");
  (e.style.height = height + "px"),
    (e.style.width = width + "px"),
    setFPS(DEFAULT_FPS),
    initCursors(),
    initElements(),
    initParticles(),
    initSpigots(),
    initMenu();
  const a = gameImagedata32.length;
  for (var t = 0; t < a; t++)
    (gameImagedata32[t] = BACKGROUND), (saveGameImagedata32[t] = BACKGROUND);
  (onscreenCtx.mozImageSmoothingEnabled = !1),
    (onscreenCtx.imageSmoothingEnabled = !1),
    (onscreenCtx.webkitImageSmoothingEnabled = !1),
    (onscreenCtx.msImageSmoothingEnabled = !1),
    (onscreenCtx.oImageSmoothingEnabled = !1);
}
function setFPS(e) {
  (fpsSetting = e), e > 0 ? (msPerFrame = 1e3 / fpsSetting) : drawFPSLabel(0);
}
function updateGame() {
  var e, a;
  updateSpigots(), updateParticles();
  var t = MAX_IDX;
  const n = 1 & MAX_Y_IDX;
  for (a = MAX_Y_IDX; -1 !== a; a--) {
    const s = a;
    if ((1 & s) === n) {
      for (e = MAX_X_IDX; -1 !== e; e--) {
        const a = gameImagedata32[t];
        if (a === BACKGROUND) {
          t--;
          continue;
        }
        elementActions[((196608 & a) >>> 12) + ((768 & a) >>> 6) + (3 & a)](
          e,
          s,
          t
        ),
          t--;
      }
      t++;
    } else {
      for (e = 0; e !== width; e++) {
        const a = gameImagedata32[t];
        if (a === BACKGROUND) {
          t++;
          continue;
        }
        elementActions[((196608 & a) >>> 12) + ((768 & a) >>> 6) + (3 & a)](
          e,
          s,
          t
        ),
          t++;
      }
      t--;
    }
    t -= width;
  }
  perfRecordFrame(), frameDebt--;
}
function draw() {
  gameCtx.putImageData(gameImagedata, 0, 0),
    gameCtx.scale(onscreenPixelRatio, onscreenPixelRatio),
    onscreenCtx.drawImage(
      gameCanvas,
      0,
      0,
      onscreenScaledWidth,
      onscreenScaledHeight
    );
}
function setGameCanvas(e) {
  const a = MAX_IDX + 1;
  for (var t = 0; t !== a; t++) gameImagedata32[t] = e;
}
function clearGameCanvas() {
  particles.inactivateAll(), setGameCanvas(BACKGROUND);
}
function saveGameCanvas() {
  const e = MAX_IDX + 1;
  for (var a = 0; a !== e; a++) saveGameImagedata32[a] = gameImagedata32[a];
  gamestateSaved = !0;
}
function loadGameCanvas() {
  if (!gamestateSaved) return;
  particles.inactivateAll();
  const e = MAX_IDX + 1;
  for (var a = 0; a !== e; a++) gameImagedata32[a] = saveGameImagedata32[a];
}
function perfRecordFrame() {
  const e = performance.now(),
    a = e - 1e3;
  for (; refreshTimes.length > 0 && refreshTimes[0] <= a; )
    refreshTimes.shift();
  refreshTimes.push(e),
    e - lastFPSLabelUpdate > 200 &&
      (drawFPSLabel(refreshTimes.length), (lastFPSLabelUpdate = e));
}
function mainLoop(e) {
  if ((window.requestAnimationFrame(mainLoop), 0 === lastLoop))
    return void (lastLoop = e);
  const a = e - lastLoop;
  if (((lastLoop = e), a < 0)) console.log("time has gone backwards");
  else {
    if (
      (fpsSetting > 0 && (frameDebt += a / msPerFrame),
      (frameDebt = Math.min(frameDebt, 5)),
      updateUserStroke(),
      frameDebt >= 1)
    )
      if (frameDebt < 2) updateGame();
      else {
        const e = executeAndTime(updateGame);
        for (var t = a - 3.5 - e; t > e && frameDebt >= 1; )
          updateGame(), (t -= e);
      }
    draw();
  }
}
window.onload = function () {
  init(), mainLoop(0);
};
