const offscreenParticleCanvas = document.createElement("canvas"),
  offscreenParticleCtx = offscreenParticleCanvas.getContext("2d", {
    alpha: !1,
  }),
  UNKNOWN_PARTICLE = 0,
  NITRO_PARTICLE = 1,
  NAPALM_PARTICLE = 2,
  C4_PARTICLE = 3,
  LAVA_PARTICLE = 4,
  MAGIC1_PARTICLE = 5,
  MAGIC2_PARTICLE = 6,
  METHANE_PARTICLE = 7,
  TREE_PARTICLE = 8,
  CHARGED_NITRO_PARTICLE = 9,
  NUKE_PARTICLE = 10,
  __particleInit = [
    UNKNOWN_PARTICLE_INIT,
    NITRO_PARTICLE_INIT,
    NAPALM_PARTICLE_INIT,
    C4_PARTICLE_INIT,
    LAVA_PARTICLE_INIT,
    MAGIC1_PARTICLE_INIT,
    MAGIC2_PARTICLE_INIT,
    METHANE_PARTICLE_INIT,
    TREE_PARTICLE_INIT,
    CHARGED_NITRO_PARTICLE_INIT,
    NUKE_PARTICLE_INIT,
  ];
Object.freeze(__particleInit);
const __particleActions = [
  UNKNOWN_PARTICLE_ACTION,
  NITRO_PARTICLE_ACTION,
  NAPALM_PARTICLE_ACTION,
  C4_PARTICLE_ACTION,
  LAVA_PARTICLE_ACTION,
  MAGIC1_PARTICLE_ACTION,
  MAGIC2_PARTICLE_ACTION,
  METHANE_PARTICLE_ACTION,
  TREE_PARTICLE_ACTION,
  CHARGED_NITRO_PARTICLE_ACTION,
  NUKE_PARTICLE_ACTION,
];
function UNKNOWN_PARTICLE_INIT(t) {}
function UNKNOWN_PARTICLE_ACTION(t) {
  throw "Unknown particle";
}
function NITRO_PARTICLE_INIT(t) {
  t.setColor(FIRE);
  const e = 5 + 10 * Math.random(),
    i = Math.random() * TWO_PI;
  t.setVelocity(e, i), (t.size = 2 + 7 * Math.random());
}
function NITRO_PARTICLE_ACTION(t) {
  offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.lineWidth = t.size),
    (offscreenParticleCtx.strokeStyle = t.rgbaColor),
    (offscreenParticleCtx.lineCap = "round"),
    offscreenParticleCtx.moveTo(t.x, t.y),
    (t.x += t.xVelocity),
    (t.y += t.yVelocity),
    offscreenParticleCtx.lineTo(t.x, t.y),
    offscreenParticleCtx.stroke();
  const e = t.actionIterations;
  e % 5 == 0 && (t.size /= 1.3),
    e % 15 == 0 && (t.yVelocity += (e / 5) * 10),
    (t.size < 1.75 || t.offCanvas()) && particles.makeParticleInactive(t);
}
function NAPALM_PARTICLE_INIT(t) {
  t.setColor(FIRE),
    (t.size = 8 * Math.random() + 6),
    (t.xVelocity = 8 * Math.random() - 4),
    (t.yVelocity = -1 * (4 * Math.random() + 4)),
    (t.maxIterations = Math.floor(10 * Math.random()) + 5);
}
function NAPALM_PARTICLE_ACTION(t) {
  t.drawCircle(t.size),
    (t.x += t.xVelocity),
    (t.y += t.yVelocity),
    (t.size *= 1 + 0.1 * Math.random()),
    t.actionIterations > t.maxIterations && particles.makeParticleInactive(t);
}
function C4_PARTICLE_INIT(t) {
  t.setColor(FIRE);
  const e = 1e4 * Math.random();
  t.size =
    e < 9e3
      ? 10 * Math.random() + 3
      : e < 9500
      ? 32 * Math.random() + 3
      : e < 9800
      ? 64 * Math.random() + 3
      : 128 * Math.random() + 3;
}
function C4_PARTICLE_ACTION(t) {
  t.drawCircle(t.size),
    t.actionIterations % 3 == 0 &&
      ((t.size /= 3), t.size <= 1 && particles.makeParticleInactive(t));
}
function LAVA_PARTICLE_INIT(t) {
  t.setColor(FIRE);
  var e = QUARTER_PI + Math.random() * HALF_PI;
  random() < 75 &&
    Math.abs(HALF_PI - e) < EIGHTEENTH_PI &&
    (e += EIGHTEENTH_PI * (e > HALF_PI ? 1 : -1)),
    (t.xVelocity = (1 + 3 * Math.random()) * Math.cos(e)),
    (t.yVelocity = (-4 * Math.random() - 3) * Math.sin(e)),
    (t.initYVelocity = t.yVelocity),
    (t.yAcceleration = 0.06),
    (t.size = 4 + 3 * Math.random()),
    (t.y -= t.size);
}
function LAVA_PARTICLE_ACTION(t) {
  offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.lineWidth = t.size),
    (offscreenParticleCtx.strokeStyle = t.rgbaColor),
    (offscreenParticleCtx.lineCap = "round"),
    offscreenParticleCtx.moveTo(t.x, t.y);
  const e = t.actionIterations;
  if (
    ((t.x += t.xVelocity),
    (t.y = t.initY + t.initYVelocity * e + (t.yAcceleration * e * e) / 2),
    offscreenParticleCtx.lineTo(t.x, t.y),
    offscreenParticleCtx.stroke(),
    t.x < 0 || t.x > MAX_X_IDX || t.y > MAX_Y_IDX)
  )
    particles.makeParticleInactive(t);
  else if (random() < 25) {
    t.yVelocity = t.initYVelocity + t.yAcceleration * e;
    const a = t.aboutToHit();
    var i = -1;
    if (
      (a === WATER || a === SALT_WATER
        ? random() < 58 && (i = ROCK)
        : a === LAVA || a === ROCK
        ? random() < 75 && (i = LAVA)
        : a === ICE || a === CHILLED_ICE || a === CRYO
        ? random() < 70 && (i = ROCK)
        : a === WALL && random() < 25 && (i = LAVA),
      -1 !== i)
    )
      return (
        t.setColor(i),
        t.drawCircle(t.size / 2),
        void particles.makeParticleInactive(t)
      );
  }
}
function MAGIC1_PARTICLE_INIT(t) {
  t.reinitialized || t.setRandomColor(MAGIC_COLORS);
  var e = 5 + Math.round(13 * Math.random());
  const i = [t];
  var a;
  for (a = 1; a !== e; a++) {
    const e = particles.addActiveParticle(0, t.x, t.y, t.i);
    if (!e) break;
    particles.particleCounts[e.type]--,
      particles.particleCounts[5]++,
      (e.type = 5),
      e.setColor(t.color),
      i.push(e);
  }
  e = i.length;
  const n = TWO_PI / e,
    r = 7 + 3 * Math.random(),
    c = 4 + 4 * Math.random();
  var o = 0;
  for (a = 0; a !== e; a++) {
    const t = i[a];
    t.setVelocity(r, o), (t.size = c), (o += n);
  }
}
function MAGIC1_PARTICLE_ACTION(t) {
  offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.lineWidth = t.size),
    (offscreenParticleCtx.strokeStyle = t.rgbaColor),
    (offscreenParticleCtx.lineCap = "square"),
    offscreenParticleCtx.moveTo(t.x, t.y),
    (t.x += t.xVelocity),
    (t.y += t.yVelocity),
    offscreenParticleCtx.lineTo(t.x, t.y),
    offscreenParticleCtx.stroke(),
    t.offCanvas() && particles.makeParticleInactive(t);
}
function MAGIC2_PARTICLE_INIT(t) {
  t.setRandomColor(MAGIC_COLORS),
    (t.size = 4 + 8 * Math.random()),
    (t.x = Math.floor(width / 2)),
    (t.y = Math.floor(height / 2)),
    (t.initX = t.x),
    (t.initY = t.y),
    (t.magic_2_max_radius =
      Math.sqrt(width * width + height * height) / 2 + t.size),
    (t.magic_2_theta = 0),
    (t.magic_2_speed = 20),
    (t.magic_2_radius_spacing = 25 + 55 * Math.random()),
    (t.magic_2_radius = t.magic_2_radius_spacing);
}
function MAGIC2_PARTICLE_ACTION(t) {
  offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.lineWidth = t.size),
    (offscreenParticleCtx.strokeStyle = t.rgbaColor),
    (offscreenParticleCtx.lineCap = "round"),
    offscreenParticleCtx.moveTo(t.x, t.y);
  const e = t.magic_2_theta + t.magic_2_speed / t.magic_2_radius;
  t.magic_2_theta = e;
  const i = (t.magic_2_theta / TWO_PI) * t.magic_2_radius_spacing;
  (t.magic_2_radius = i),
    (t.x = i * Math.cos(e) + t.initX),
    (t.y = i * Math.sin(e) + t.initY),
    offscreenParticleCtx.lineTo(t.x, t.y),
    offscreenParticleCtx.stroke(),
    i > t.magic_2_max_radius && particles.makeParticleInactive(t);
}
function METHANE_PARTICLE_INIT(t) {
  t.setColor(FIRE), (t.size = 10 + 10 * Math.random());
}
function METHANE_PARTICLE_ACTION(t) {
  const e = t.actionIterations;
  t.drawCircle(t.size), e > 2 && particles.makeParticleInactive(t);
}
Object.freeze(__particleActions);
class TreeType {
  constructor() {
    throw "Should never actually instantiate this.";
  }
  static initTreeParticle(t, e) {}
  static branchAngles(t) {
    throw "Branch angles not implemented.";
  }
  static branchSpacingFactor(t) {
    throw "Branch spacing factor not implemented.";
  }
}
class Tree0 extends TreeType {
  static branchAngles(t) {
    const e = EIGHTH_PI + Math.random() * QUARTER_PI;
    return [t.angle + e, t.angle - e];
  }
  static branchSpacingFactor(t) {
    return 0.9;
  }
}
class Tree1 extends TreeType {
  static initTreeParticle(t, e) {
    const i = e ? e.branchDirection : random() < 50 ? 1 : -1;
    t.branchDirection = i;
  }
  static branchAngles(t) {
    const e = (EIGHTH_PI + Math.random() * EIGHTH_PI) * t.branchDirection;
    return [t.angle + e, t.angle];
  }
  static branchSpacingFactor(t) {
    return 0.7;
  }
}
class Tree2 extends TreeType {
  static branchAngles(t) {
    const e = Math.random() * SIXTEENTH_PI + EIGHTH_PI;
    return [t.angle, t.angle + e, t.angle - e];
  }
  static branchSpacingFactor(t) {
    return 0.6;
  }
}
const TREE_TYPES = [Tree0, Tree2],
  NUM_TREE_TYPES = TREE_TYPES.length;
