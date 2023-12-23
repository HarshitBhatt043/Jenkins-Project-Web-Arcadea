const ELEMENT_MENU_ELEMENTS_PER_ROW = 4,
  PEN_SIZES = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
  PEN_SIZE_LABELS = [
    "1px",
    "2px",
    "4px",
    "8px",
    "16px",
    "32px",
    "64px",
    "128px",
    "256px",
    "512px",
  ],
  DEFAULT_PEN_IDX = 1,
  elementMenuItems = [
    BACKGROUND,
    WALL,
    SAND,
    WATER,
    PLANT,
    FIRE,
    SALT,
    SALT_WATER,
    OIL,
    SPOUT,
    WELL,
    TORCH,
    GUNPOWDER,
    WAX,
    FALLING_WAX,
    NITRO,
    NAPALM,
    C4,
    CONCRETE,
    FUSE,
    ICE,
    CHILLED_ICE,
    LAVA,
    ROCK,
    STEAM,
    CRYO,
    MYSTERY,
    METHANE,
    SOIL,
    WET_SOIL,
    BRANCH,
    LEAF,
    POLLEN,
    CHARGED_NITRO,
    ACID,
    THERMITE,
    BURNING_THERMITE,
    RETRON_MAT,
    OBSIDIAN,
  ],
  menuNames = {};
(menuNames[BACKGROUND] = "ERASER"),
  (menuNames[WALL] = "WALL"),
  (menuNames[SAND] = "SAND"),
  (menuNames[WATER] = "WATER"),
  (menuNames[PLANT] = "PLANT"),
  (menuNames[FIRE] = "FIRE"),
  (menuNames[SALT] = "SALT"),
  (menuNames[SALT_WATER] = "SALT WATER"),
  (menuNames[OIL] = "OIL"),
  (menuNames[SPOUT] = "SPOUT "),
  (menuNames[WELL] = "WELL"),
  (menuNames[TORCH] = "TORCH"),
  (menuNames[GUNPOWDER] = "GUNPOWDER"),
  (menuNames[WAX] = "WAX "),
  (menuNames[FALLING_WAX] = "FALLING WAX"),
  (menuNames[NITRO] = "NITRO "),
  (menuNames[NAPALM] = "NAPALM"),
  (menuNames[C4] = "C-4 "),
  (menuNames[CONCRETE] = "CONCRETE "),
  (menuNames[FUSE] = "FUSE"),
  (menuNames[ICE] = "ICE"),
  (menuNames[CHILLED_ICE] = "CHILLED ICE"),
  (menuNames[LAVA] = "LAVA"),
  (menuNames[ROCK] = "ROCK"),
  (menuNames[STEAM] = "STEAM"),
  (menuNames[CRYO] = "CRYO"),
  (menuNames[MYSTERY] = "???"),
  (menuNames[METHANE] = "METHANE"),
  (menuNames[SOIL] = "SOIL"),
  (menuNames[WET_SOIL] = "WET SOIL"),
  (menuNames[BRANCH] = "BRANCH"),
  (menuNames[LEAF] = "LEAF"),
  (menuNames[POLLEN] = "POLLEN"),
  (menuNames[CHARGED_NITRO] = "CHARGED NITRO "),
  (menuNames[ACID] = "ACID"),
  (menuNames[THERMITE] = "THERMITE"),
  (menuNames[BURNING_THERMITE] = "BURNING THERMITE"),
  (menuNames[RETRON_MAT] = "RETRON MAT"),
  (menuNames[OBSIDIAN] = "OBSIDIAN");
