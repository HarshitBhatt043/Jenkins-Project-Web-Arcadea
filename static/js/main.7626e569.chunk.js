(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (t, e, a) {
      t.exports = a(20);
    },
    ,
    ,
    ,
    ,
    ,
    function (t, e, a) {},
    function (t, e, a) {},
    function (t, e, a) {},
    function (t, e, a) {},
    function (t, e, a) {},
    function (t, e, a) {
      "use strict";
      a.r(e);
      var r = a(0),
        n = a.n(r),
        i = a(8),
        s = a.n(i),
        l = (a(15), a(1)),
        o = a(2),
        u = a(4),
        c = a(3),
        h = a(5),
        v = (a(16), a(17), a(18), a(19), a(6)),
        d = (function (t) {
          function e() {
            return (
              Object(l.a)(this, e),
              Object(u.a)(this, Object(c.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "render",
                value: function () {
                  return n.a.createElement("div", {
                    className: "avatar",
                    "data-x": this.props.x,
                    "data-y": this.props.y,
                  });
                },
              },
            ]),
            e
          );
        })(r.Component),
        m = (function (t) {
          function e() {
            return (
              Object(l.a)(this, e),
              Object(u.a)(this, Object(c.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this.props.mon,
                    e = "monster prevDir"
                      .concat(t.prevDir, " dir")
                      .concat(t.dir);
                  return n.a.createElement("div", {
                    className: e,
                    "data-x": this.props.x,
                    "data-y": this.props.y,
                    "data-prevdir": t.dir,
                    "data-id": this.props.mon.id,
                  });
                },
              },
            ]),
            e
          );
        })(r.Component),
        p = (function (t) {
          function e(t) {
            var a;
            return (
              Object(l.a)(this, e),
              ((a = Object(u.a)(this, Object(c.a)(e).call(this, t))).tile =
                n.a.createRef()),
              (a.state = { touched: !1 }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "hasAvatar",
                value: function () {
                  var t = this.tile.current.childNodes,
                    e = !0,
                    a = !1,
                    r = void 0;
                  try {
                    for (
                      var n, i = t[Symbol.iterator]();
                      !(e = (n = i.next()).done);
                      e = !0
                    ) {
                      if (n.value.querySelector(".avatar")) return !0;
                    }
                  } catch (s) {
                    (a = !0), (r = s);
                  } finally {
                    try {
                      e || null == i.return || i.return();
                    } finally {
                      if (a) throw r;
                    }
                  }
                },
              },
              {
                key: "hasMonster",
                value: function () {
                  var t = this.tile.current.childNodes,
                    e = !0,
                    a = !1,
                    r = void 0;
                  try {
                    for (
                      var n, i = t[Symbol.iterator]();
                      !(e = (n = i.next()).done);
                      e = !0
                    ) {
                      return !!n.value.querySelector(".monster");
                    }
                  } catch (s) {
                    (a = !0), (r = s);
                  } finally {
                    try {
                      e || null == i.return || i.return();
                    } finally {
                      if (a) throw r;
                    }
                  }
                },
              },
              {
                key: "getAvatar",
                value: function () {
                  if (this.props.tile.target)
                    return n.a.createElement(d, {
                      x: this.props.tile.x,
                      y: this.props.tile.y,
                      tile: this,
                    });
                },
              },
              {
                key: "renderMonster",
                value: function (t, e) {
                  return n.a.createElement(m, {
                    key: t,
                    mon: e,
                    x: e.mtargetx,
                    y: e.mtargety,
                    prevDir: e.prevDir,
                  });
                },
              },
              {
                key: "getMonster",
                value: function () {
                  var t = [];
                  if (this.props.monster) {
                    var e = 0,
                      a = !0,
                      r = !1,
                      n = void 0;
                    try {
                      for (
                        var i, s = this.props.rm[Symbol.iterator]();
                        !(a = (i = s.next()).done);
                        a = !0
                      ) {
                        var l = i.value;
                        t.push(this.renderMonster(e, l)), e++;
                      }
                    } catch (o) {
                      (r = !0), (n = o);
                    } finally {
                      try {
                        a || null == s.return || s.return();
                      } finally {
                        if (r) throw n;
                      }
                    }
                    return t;
                  }
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.props.tile,
                    e = t.x + "-" + t.y,
                    a = this.props.target ? "target" : "",
                    r = this.props.monsterTarget ? "targetM" : "",
                    i = t.touchedA ? "touchedA" : "",
                    s = t.touchedM ? "touchedM" : "",
                    l = t.type,
                    o = this.getAvatar(),
                    u = this.getMonster(),
                    c = "loc "
                      .concat(l, " \n\t\t\t\t\t\t\t")
                      .concat(a, "\n\t\t\t\t\t\t\t")
                      .concat(r, "\n\t\t\t\t\t\t\t")
                      .concat(i, " \n\t\t\t\t\t\t\t")
                      .concat(s, " \n\t\t\t\t\t\t\t")
                      .concat(o ? "avatarT" : "", "\n\t\t\t\t\t\t\t")
                      .concat(u ? "monsterT" : "");
                  return n.a.createElement(
                    "div",
                    {
                      className: c,
                      "data-type": l,
                      "data-loc": e,
                      "data-x": t.x,
                      "data-y": t.y,
                      ref: this.tile,
                    },
                    o,
                    u
                  );
                },
              },
            ]),
            e
          );
        })(r.Component),
        y = (function (t) {
          function e() {
            return (
              Object(l.a)(this, e),
              Object(u.a)(this, Object(c.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "renderTile",
                value: function (t, e, a, r, i, s) {
                  return n.a.createElement(p, {
                    key: t,
                    tile: e,
                    target: a,
                    monster: r,
                    rm: i,
                    mc: s,
                    opacity: this.props.opacity,
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  var t = 0,
                    e = [],
                    a = !0,
                    r = !1,
                    i = void 0;
                  try {
                    for (
                      var s, l = this.props.tiles[Symbol.iterator]();
                      !(a = (s = l.next()).done);
                      a = !0
                    ) {
                      var o = s.value,
                        u = this.props.rid;
                      "number" !== typeof u && (u = parseInt(u));
                      var c = t,
                        h = c + "-" + u,
                        v = this.props.monsters,
                        d = !1,
                        m = 0,
                        p = [],
                        y = !0,
                        f = !1,
                        g = void 0;
                      try {
                        for (
                          var b, k = v[Symbol.iterator]();
                          !(y = (b = k.next()).done);
                          y = !0
                        ) {
                          var O = b.value;
                          "number" !== typeof O.mtargetx &&
                            (O.mtargetx = parseInt(O.mtargetx)),
                            "number" !== typeof O.mtargety &&
                              (O.mtargety = parseInt(O.mtargety)),
                            u === O.mtargety &&
                              c === O.mtargetx &&
                              ((d = !0), m++, p.push(O));
                        }
                      } catch (S) {
                        (f = !0), (g = S);
                      } finally {
                        try {
                          y || null == k.return || k.return();
                        } finally {
                          if (f) throw g;
                        }
                      }
                      e.push(this.renderTile(h, o, o.target, d, p, m)), t++;
                    }
                  } catch (S) {
                    (r = !0), (i = S);
                  } finally {
                    try {
                      a || null == l.return || l.return();
                    } finally {
                      if (r) throw i;
                    }
                  }
                  return n.a.createElement(
                    "div",
                    { className: "row" },
                    e,
                    n.a.createElement("div", { className: "clear" })
                  );
                },
              },
            ]),
            e
          );
        })(r.Component),
        f = (function (t) {
          function e(t) {
            var a;
            return (
              Object(l.a)(this, e),
              ((a = Object(u.a)(this, Object(c.a)(e).call(this, t))).state = {
                endTime: new Date().getTime() + parseInt(a.props.time),
                remaining: Math.ceil(parseInt(a.props.time) / 1e3),
              }),
              (a.countdown = a.countdown.bind(Object(v.a)(a))),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "componentDidMount",
                value: function () {
                  this.timer = setInterval(this.countdown, 1e3);
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  clearInterval(this.timer);
                },
              },
              {
                key: "countdown",
                value: function () {
                  var t = new Date().getTime(),
                    e = Math.ceil((parseInt(this.state.endTime) - t) / 1e3),
                    a = this.props.endLevel;
                  this.setState({ remaining: e }), e < 0 && a();
                },
              },
              {
                key: "render",
                value: function () {
                  var t = "#4d807f";
                  return (
                    this.state.remaining <= 3 && (t = "red"),
                    n.a.createElement(
                      "div",
                      { className: "time" },
                      n.a.createElement(
                        "span",
                        {
                          className: "countdown-timer flasher",
                          style: { color: t },
                        },
                        this.state.remaining
                      ),
                      n.a.createElement("br", null),
                      "seconds"
                    )
                  );
                },
              },
            ]),
            e
          );
        })(r.Component),
        g = (function (t) {
          function e(t) {
            var a;
            return (
              Object(l.a)(this, e),
              ((a = Object(u.a)(this, Object(c.a)(e).call(this, t))).state = {
                targetx: 0,
                targety: 0,
                touched: 1,
                monsterState: a.props.monsters,
                tileState: a.props.tiles,
              }),
              (a.move = a.move.bind(Object(v.a)(a))),
              (a.monsterRun = a.monsterRun.bind(Object(v.a)(a))),
              (a.updateMonster = a.updateMonster.bind(Object(v.a)(a))),
              (a.updateTouchCount = a.updateTouchCount.bind(Object(v.a)(a))),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "componentDidMount",
                value: function () {
                  document.addEventListener("keydown", this.move, !1),
                    (this.monsterRunID = setInterval(this.monsterRun, 1e3));
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  document.removeEventListener("keydown", this.move, !1),
                    clearInterval(this.monsterRunID);
                },
              },
              {
                key: "updateTouchCount",
                value: function (t) {
                  this.setState({ touched: parseInt(this.state.touched) + t }),
                    this.checkForWin();
                },
              },
              {
                key: "checkForWin",
                value: function () {
                  var t = this.props.updateGameStatus;
                  this.state.touched === this.props.level.tiles &&
                    t(!0, "Level Won", "Next Level", "next-level");
                },
              },
              {
                key: "paint",
                value: function (t, e) {
                  var a = this.state.tileState,
                    r = !0,
                    n = !1,
                    i = void 0;
                  try {
                    for (
                      var s, l = a[Symbol.iterator]();
                      !(r = (s = l.next()).done);
                      r = !0
                    ) {
                      var o = s.value,
                        u = !0,
                        c = !1,
                        h = void 0;
                      try {
                        for (
                          var v, d = o[Symbol.iterator]();
                          !(u = (v = d.next()).done);
                          u = !0
                        ) {
                          var m = v.value;
                          m.x == t && m.y == e
                            ? ((m.target = !0),
                              m.touchedA ||
                                ((m.touchedA = !0),
                                (m.touchedM = !1),
                                this.updateTouchCount(1)))
                            : (m.target = !1);
                        }
                      } catch (p) {
                        (c = !0), (h = p);
                      } finally {
                        try {
                          u || null == d.return || d.return();
                        } finally {
                          if (c) throw h;
                        }
                      }
                    }
                  } catch (p) {
                    (n = !0), (i = p);
                  } finally {
                    try {
                      r || null == l.return || l.return();
                    } finally {
                      if (n) throw i;
                    }
                  }
                  return a;
                },
              },
              {
                key: "unpaint",
                value: function (t, e) {
                  var a = this.state.tileState,
                    r = !0,
                    n = !1,
                    i = void 0;
                  try {
                    for (
                      var s, l = a[Symbol.iterator]();
                      !(r = (s = l.next()).done);
                      r = !0
                    ) {
                      var o = s.value,
                        u = !0,
                        c = !1,
                        h = void 0;
                      try {
                        for (
                          var v, d = o[Symbol.iterator]();
                          !(u = (v = d.next()).done);
                          u = !0
                        ) {
                          var m = v.value;
                          m.x === t &&
                            m.y === e &&
                            ((m.touchedM = !0),
                            m.touchedA &&
                              ((m.touchedA = !1), this.updateTouchCount(-1)));
                        }
                      } catch (p) {
                        (c = !0), (h = p);
                      } finally {
                        try {
                          u || null == d.return || d.return();
                        } finally {
                          if (c) throw h;
                        }
                      }
                    }
                  } catch (p) {
                    (n = !0), (i = p);
                  } finally {
                    try {
                      r || null == l.return || l.return();
                    } finally {
                      if (n) throw i;
                    }
                  }
                  return a;
                },
              },
              {
                key: "calculateTargetLoc",
                value: function (t, e, a) {
                  var r, n;
                  return (
                    "string" !== typeof t && (t = t.toString()),
                    "1" === t || "ArrowRight" === t || "d" === t || "D" === t
                      ? ((r = parseInt(e) + 1), (n = parseInt(a)))
                      : "2" === t || "ArrowDown" === t || "s" === t || "S" === t
                      ? ((r = parseInt(e)), (n = parseInt(a) + 1))
                      : "3" === t || "ArrowLeft" === t || "a" === t || "A" === t
                      ? ((r = parseInt(e) - 1), (n = parseInt(a)))
                      : ("4" !== t &&
                          "ArrowUp" !== t &&
                          "w" !== t &&
                          "W" !== t) ||
                        ((r = parseInt(e)), (n = parseInt(a) - 1)),
                    { targetx: r, targety: n }
                  );
                },
              },
              {
                key: "monsterRun",
                value: function () {
                  var t = this,
                    e = document.querySelectorAll(".monster"),
                    a = [],
                    r = !0,
                    n = !1,
                    i = void 0;
                  try {
                    for (
                      var s,
                        l = function () {
                          var e = s.value,
                            r = parseInt(e.getAttribute("data-prevdir")),
                            n = r,
                            i = e.getAttribute("data-id"),
                            l = e.getAttribute("data-x"),
                            o = e.getAttribute("data-y"),
                            u = t.calculateTargetLoc(r, l, o),
                            c = document.querySelector(
                              '.tile[data-loc="'
                                .concat(u.targetx, "-")
                                .concat(u.targety, '"]')
                            ),
                            h = u.targetx,
                            v = u.targety;
                          null != c
                            ? a.some(function (t) {
                                return t.mtargetx === h && t.mtargety === v;
                              }) &&
                              ((r = Math.ceil(4 * Math.random())),
                              (h = l),
                              (v = o))
                            : ((r = Math.ceil(4 * Math.random())),
                              (h = l),
                              (v = o));
                          var d = t.state.monsterState.find(function (t) {
                            return t.id == i;
                          });
                          (d.mtargetx = h),
                            (d.mtargety = v),
                            (d.prevDir = n),
                            (d.dir = r),
                            a.push(d),
                            t.updateBoardStateM(h, v);
                        },
                        o = e[Symbol.iterator]();
                      !(r = (s = o.next()).done);
                      r = !0
                    )
                      l();
                  } catch (u) {
                    (n = !0), (i = u);
                  } finally {
                    try {
                      r || null == o.return || o.return();
                    } finally {
                      if (n) throw i;
                    }
                  }
                  this.setState({ monsterState: a });
                },
              },
              {
                key: "updateMonster",
                value: function (t) {
                  var e = this.state.monsterState,
                    a = !0,
                    r = e.find(function (e) {
                      return e.id == t;
                    });
                  return (
                    (r.lives = r.lives - 1),
                    0 === r.lives && (a = !1),
                    this.setState({
                      monsterState: e.filter(function (t) {
                        return t.lives > 0;
                      }),
                    }),
                    a
                  );
                },
              },
              {
                key: "move",
                value: function (t) {
                  var e = !1,
                    a = document.querySelector(".avatar"),
                    r = a.getAttribute("data-x"),
                    n = a.getAttribute("data-y"),
                    i = this.calculateTargetLoc(t.key, r, n),
                    s = document.querySelector(
                      '.tile[data-loc="'
                        .concat(i.targetx, "-")
                        .concat(i.targety, '"]')
                    );
                  if (null != s) {
                    var l = s.querySelector(".monster");
                    if (null != l) {
                      var o = l.getAttribute("data-id");
                      e = this.updateMonster(o);
                    }
                    this.updateBoardState(i.targetx, i.targety, e);
                  }
                },
              },
              {
                key: "updateBoardState",
                value: function (t, e, a) {
                  var r = parseInt(t),
                    n = parseInt(e);
                  this.setState({
                    targetx: r,
                    targety: n,
                    tiles: this.paint(r, n),
                  });
                },
              },
              {
                key: "updateBoardStateM",
                value: function (t, e) {
                  var a = parseInt(t),
                    r = parseInt(e);
                  this.setState({ tileState: this.unpaint(a, r) });
                },
              },
              {
                key: "renderRows",
                value: function () {
                  var t = [],
                    e = 0,
                    a = !0,
                    r = !1,
                    i = void 0;
                  try {
                    for (
                      var s, l = this.state.tileState[Symbol.iterator]();
                      !(a = (s = l.next()).done);
                      a = !0
                    ) {
                      var o = s.value;
                      t.push(
                        n.a.createElement(y, {
                          key: e,
                          rid: e,
                          targetx: this.state.targetx,
                          targety: this.state.targety,
                          monsters: this.state.monsterState,
                          tiles: o,
                        })
                      ),
                        e++;
                    }
                  } catch (u) {
                    (r = !0), (i = u);
                  } finally {
                    try {
                      a || null == l.return || l.return();
                    } finally {
                      if (r) throw i;
                    }
                  }
                  return t;
                },
              },
              {
                key: "render",
                value: function () {
                  return n.a.createElement(
                    "div",
                    null,
                    n.a.createElement(
                      "div",
                      { className: "details-tab" },
                      n.a.createElement(
                        "div",
                        { className: "lives" },
                        this.props.lives,
                        n.a.createElement("br", null),
                        n.a.createElement("span", null, "lives")
                      ),
                      n.a.createElement(
                        "div",
                        { className: "status" },
                        this.state.touched,
                        "/",
                        this.props.level.tiles,
                        n.a.createElement("br", null),
                        n.a.createElement("span", null, "tiles")
                      ),
                      n.a.createElement(f, {
                        time: this.props.time,
                        endLevel: this.props.endLevel,
                      })
                    ),
                    n.a.createElement(
                      "div",
                      { className: "board" },
                      this.renderRows()
                    )
                  );
                },
              },
            ]),
            e
          );
        })(r.Component),
        b = (function (t) {
          function e(t) {
            var a;
            return (
              Object(l.a)(this, e),
              ((a = Object(u.a)(this, Object(c.a)(e).call(this, t))).state = {
                show: !1,
              }),
              (a.showTutorial = a.showTutorial.bind(Object(v.a)(a))),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "showTutorial",
                value: function () {
                  this.setState({ show: !this.state.show });
                },
              },
              {
                key: "render",
                value: function () {
                  return n.a.createElement(
                    "div",
                    { className: "tcontainer" },
                    n.a.createElement(
                      "div",
                      { className: "tbutton", onClick: this.showTutorial },
                      "See tutorial"
                    ),
                    this.state.show
                      ? n.a.createElement(
                          "div",
                          { className: "tutorial" },
                          n.a.createElement("h3", null, "Objective"),
                          n.a.createElement(
                            "p",
                            null,
                            "Turn all the tiles blue before the timer runs out."
                          ),
                          n.a.createElement("h3", null, "Movement"),
                          n.a.createElement(
                            "p",
                            null,
                            "You're the blue dot, on the blue tile in the top left corner. Move with your arrow keys - every tile you touch will turn blue."
                          ),
                          n.a.createElement("h3", null, "Watch Out"),
                          n.a.createElement(
                            "p",
                            null,
                            "Opposing forces are turning tiles gold. Undo their work by moving over them. If you touch your rivals three times, they disappear."
                          )
                        )
                      : ""
                  );
                },
              },
            ]),
            e
          );
        })(r.Component),
        k = "Paint Run",
        O = "1.0.4",
        S = "",
        w = (function (t) {
          function e(t) {
            var a;
            return (
              Object(l.a)(this, e),
              ((a = Object(u.a)(this, Object(c.a)(e).call(this, t))).state = {
                name: k,
                version: O,
                home: S,
                lives: 3,
                gameOver: !0,
                buttonMessage: "Begin Game!",
                seconds: a.props.level.time,
                statusCode: "new-game",
                statusMessage: "Paint Run",
                tutorial: !1,
              }),
              (a.endLevel = a.endLevel.bind(Object(v.a)(a))),
              (a.handleClick = a.handleClick.bind(Object(v.a)(a))),
              (a.handleKeyPress = a.handleKeyPress.bind(Object(v.a)(a))),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "componentDidMount",
                value: function () {
                  document.addEventListener("keydown", this.handleKeyPress);
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  document.removeEventListener("keydown", this.handleKeyPress);
                },
              },
              {
                key: "handleClick",
                value: function (t) {
                  var e = this.state.statusCode;
                  this.handleUserDidSomething(e);
                },
              },
              {
                key: "handleKeyPress",
                value: function (t) {
                  var e = this.state.statusCode;
                  switch (t.key) {
                    default:
                      break;
                    case " ":
                    case "Enter":
                      this.handleUserDidSomething(e);
                  }
                },
              },
              {
                key: "handleUserDidSomething",
                value: function (t) {
                  if (
                    (console.log("Game: handleUserDidSomething: " + t),
                    "new-game" === t)
                  )
                    this.setState({ gameOver: !1 });
                  else if ("same-level" === t)
                    this.setState({ gameOver: !1, touched: 1 });
                  else if ("next-level" === t) {
                    (0, this.props.increaseLevel)(),
                      this.setState({
                        lives: Math.min(this.state.lives + 2, 4),
                        gameOver: !1,
                        touched: 1,
                      });
                  } else if ("restart" === t) {
                    this.setState({ lives: 3, gameOver: !1, touched: 1 }),
                      (0, this.props.restart)();
                  }
                },
              },
              {
                key: "updateGameStatus",
                value: function (t, e, a, r) {
                  var n =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : this.state.lives;
                  this.setState({
                    gameOver: t,
                    statusMessage: e,
                    buttonMessage: a,
                    lives: n,
                    statusCode: r,
                  });
                },
              },
              {
                key: "endLevel",
                value: function () {
                  var t = this.state.lives - 1,
                    e = "",
                    a = "",
                    r = "";
                  t > 0
                    ? ((e = "Out of time, you have ".concat(
                        t,
                        " lives remaining!"
                      )),
                      (a = "Try again."),
                      (r = "same-level"))
                    : ((e = "Game Over"), (a = "Play again"), (r = "restart")),
                    this.updateGameStatus(!0, e, a, r, t);
                },
              },
              {
                key: "getTileState",
                value: function (t) {
                  for (
                    var e = this.props.level.grid, a = [], r = 0;
                    r < e.length;
                    r++
                  ) {
                    for (var n = e[r], i = [], s = 0; s < n.length; s++) {
                      var l = n[s] ? "tile" : "space",
                        o = 0 == s && 0 == r,
                        u = 0 == s && 0 == r;
                      i.push({
                        x: s,
                        y: r,
                        type: l,
                        target: o,
                        touchedA: u,
                        touchedM: !1,
                      });
                    }
                    a.push(i);
                  }
                  return a;
                },
              },
              {
                key: "getMonsterState",
                value: function (t) {
                  for (
                    var e = this.props.level.monsters,
                      a = [],
                      r = t
                        .reduce(function (t, e) {
                          return t.concat(e);
                        })
                        .filter(function (t) {
                          return "tile" == t.type;
                        }),
                      n = 0;
                    n < e;
                    n++
                  ) {
                    var i =
                      r[
                        Math.floor(
                          (Math.random() * this.props.level.tiles) / 2
                        ) + Math.floor(this.props.level.tiles / 2)
                      ];
                    a.push({
                      mtargetx: i.x,
                      mtargety: i.y,
                      dir: 4,
                      prevDir: 4,
                      lives: 3,
                      id: n,
                    });
                  }
                  return a;
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.getTileState(this.props.level.grid),
                    e = this.getMonsterState(t),
                    a = this.updateGameStatus,
                    r = this.endLevel;
                  return n.a.createElement(
                    "div",
                    { className: "game-board" },
                    n.a.createElement(
                      "div",
                      { className: "header-content" },
                      n.a.createElement(
                        "div",
                        { className: "level" },
                        n.a.createElement(
                          "h1",
                          null,
                          "Level ",
                          this.props.level.levelNum
                        ),
                        n.a.createElement(b, null)
                      ),
                      n.a.createElement(
                        "div",
                        { className: "about" },
                        n.a.createElement(
                          "a",
                          {
                            href: this.state.home,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                          this.state.name,
                          " v",
                          this.state.version
                        )
                      )
                    ),
                    n.a.createElement("div", { className: "clear" }),
                    this.state.gameOver
                      ? n.a.createElement(
                          "div",
                          { className: "gameover" },
                          n.a.createElement(
                            "h1",
                            null,
                            this.state.statusMessage
                          ),
                          n.a.createElement(
                            "button",
                            {
                              className: "button",
                              onClick: this.handleClick,
                              "data-statuscode": this.state.statusCode,
                            },
                            this.state.buttonMessage
                          )
                        )
                      : n.a.createElement(g, {
                          monsters: e,
                          tiles: t,
                          lives: this.state.lives,
                          level: this.props.level,
                          time: this.props.level.time,
                          endLevel: r.bind(this),
                          updateGameStatus: a.bind(this),
                        })
                  );
                },
              },
            ]),
            e
          );
        })(r.Component),
        j = [
          {
            tiles: [
              [1, 1, 1, 0],
              [1, 0, 1, 1],
              [1, 0, 1, 0],
              [1, 1, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 1, 1, 1, 0],
              [1, 0, 0, 1, 1],
              [1, 0, 1, 1, 1],
              [1, 0, 1, 0, 0],
              [1, 1, 1, 1, 0],
            ],
          },
          {
            tiles: [
              [1, 1, 1, 1, 0, 1],
              [0, 0, 0, 1, 1, 1],
              [0, 0, 1, 1, 1, 1],
              [1, 0, 1, 1, 0, 1],
              [1, 1, 1, 1, 0, 1],
              [0, 1, 0, 1, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 1, 1, 1, 1, 1],
              [0, 0, 0, 1, 1, 1],
              [0, 0, 1, 1, 0, 1],
              [1, 0, 0, 1, 0, 1],
              [1, 1, 1, 1, 0, 1],
              [0, 1, 1, 1, 1, 1],
              [1, 1, 1, 0, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 0, 1, 1, 0, 1, 0],
              [1, 0, 0, 1, 1, 1, 1],
              [1, 0, 1, 1, 0, 1, 1],
              [1, 0, 1, 1, 0, 1, 0],
              [1, 1, 1, 0, 0, 1, 0],
              [0, 1, 1, 0, 1, 1, 1],
              [0, 1, 0, 1, 1, 1, 0],
              [0, 1, 0, 1, 0, 1, 0],
              [0, 1, 1, 1, 1, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 0, 1, 1, 1, 0, 1, 0],
              [1, 0, 0, 0, 1, 1, 1, 1],
              [1, 0, 1, 1, 1, 0, 1, 1],
              [1, 0, 1, 1, 1, 1, 0, 1],
              [1, 1, 1, 0, 0, 0, 1, 1],
              [0, 1, 1, 0, 0, 0, 1, 1],
              [0, 1, 1, 1, 0, 0, 0, 0],
              [0, 1, 0, 1, 1, 1, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
              [0, 1, 0, 0, 1, 0, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
              [0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 0, 1, 0, 0, 1, 1],
              [1, 0, 0, 0, 1, 0, 0, 0, 1],
              [1, 0, 0, 1, 1, 1, 0, 0, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 1, 1, 1, 0, 0, 1],
              [1, 0, 0, 0, 1, 0, 0, 0, 1],
              [1, 1, 0, 0, 1, 0, 0, 1, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
          },
          {
            tiles: [
              [1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1],
              [1, 1, 1, 0, 1],
              [1, 1, 0, 0, 1],
              [1, 0, 0, 0, 1],
              [1, 0, 0, 0, 1],
              [1, 0, 0, 0, 1],
              [1, 0, 0, 0, 1],
              [1, 0, 0, 1, 1],
              [1, 0, 1, 1, 1],
              [1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1],
            ],
          },
        ],
        E = (function (t) {
          function e(t) {
            var a;
            return (
              Object(l.a)(this, e),
              ((a = Object(u.a)(this, Object(c.a)(e).call(this, t))).state = {
                level: 1,
                newLevel: !0,
              }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(o.a)(e, [
              {
                key: "restart",
                value: function () {
                  this.setState({ level: 1 });
                },
              },
              {
                key: "processLevelData",
                value: function () {
                  var t = this.state.level - 1;
                  t >= j.length && (this.restart(), (t = 0));
                  var e = j[t].tiles,
                    a = e
                      .reduce(function (t, e) {
                        return t.concat(e);
                      })
                      .filter(function (t) {
                        return t;
                      }).length;
                  return {
                    levelNum: this.state.level,
                    grid: e,
                    rows: e.length,
                    cols: e[0].length,
                    tiles: a,
                    time: 750 * a,
                    monsters: this.getMonsterNum(),
                  };
                },
              },
              {
                key: "getMonsterNum",
                value: function () {
                  return this.state.level > 4
                    ? Math.floor(this.state.level / 5 + 5)
                    : this.state.level > 3
                    ? this.state.level - 1
                    : this.state.level;
                },
              },
              {
                key: "increaseLevel",
                value: function () {
                  this.setState({ level: this.state.level + 1 });
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this.increaseLevel,
                    e = this.processLevelData(),
                    a = this.restart;
                  return n.a.createElement(
                    "div",
                    { className: "body" },
                    n.a.createElement(w, {
                      gameOver: !1,
                      level: e,
                      increaseLevel: t.bind(this),
                      restart: a.bind(this),
                    })
                  );
                },
              },
            ]),
            e
          );
        })(r.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      s.a.render(n.a.createElement(E, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (t) {
            t.unregister();
          });
    },
  ],
  [[9, 1, 2]],
]);
//# sourceMappingURL=main.7626e569.chunk.js.map