function TREE_PARTICLE_INIT(t) {
  t.setColor(BRANCH), (t.size = random() < 50 ? 3 : 4);
  const e = 1 + 0.5 * Math.random(),
    i = -1 * (HALF_PI + EIGHTH_PI - Math.random() * QUARTER_PI);
  t.setVelocity(e, i),
    (t.generation = 1),
    (t.branchSpacing = 15 + Math.round(45 * Math.random())),
    (t.maxBranches = 1 + Math.round(2 * Math.random())),
    (t.nextBranch = t.branchSpacing),
    (t.branches = 0),
    random() < 62
      ? (t.treeType = 0)
      : (t.treeType = 1 + Math.floor(Math.random() * NUM_TREE_TYPES - 1)),
    TREE_TYPES[t.treeType].initTreeParticle(t, null);
}
function TREE_PARTICLE_ACTION(t) {
  if (
    (offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.lineWidth = t.size),
    (offscreenParticleCtx.strokeStyle = t.rgbaColor),
    (offscreenParticleCtx.lineCap = "round"),
    offscreenParticleCtx.moveTo(t.x, t.y),
    (t.x += t.xVelocity),
    (t.y += t.yVelocity),
    offscreenParticleCtx.lineTo(t.x, t.y),
    offscreenParticleCtx.stroke(),
    t.aboutToHit() === WALL)
  )
    return void particles.makeParticleInactive(t);
  const e = t.actionIterations;
  if (e >= t.nextBranch) {
    if ((t.branches++, 0 === t.maxBranches))
      return void particles.makeParticleInactive(t);
    const a = t.color === LEAF || t.branches === t.maxBranches,
      n = TREE_TYPES[t.treeType],
      r = n.branchAngles(t),
      c = r.length;
    for (var i = 0; i < c; i++) {
      const e = particles.addActiveParticle(8, t.x, t.y, t.i);
      if (!e) break;
      (e.generation = t.generation + 1),
        (e.maxBranches = Math.max(0, t.maxBranches - 1)),
        (e.branchSpacing = t.branchSpacing * n.branchSpacingFactor(t)),
        (e.nextBranch = e.branchSpacing),
        (e.angle = r[i]),
        e.setVelocity(t.velocity, e.angle),
        (e.size = Math.max(t.size - 1, 2)),
        (e.treeType = t.treeType),
        n.initTreeParticle(e, t),
        a && e.setColor(LEAF);
    }
    if (t.branches >= t.maxBranches)
      return void particles.makeParticleInactive(t);
    t.branchSpacing > 45 && (t.branchSpacing *= 0.8),
      (t.nextBranch = e + t.branchSpacing * (0.35 * Math.random() + 0.65));
  }
}
function CHARGED_NITRO_PARTICLE_INIT(t) {
  t.setColor(FIRE),
    (t.size = 4),
    (t.xVelocity = 0),
    (t.yVelocity = -100),
    (t.minY = -1);
  const e = (3 + Math.round(2 * Math.random())) * width;
  for (var i = t.i; i > -1; i -= e)
    if (gameImagedata32[i] === WALL) {
      t.minY = i / width;
      break;
    }
}
function CHARGED_NITRO_PARTICLE_ACTION(t) {
  offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.lineWidth = t.size),
    (offscreenParticleCtx.strokeStyle = t.rgbaColor),
    (offscreenParticleCtx.lineCap = "square"),
    offscreenParticleCtx.moveTo(t.initX, t.initY),
    (t.x += t.xVelocity),
    (t.y = Math.max(t.minY, t.y + t.yVelocity)),
    offscreenParticleCtx.lineTo(t.x, t.y),
    offscreenParticleCtx.stroke(),
    (t.y <= t.minY || t.offCanvas()) && particles.makeParticleInactive(t);
}
function NUKE_PARTICLE_INIT(t) {
  t.setColor(FIRE);
  const e = Math.max(width, height);
  t.size = e / 4 + (Math.random() * e) / 8;
}
function NUKE_PARTICLE_ACTION(t) {
  t.drawCircle(t.size),
    t.actionIterations > 4 && particles.makeParticleInactive(t);
}
class Particle {
  constructor() {
    (this.type = 0),
      (this.initX = -1),
      (this.initY = -1),
      (this.x = -1),
      (this.y = -1),
      (this.i = -1),
      (this.color = 0),
      (this.rgbaColor = "rgba(0, 0, 0, 1)"),
      (this.velocity = 0),
      (this.angle = 0),
      (this.xVelocity = 0),
      (this.yVelocity = 0),
      (this.size = 0),
      (this.actionIterations = 0),
      (this.active = !1),
      (this.next = null),
      (this.prev = null),
      (this.reinitialized = !1);
  }
  setColor(t) {
    Particle.warned_unpaintable_color ||
      t in PAINTABLE_PARTICLE_COLORS ||
      (console.log("Unpaintable particle color: " + t),
      (Particle.warned_unpaintable_color = !0)),
      (this.color = t);
    const e = 255 & t,
      i = (65280 & t) >>> 8,
      a = (16711680 & t) >>> 16;
    this.rgbaColor = "rgba(" + e + "," + i + "," + a + ", 1)";
  }
  setRandomColor(t) {
    const e = Math.floor(Math.random() * t.length);
    this.setColor(t[e]);
  }
  offCanvas() {
    const t = this.x,
      e = this.y;
    return t < 0 || t > MAX_X_IDX || e < 0 || e > MAX_Y_IDX;
  }
  setVelocity(t, e) {
    (this.velocity = t),
      (this.angle = e),
      (this.xVelocity = t * Math.cos(e)),
      (this.yVelocity = t * Math.sin(e));
  }
  aboutToHit() {
    const t = this.size / 2,
      e = Math.atan2(this.yVelocity, this.xVelocity),
      i = this.x + Math.cos(e) * t,
      a = this.y + Math.sin(e) * t,
      n = Math.round(i) + Math.round(a) * width;
    return n < 0 || n > MAX_IDX ? BACKGROUND : gameImagedata32[n];
  }
  drawCircle(t) {
    offscreenParticleCtx.beginPath(),
      (offscreenParticleCtx.lineWidth = 0),
      (offscreenParticleCtx.fillStyle = this.rgbaColor),
      offscreenParticleCtx.arc(this.x, this.y, t, 0, TWO_PI),
      offscreenParticleCtx.fill();
  }
}
Particle.warned_unpaintable_color = !1;
class ParticleList {
  constructor() {
    (this.activeHead = null),
      (this.activeSize = 0),
      (this.inactiveHead = null),
      (this.inactiveSize = 0),
      (this.particleCounts = new Uint32Array(__particleInit.length));
    for (var t = 0; t < this.particleCounts.length; t++)
      this.particleCounts[t] = 0;
  }
  addActiveParticle(t, e, i, a) {
    if (0 === this.inactiveSize) return null;
    const n = this.inactiveHead;
    return (
      (this.inactiveHead = this.inactiveHead.next),
      this.inactiveHead && (this.inactiveHead.prev = null),
      this.inactiveSize--,
      this.activeHead
        ? ((this.activeHead.prev = n),
          (n.next = this.activeHead),
          (n.prev = null),
          (this.activeHead = n))
        : ((n.next = null), (n.prev = null), (this.activeHead = n)),
      this.activeSize++,
      (n.active = !0),
      (n.reinitialized = !1),
      (n.actionIterations = 0),
      (n.type = t),
      (n.initX = e),
      (n.initY = i),
      (n.x = e),
      (n.y = i),
      (n.i = a),
      this.particleCounts[t]++,
      __particleInit[t](n),
      n
    );
  }
  makeParticleInactive(t) {
    (t.active = !1),
      this.particleCounts[t.type]--,
      (t.type = 0),
      t.prev && (t.prev.next = t.next),
      t.next && (t.next.prev = t.prev),
      t === this.activeHead && (this.activeHead = t.next),
      this.activeSize--,
      this.inactiveHead
        ? ((this.inactiveHead.prev = t),
          (t.next = this.inactiveHead),
          (t.prev = null),
          (this.inactiveHead = t))
        : ((t.next = null), (t.prev = null), (this.inactiveHead = t)),
      this.inactiveSize++;
  }
  inactivateAll() {
    for (var t = this.activeHead; t; ) {
      const e = t.next;
      this.makeParticleInactive(t), (t = e);
    }
  }
  reinitializeParticle(t, e) {
    if (!t.active) throw "Can only be used with active particles";
    this.particleCounts[t.type]--,
      this.particleCounts[e]++,
      (t.type = e),
      (t.reinitialized = !0),
      __particleInit[e](t);
  }
  particleActive(t) {
    return this.particleCounts[t] > 0;
  }
}
const particles = new ParticleList(),
  PAINTABLE_PARTICLE_COLORS = {},
  MAGIC_COLORS = [];