const menuAltColors = {};
function initMenu() {
  document.getElementById("menuWrapper");
  const e = document.getElementById("elementTable");
  e.style.width = "50%";
  const n = Math.ceil(elementMenuItems.length / 4);
  var t,
    E,
    m = 0;
  for (t = 0; t < n; t++) {
    const n = e.insertRow(t);
    for (E = 0; E < 4 && !(m >= elementMenuItems.length); E++) {
      const e = n.insertCell(E),
        t = document.createElement("input");
      e.appendChild(t),
        (t.type = "button"),
        (t.className = "elementMenuButton");
      const a = elementMenuItems[m];
      if (!(a in menuNames)) throw "element is missing a canonical name: " + a;
      t.value = menuNames[a];
      const u = a;
      var s;
      (t.id = u),
        (s =
          a in menuAltColors
            ? menuAltColors[a]
            : "rgb(" +
              (255 & u) +
              ", " +
              ((65280 & u) >>> 8) +
              ", " +
              ((16711680 & u) >>> 16) +
              ")"),
        (t.style.color = s),
        t.addEventListener("click", function () {
          document
            .getElementById(SELECTED_ELEM.toString())
            .classList.remove("selectedElementMenuButton"),
            t.classList.add("selectedElementMenuButton"),
            (SELECTED_ELEM = parseInt(t.id, 10));
        }),
        m++;
    }
  }
  document.getElementById(SELECTED_ELEM.toString()).click();
  const a = document.getElementById("pensize");
  for (t = 0; t < PEN_SIZES.length; t++) {
    const e = document.createElement("option");
    (e.value = PEN_SIZES[t]),
      (e.text = PEN_SIZE_LABELS[t]),
      1 === t && ((e.selected = "selected"), (PENSIZE = parseInt(e.value, 10))),
      a.add(e);
  }
  a.addEventListener("change", function () {
    PENSIZE = parseInt(a.value, 10);
  });
  const u = [
      document.getElementById("spigot1Type"),
      document.getElementById("spigot2Type"),
      document.getElementById("spigot3Type"),
      document.getElementById("spigot4Type"),
    ],
    I = [
      document.getElementById("spigot1Size"),
      document.getElementById("spigot2Size"),
      document.getElementById("spigot3Size"),
      document.getElementById("spigot4Size"),
    ];
  if (u.length !== I.length) throw "should be same length";
  for (t = 0; t < u.length; t++) {
    const e = u[t],
      n = I[t];
    for (E = 0; E < SPIGOT_ELEMENT_OPTIONS.length; E++) {
      const n = SPIGOT_ELEMENT_OPTIONS[E],
        m = document.createElement("option");
      (m.value = n),
        (m.text = menuNames[n]),
        t === E && ((m.selected = "selected"), (SPIGOT_ELEMENTS[t] = n)),
        e.add(m);
    }
    for (E = 0; E < SPIGOT_SIZE_OPTIONS.length; E++) {
      const e = SPIGOT_SIZE_OPTIONS[E],
        m = document.createElement("option");
      (m.value = e),
        (m.text = E.toString(10)),
        E === DEFAULT_SPIGOT_SIZE_IDX &&
          ((m.selected = "selected"), (SPIGOT_SIZES[t] = e)),
        n.add(m);
    }
  }
  u[0].addEventListener("change", function () {
    SPIGOT_ELEMENTS[0] = parseInt(u[0].value, 10);
  }),
    u[1].addEventListener("change", function () {
      SPIGOT_ELEMENTS[1] = parseInt(u[1].value, 10);
    }),
    u[2].addEventListener("change", function () {
      SPIGOT_ELEMENTS[2] = parseInt(u[2].value, 10);
    }),
    u[3].addEventListener("change", function () {
      SPIGOT_ELEMENTS[3] = parseInt(u[3].value, 10);
    }),
    I[0].addEventListener("change", function () {
      SPIGOT_SIZES[0] = parseInt(I[0].value, 10);
    }),
    I[1].addEventListener("change", function () {
      SPIGOT_SIZES[1] = parseInt(I[1].value, 10);
    }),
    I[2].addEventListener("change", function () {
      SPIGOT_SIZES[2] = parseInt(I[2].value, 10);
    }),
    I[3].addEventListener("change", function () {
      SPIGOT_SIZES[3] = parseInt(I[3].value, 10);
    });
  const o = document.getElementById("overwriteCheckbox");
  (o.checked = OVERWRITE_ENABLED),
    o.addEventListener("click", function () {
      OVERWRITE_ENABLED = o.checked;
    });
  const N = document.getElementById("speedSlider");
  (N.min = 0),
    (N.max = MAX_FPS),
    (N.value = DEFAULT_FPS),
    N.addEventListener("input", function () {
      const e = parseInt(N.value, 10);
      Math.abs(e - DEFAULT_FPS) < 10 && (N.value = DEFAULT_FPS),
        setFPS(parseInt(N.value, 10));
    });
  document.getElementById("clearButton").onclick = clearGameCanvas;
  document.getElementById("saveButton").onclick = saveGameCanvas;
  document.getElementById("loadButton").onclick = loadGameCanvas;
}
function drawFPSLabel(e) {
  document.getElementById("fps-counter").innerText = "FPS: " + e;
}
(menuAltColors[WATER] = "rgb(0, 130, 255)"),
  (menuAltColors[WALL] = "rgb(160, 160, 160)"),
  (menuAltColors[BACKGROUND] = "rgb(200, 100, 200)"),
  (menuAltColors[WELL] = "rgb(158, 13, 33)"),
  (menuAltColors[SOIL] = "rgb(171, 110, 53)");