function initParticles() {
  if (__particleInit.length !== __particleActions.length)
    throw "Particle arrays must be same length";
  var t,
    e = MAX_NUM_PARTICLES;
  for (
    particles.inactiveHead = new Particle(),
      particles.inactiveSize++,
      t = particles.inactiveHead,
      e--;
    e > 0;

  ) {
    const i = new Particle();
    (i.prev = t), (t.next = i), particles.inactiveSize++, (t = i), e--;
  }
  (offscreenParticleCanvas.width = width),
    (offscreenParticleCanvas.height = height),
    (PAINTABLE_PARTICLE_COLORS[FIRE] = null),
    (PAINTABLE_PARTICLE_COLORS[WALL] = null),
    (PAINTABLE_PARTICLE_COLORS[ROCK] = null),
    (PAINTABLE_PARTICLE_COLORS[LAVA] = null),
    (PAINTABLE_PARTICLE_COLORS[PLANT] = null),
    (PAINTABLE_PARTICLE_COLORS[SPOUT] = null),
    (PAINTABLE_PARTICLE_COLORS[WELL] = null),
    (PAINTABLE_PARTICLE_COLORS[WAX] = null),
    (PAINTABLE_PARTICLE_COLORS[ICE] = null),
    (PAINTABLE_PARTICLE_COLORS[BRANCH] = null),
    (PAINTABLE_PARTICLE_COLORS[LEAF] = null),
    Object.freeze(PAINTABLE_PARTICLE_COLORS),
    MAGIC_COLORS.push(WALL),
    MAGIC_COLORS.push(PLANT),
    MAGIC_COLORS.push(SPOUT),
    MAGIC_COLORS.push(WELL),
    MAGIC_COLORS.push(WAX),
    MAGIC_COLORS.push(ICE),
    Object.freeze(MAGIC_COLORS);
}
function updateParticles() {
  if (!particles.activeHead) return;
  const t = offscreenParticleCanvas.width,
    e = offscreenParticleCanvas.height;
  offscreenParticleCtx.beginPath(),
    (offscreenParticleCtx.fillStyle = "rgba(0, 0, 0, 1)"),
    offscreenParticleCtx.rect(0, 0, t, e),
    offscreenParticleCtx.fill();
  for (var i = particles.activeHead; i; ) {
    const t = i.next;
    i.actionIterations++, __particleActions[i.type](i), (i = t);
  }
  const a = offscreenParticleCtx.getImageData(0, 0, t, e),
    n = new Uint32Array(a.data.buffer);
  var r,
    c,
    o = 0;
  for (c = 0; c !== e; c++) {
    const e = o;
    for (r = 0; r !== t; r++) {
      const t = r + e,
        i = n[t];
      var s;
      if (4278190080 !== i)
        if (i in PAINTABLE_PARTICLE_COLORS) gameImagedata32[t] = i;
        else
          ((r - 3 >= 0 && (s = n[t - 3]) in PAINTABLE_PARTICLE_COLORS) ||
            (r + 3 <= MAX_X_IDX &&
              (s = n[t + 3]) in PAINTABLE_PARTICLE_COLORS) ||
            (c - 3 >= 0 &&
              (s = n[t - 3 * width]) in PAINTABLE_PARTICLE_COLORS) ||
            (c + 3 <= MAX_Y_IDX &&
              (s = n[t + 3 * width]) in PAINTABLE_PARTICLE_COLORS)) &&
            (gameImagedata32[t] = s);
    }
    o += t;
  }
}
