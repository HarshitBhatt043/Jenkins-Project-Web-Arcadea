(self.webpackChunkgame_score_sdk = self.webpackChunkgame_score_sdk || []).push([
  [477],
  {
    501: (t, e, r) => {
      "use strict";
      r.d(e, { Z: () => n });
      class n {
        constructor() {
          this.canAddShortcut = !1;
        }
        addShortcut() {
          return (
            (t = this),
            (e = void 0),
            (n = function* () {
              return !1;
            }),
            new ((r = void 0) || (r = Promise))(function (i, o) {
              function s(t) {
                try {
                  u(n.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                try {
                  u(n.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? i(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(s, a);
              }
              u((n = n.apply(t, e || [])).next());
            })
          );
          var t, e, r, n;
        }
      }
    },
    5572: (t, e, r) => {
      "use strict";
      r.d(e, { VK: () => n, yl: () => i });
      const n = { success: !0, payload: {} },
        i = { success: !1, payload: {} };
    },
    2712: (t, e, r) => {
      "use strict";
      r.d(e, { aD: () => l, FU: () => v, hc: () => f });
      const n = (t, e) => ({ type: t, getLink: e }),
        i = n(
          "facebook",
          (t) => `//www.facebook.com/sharer/sharer.php?u=${t.url}`
        ),
        o = n(
          "whatsapp",
          (t) => `//api.whatsapp.com/send?text=${t.text}%20${t.url}`
        ),
        s = n(
          "telegram",
          (t) => `//t.me/share/url?url=${t.url}&text=${t.text}`
        ),
        a = n(
          "vkontakte",
          (t) =>
            `//vk.com/share.php?url=${t.url}&title=${t.text}&image=${t.image}`
        ),
        u = n(
          "twitter",
          (t) => `//twitter.com/share?text=${t.text}&url=${t.url}`
        ),
        c = n(
          "odnoklassniki",
          (t) =>
            `//connect.ok.ru/offer?url=${t.url}&title=${t.text}&imageUrl=${t.image}`
        ),
        h = n("viber", (t) => `viber://forward?text=${t.text}%20${t.url}`),
        d = n(
          "moymir",
          (t) =>
            `//connect.mail.ru/share?url=${t.url}&title=${t.text}&image_url=${t.image}`
        ),
        l = [o, s, a, c, h, d],
        v = [i, u, s, o, h],
        f = [i, u, s, o, h, a, c, d];
    },
    6390: (t, e, r) => {
      "use strict";
      function n() {
        try {
          return window.top.location.href || location.href;
        } catch (t) {
          return location.href;
        }
      }
      r.d(e, { T: () => n });
    },
    4917: (t, e, r) => {
      "use strict";
      function n({ src: t, check: e }) {
        return new Promise((r, n) => {
          let i = 0;
          if (null == e ? void 0 : e(window)) return void r();
          function o() {
            e ? e(window) && (clearInterval(i), r()) : r();
          }
          if (document.querySelector(`script[src="${t}"]`) && e)
            return void (i = setInterval(o, 100));
          var s = document.getElementsByTagName("script")[0];
          const a = document.createElement("script");
          (a.src = t),
            (a.onload = o),
            (a.onerror = n),
            s.parentNode.insertBefore(a, s),
            e && (i = setInterval(o, 100));
        });
      }
      r.d(e, { Z: () => n });
    },
    209: (t, e, r) => {
      "use strict";
      r.d(e, { Z: () => n });
      const n = {
        stringify: (t) => btoa(encodeURIComponent(JSON.stringify(t))),
        parse(t) {
          if (!t) return {};
          const e = (function (t) {
            try {
              return JSON.parse(decodeURIComponent(atob(t) || "{}"));
            } catch (t) {
              return "";
            }
          })(t);
          return Object.keys(e).length > 0
            ? e
            : JSON.parse(
                (function (t) {
                  try {
                    return JSON.parse(atob(t) || "{}");
                  } catch (t) {
                    return "";
                  }
                })(t) || "{}"
              );
        },
      };
    },
    254: (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, { default: () => P });
      var n = r(6390),
        i = r(6558),
        o = r(8293),
        s = r(209),
        a = function (t, e, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function s(t) {
              try {
                u(n.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(n.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(s, a);
            }
            u((n = n.apply(t, e || [])).next());
          });
        };
      class u {
        constructor(t, e) {
          (this.gp = t), (this.config = e);
          try {
            const t = new URL(window.location.href).searchParams.get(
              "_gpParams"
            );
            t && (this.shareParams = s.Z.parse(t));
          } catch (t) {
            i.kg.error(t);
          }
        }
        get appUrl() {
          return (0, n.T)();
        }
        init() {
          return a(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return (this.ready = t.ready), t.done(this), t.ready;
          });
        }
        getPlayer() {
          return a(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return (
              t.done({
                id: 0,
                name: "",
                photoSmall: "",
                photoMedium: "",
                photoLarge: "",
              }),
              t.ready
            );
          });
        }
        showRewardedVideo() {
          const t = (0, o._)();
          return t.done(!1), t.ready;
        }
        showPreloader() {
          const t = (0, o._)();
          return t.done(!1), t.ready;
        }
        showFullscreen() {
          const t = (0, o._)();
          return t.done(!1), t.ready;
        }
        showSticky() {
          const t = (0, o._)();
          return t.done(!1), t.ready;
        }
        closeSticky() {}
        refreshSticky() {
          return this.closeSticky(), this.showSticky();
        }
        makeShareUrl(t) {
          const e = s.Z.stringify(t),
            r = new URL(this.gp.app.url);
          return r.searchParams.set("_gpParams", e), r.href || "";
        }
        getShareParam(t) {
          return this.shareParams ? this.shareParams[t] : "";
        }
      }
      var c = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class h {
        constructor(t) {
          (this.sdk = t), (this.hasCredetials = !1), (this.userId = "");
        }
        getPlayerAuthInfo() {
          return c(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return yield this.sdk.ready, t.done({}), t.ready;
          });
        }
        getPlayerContext() {
          return c(this, void 0, void 0, function* () {
            return { platformData: yield this.getPlayerAuthInfo(), key: "" };
          });
        }
        loginPlayer() {
          return c(this, void 0, void 0, function* () {
            return this.sdk.getPlayer();
          });
        }
        getPlayer() {
          return c(this, void 0, void 0, function* () {
            return this.sdk.getPlayer();
          });
        }
        publishRecord(t) {}
        isPlatformAvatar() {
          return !1;
        }
      }
      var d = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class l {
        constructor(t) {
          (this.sdk = t),
            (this.isStickyAvailable = !1),
            (this.isFullscreenAvailable = !1),
            (this.isRewardedAvailable = !1),
            (this.isPreloaderAvailable = !1);
        }
        showPreloader() {
          return d(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showPreloader().catch(() => !1)
            );
          });
        }
        showFullscreen() {
          return d(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showFullscreen().catch(() => !1)
            );
          });
        }
        showRewardedVideo() {
          return d(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showRewardedVideo().catch(() => !1)
            );
          });
        }
        showSticky() {
          return d(this, void 0, void 0, function* () {
            return yield this.sdk.ready, this.sdk.showSticky().catch(() => !1);
          });
        }
        refreshSticky() {
          return d(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.refreshSticky().catch(() => !1)
            );
          });
        }
        closeSticky() {
          return d(this, void 0, void 0, function* () {
            return yield this.sdk.ready, this.sdk.closeSticky();
          });
        }
      }
      var v = r(2712),
        f = r(5942),
        p = r(5572);
      class y {
        constructor(t) {
          (this.sdk = t),
            (this.hasIntegratedAuth = !1),
            (this.isExternalLinksAllowed = !0),
            (this.isSecretCodeAuthAvailable = !0),
            (this._hasAuthModal = !1),
            (this.type = f.z.NONE),
            (this.socialNetworks = v.hc);
        }
        getSDK() {
          return this.sdk;
        }
        getNativeSDK() {
          return this.sdk;
        }
        requestPermissions() {
          return (
            (t = this),
            (e = void 0),
            (n = function* () {
              return p.VK;
            }),
            new ((r = void 0) || (r = Promise))(function (i, o) {
              function s(t) {
                try {
                  u(n.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                try {
                  u(n.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? i(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(s, a);
              }
              u((n = n.apply(t, e || [])).next());
            })
          );
          var t, e, r, n;
        }
      }
      class m {
        constructor(t) {
          (this.sdk = t),
            (this.isSupportsShare = !0),
            (this.isSupportsNativeShare = !1),
            (this.isSupportsNativePosts = !1),
            (this.isSupportsNativeInvite = !1),
            (this.isSupportsNativeCommunityJoin = !1),
            (this.canJoinCommunity = !0),
            (this.isSupportShareParams = !0);
        }
        get shareParams() {
          return this.sdk.shareParams;
        }
        share(t) {
          return Promise.resolve(!1);
        }
        post(t) {
          return Promise.resolve(!1);
        }
        invite(t) {
          return Promise.resolve(!1);
        }
        joinCommunity() {
          return Promise.resolve(!1);
        }
        makeShareUrl(t) {
          return this.sdk.makeShareUrl(t);
        }
        getShareParam(t) {
          return this.sdk.getShareParam(t);
        }
      }
      var w = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class k {
        constructor(t) {
          (this.sdk = t),
            (this.isSupportsSubscriptions = !1),
            (this.isSupportsPayments = !1),
            (this.isServerValidation = !1);
        }
        mapProducts(t, e) {
          return w(this, void 0, void 0, function* () {
            return e;
          });
        }
        consumeAllExpired(t, e) {
          return w(this, void 0, void 0, function* () {});
        }
        fetchPurchases() {
          return w(this, void 0, void 0, function* () {
            return { payload: {}, purchases: [] };
          });
        }
        purchase(t) {
          return w(this, void 0, void 0, function* () {
            return {};
          });
        }
        consume(t) {
          return w(this, void 0, void 0, function* () {
            return {};
          });
        }
        subscribe(t, e) {
          return w(this, void 0, void 0, function* () {
            return {};
          });
        }
        unsubscribe(t, e) {
          return w(this, void 0, void 0, function* () {
            return {};
          });
        }
      }
      var g = r(501);
      function P(t) {
        return (
          (e = this),
          (r = void 0),
          (i = function* () {
            const e = new u(t.gp, {}),
              [, , r] = yield Promise.all([
                e.init(),
                t.setupStorage([]),
                t.fetchConfig(),
              ]),
              n = new h(e);
            return {
              adsAdapter: new l(e),
              appAdapter: new g.Z(),
              playerAdapter: n,
              platformAdapter: new y(e),
              socialsAdapter: new m(e),
              paymentsAdapter: new k(e),
              projectConfig: r,
            };
          }),
          new ((n = void 0) || (n = Promise))(function (t, o) {
            function s(t) {
              try {
                u(i.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(i.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(e) {
              var r;
              e.done
                ? t(e.value)
                : ((r = e.value),
                  r instanceof n
                    ? r
                    : new n(function (t) {
                        t(r);
                      })).then(s, a);
            }
            u((i = i.apply(e, r || [])).next());
          })
        );
        var e, r, n, i;
      }
    },
    5940: (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, { default: () => b });
      var n = r(4917),
        i = r(6558),
        o = r(8293),
        s = r(3204),
        a = function (t, e, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function s(t) {
              try {
                u(n.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(n.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(s, a);
            }
            u((n = n.apply(t, e || [])).next());
          });
        };
      class u {
        constructor(t) {
          (this.gp = t), (this.lang = s.Uo.EN);
          const e = (
            new URL(location.href).searchParams.get("lang") || ""
          ).toLowerCase();
          this.lang = Object.values(s.Uo).includes(e) ? e : null;
        }
        get appUrl() {
          return "";
        }
        init() {
          return a(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return (
              (this.ready = t.ready),
              (0, n.Z)({
                src: "https://integration.gamepix.com/sdk/v3/gamepix.sdk.js",
                check: (t) => "GamePix" in t,
              })
                .then(() => {
                  (this.sdk = window.GamePix),
                    (this.sdk.on.pause = () => this.gp.pause()),
                    (this.sdk.on.resume = () => this.gp.resume()),
                    t.done(this);
                })
                .catch((e) => {
                  i.kg.error(e), t.done(this);
                }),
              setTimeout(() => t.done(this), 5e3),
              t.ready
            );
          });
        }
        getPlayer() {
          return a(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return (
              t.done({
                id: 0,
                name: "",
                photoSmall: "",
                photoMedium: "",
                photoLarge: "",
              }),
              t.ready
            );
          });
        }
        showFullscreen() {
          return a(this, void 0, void 0, function* () {
            const t = (0, o._)();
            try {
              yield this.sdk.interstitialAd().then((e) => t.done(!!e.success));
            } catch (e) {
              t.abort(e);
            }
            return t.ready;
          });
        }
        showRewardedVideo() {
          return a(this, void 0, void 0, function* () {
            const t = (0, o._)();
            try {
              yield this.sdk.rewardAd().then((e) => t.done(!!e.success));
            } catch (e) {
              t.abort(e);
            }
            return t.ready;
          });
        }
        showPreloader() {
          return this.showFullscreen();
        }
        getStorage() {
          return this.sdk.localStorage;
        }
      }
      var c = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class h {
        constructor(t) {
          (this.sdk = t),
            (this.isStickyAvailable = !1),
            (this.isFullscreenAvailable = !0),
            (this.isRewardedAvailable = !0),
            (this.isPreloaderAvailable = !0);
        }
        showPreloader() {
          return c(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showPreloader().catch(() => !1)
            );
          });
        }
        showFullscreen() {
          return c(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showFullscreen().catch(() => !1)
            );
          });
        }
        showRewardedVideo() {
          return c(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showRewardedVideo().catch(() => !1)
            );
          });
        }
        showSticky() {
          return c(this, void 0, void 0, function* () {
            return yield this.sdk.ready, !1;
          });
        }
        refreshSticky() {
          return c(this, void 0, void 0, function* () {
            return yield this.sdk.ready, !1;
          });
        }
        closeSticky() {
          return c(this, void 0, void 0, function* () {
            yield this.sdk.ready;
          });
        }
      }
      var d = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class l {
        constructor(t) {
          (this.sdk = t), (this.hasCredetials = !1), (this.userId = "");
        }
        getPlayerAuthInfo() {
          return d(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return t.done({}), t.ready;
          });
        }
        getPlayerContext() {
          return d(this, void 0, void 0, function* () {
            return { platformData: yield this.getPlayerAuthInfo(), key: "" };
          });
        }
        loginPlayer() {
          return d(this, void 0, void 0, function* () {
            return this.sdk.getPlayer();
          });
        }
        getPlayer() {
          return d(this, void 0, void 0, function* () {
            return this.sdk.getPlayer();
          });
        }
        publishRecord(t) {}
        isPlatformAvatar() {
          return !1;
        }
      }
      var v = r(501),
        f = r(2712),
        p = r(5942),
        y = r(5572);
      class m {
        constructor(t) {
          (this.sdk = t),
            (this.hasIntegratedAuth = !1),
            (this.isExternalLinksAllowed = !1),
            (this.isSecretCodeAuthAvailable = !0),
            (this._hasAuthModal = !1),
            (this.type = p.z.GAMEPIX),
            (this.socialNetworks = f.FU);
        }
        getSDK() {
          return this.sdk;
        }
        getNativeSDK() {
          return this.sdk.sdk;
        }
        requestPermissions() {
          return (
            (t = this),
            (e = void 0),
            (n = function* () {
              return y.VK;
            }),
            new ((r = void 0) || (r = Promise))(function (i, o) {
              function s(t) {
                try {
                  u(n.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                try {
                  u(n.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? i(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(s, a);
              }
              u((n = n.apply(t, e || [])).next());
            })
          );
          var t, e, r, n;
        }
      }
      class w {
        constructor(t, e) {
          (this.sdk = t),
            (this.gameLink = e),
            (this.isSupportsShare = !!this.gameLink),
            (this.isSupportsNativeShare = !1),
            (this.isSupportsNativePosts = !1),
            (this.isSupportsNativeInvite = !1),
            (this.isSupportsNativeCommunityJoin = !1),
            (this.canJoinCommunity = !1),
            (this.isSupportShareParams = !1);
        }
        get shareParams() {
          return {};
        }
        share(t) {
          return Promise.resolve(!1);
        }
        post(t) {
          return Promise.resolve(!1);
        }
        invite(t) {
          return Promise.resolve(!1);
        }
        joinCommunity() {
          return Promise.resolve(!1);
        }
        makeShareUrl(t) {
          return "";
        }
        getShareParam(t) {
          return "";
        }
      }
      var k = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class g {
        constructor(t) {
          (this.sdk = t),
            (this.isSupportsSubscriptions = !1),
            (this.isSupportsPayments = !1),
            (this.isServerValidation = !1);
        }
        mapProducts(t, e) {
          return k(this, void 0, void 0, function* () {
            return e;
          });
        }
        consumeAllExpired(t, e) {
          return k(this, void 0, void 0, function* () {});
        }
        fetchPurchases() {
          return k(this, void 0, void 0, function* () {
            return { payload: {}, purchases: [] };
          });
        }
        purchase(t) {
          return k(this, void 0, void 0, function* () {
            return {};
          });
        }
        consume(t) {
          return k(this, void 0, void 0, function* () {
            return {};
          });
        }
        subscribe(t, e) {
          return k(this, void 0, void 0, function* () {
            return {};
          });
        }
        unsubscribe(t, e) {
          return k(this, void 0, void 0, function* () {
            return {};
          });
        }
      }
      var P,
        S = function (t, e, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function s(t) {
              try {
                u(n.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(n.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(s, a);
            }
            u((n = n.apply(t, e || [])).next());
          });
        },
        x = function (t, e, r, n) {
          if ("a" === r && !n)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof e ? t !== e || !n : !e.has(t))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === r ? n : "a" === r ? n.call(t) : n ? n.value : e.get(t);
        };
      class A {
        constructor(t) {
          (this.sdk = t), P.set(this, void 0), (this.isLocal = !0);
        }
        ready() {
          return S(this, void 0, void 0, function* () {
            x(this, P, "f") ||
              (yield this.sdk.ready,
              (function (t, e, r, n, i) {
                if ("m" === n)
                  throw new TypeError("Private method is not writable");
                if ("a" === n && !i)
                  throw new TypeError(
                    "Private accessor was defined without a setter"
                  );
                if ("function" == typeof e ? t !== e || !i : !e.has(t))
                  throw new TypeError(
                    "Cannot write private member to an object whose class did not declare it"
                  );
                "a" === n ? i.call(t, r) : i ? (i.value = r) : e.set(t, r);
              })(this, P, yield this.sdk.getStorage(), "f"));
          });
        }
        set(t, e) {
          return S(this, void 0, void 0, function* () {
            yield this.ready(), x(this, P, "f").setItem(t, JSON.stringify(e));
          });
        }
        get(t) {
          return S(this, void 0, void 0, function* () {
            yield this.ready();
            try {
              return JSON.parse(x(this, P, "f").getItem(t) || "null");
            } catch (t) {}
          });
        }
        remove(t) {
          return S(this, void 0, void 0, function* () {
            yield this.ready();
            try {
              return x(this, P, "f").removeItem(t);
            } catch (t) {}
          });
        }
      }
      P = new WeakMap();
      function b(t) {
        return (
          (e = this),
          (r = void 0),
          (i = function* () {
            const e = new u(t.gp),
              [, , r] = yield Promise.all([
                e.init(),
                t.setupStorage([new A(e)]),
                t.fetchConfig(e.lang),
              ]),
              n = new h(e),
              i = new l(e);
            return {
              adsAdapter: n,
              appAdapter: new v.Z(),
              playerAdapter: i,
              platformAdapter: new m(e),
              socialsAdapter: new w(e, r.platformConfig.gameLink),
              paymentsAdapter: new g(e),
              projectConfig: r,
            };
          }),
          new ((n = void 0) || (n = Promise))(function (t, o) {
            function s(t) {
              try {
                u(i.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(i.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(e) {
              var r;
              e.done
                ? t(e.value)
                : ((r = e.value),
                  r instanceof n
                    ? r
                    : new n(function (t) {
                        t(r);
                      })).then(s, a);
            }
            u((i = i.apply(e, r || [])).next());
          })
        );
        var e, r, n, i;
      }
    },
    449: (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, { default: () => S });
      var n = r(4917),
        i = r(6558),
        o = r(8293),
        s = r(3204),
        a = r(209),
        u = function (t, e, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function s(t) {
              try {
                u(n.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(n.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(s, a);
            }
            u((n = n.apply(t, e || [])).next());
          });
        };
      class c {
        constructor(t) {
          (this.gp = t), (this.lang = s.Uo.EN), (this.gameUrl = "");
          const e = (
            new URL(location.href).searchParams.get("lang") || ""
          ).toLowerCase();
          this.lang = Object.values(s.Uo).includes(e) ? e : null;
        }
        get appUrl() {
          return this.gameUrl;
        }
        init() {
          return u(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return (
              (this.ready = t.ready),
              (0, n.Z)({
                src: "https://game-cdn.poki.com/scripts/v2/poki-sdk.js",
                check: (t) => "PokiSDK" in t,
              })
                .then(() => {
                  var e;
                  (this.poki = window.PokiSDK),
                    (
                      (null === (e = this.poki.SDK) || void 0 === e
                        ? void 0
                        : e.initializingPromise) || this.poki.init()
                    )
                      .then(() => t.done(this))
                      .catch(() => t.done(this)),
                    this.ready.then(() => this.createGameLink()),
                    this.gp.on("gameplayStart", () =>
                      this.poki.gameplayStart()
                    ),
                    this.gp.on("gameplayStop", () => this.poki.gameplayStop()),
                    this.gp.on("gameStart", () =>
                      this.poki.gameLoadingFinished()
                    );
                })
                .catch((e) => {
                  i.kg.error(e), t.done(this);
                }),
              setTimeout(() => t.done(this), 5e3),
              t.ready
            );
          });
        }
        getPlayer() {
          return u(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return (
              t.done({
                id: 0,
                name: "",
                photoSmall: "",
                photoMedium: "",
                photoLarge: "",
              }),
              t.ready
            );
          });
        }
        showFullscreen() {
          var t;
          return u(this, void 0, void 0, function* () {
            const e = (0, o._)();
            try {
              const r = yield this.poki.commercialBreak();
              e.done(
                !!(null === (t = null == r ? void 0 : r[0]) || void 0 === t
                  ? void 0
                  : t.rewardAllowed)
              );
            } catch (t) {
              e.abort(t);
            }
            return e.ready;
          });
        }
        showRewardedVideo() {
          return u(this, void 0, void 0, function* () {
            const t = (0, o._)();
            try {
              yield this.poki.rewardedBreak().then((e) => t.done(!!e));
            } catch (e) {
              t.abort(e);
            }
            return t.ready;
          });
        }
        showPreloader() {
          return this.showFullscreen();
        }
        createGameLink() {
          return u(this, void 0, void 0, function* () {
            try {
              const t = this.poki.getURLParam("gd_gpParams");
              t && (this.shareParams = a.Z.parse(t));
            } catch (t) {
              i.kg.error(t);
            }
            try {
              this.gameUrl = yield this.poki.shareableURL();
            } catch (t) {}
          });
        }
        makeShareUrl(t) {
          try {
            const e = a.Z.stringify(t),
              r = new URL(this.gp.app.url);
            return r.searchParams.set("gd_gpParams", e), r.href || "";
          } catch (t) {
            return (
              i.kg.error("unable to get link on POKI platform in test mode"), ""
            );
          }
        }
        getShareParam(t) {
          return this.shareParams ? this.shareParams[t] : "";
        }
      }
      var h = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class d {
        constructor(t) {
          (this.sdk = t),
            (this.isStickyAvailable = !1),
            (this.isFullscreenAvailable = !0),
            (this.isRewardedAvailable = !0),
            (this.isPreloaderAvailable = !0);
        }
        showPreloader() {
          return h(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showPreloader().catch(() => !1)
            );
          });
        }
        showFullscreen() {
          return h(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showFullscreen().catch(() => !1)
            );
          });
        }
        showRewardedVideo() {
          return h(this, void 0, void 0, function* () {
            return (
              yield this.sdk.ready, this.sdk.showRewardedVideo().catch(() => !1)
            );
          });
        }
        showSticky() {
          return h(this, void 0, void 0, function* () {
            return yield this.sdk.ready, !1;
          });
        }
        refreshSticky() {
          return h(this, void 0, void 0, function* () {
            return yield this.sdk.ready, !1;
          });
        }
        closeSticky() {
          return h(this, void 0, void 0, function* () {
            yield this.sdk.ready;
          });
        }
      }
      var l = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class v {
        constructor(t) {
          (this.sdk = t), (this.hasCredetials = !1), (this.userId = "");
        }
        getPlayerAuthInfo() {
          return l(this, void 0, void 0, function* () {
            const t = (0, o._)();
            return t.done({}), t.ready;
          });
        }
        getPlayerContext() {
          return l(this, void 0, void 0, function* () {
            return { platformData: yield this.getPlayerAuthInfo(), key: "" };
          });
        }
        loginPlayer() {
          return l(this, void 0, void 0, function* () {
            return this.sdk.getPlayer();
          });
        }
        getPlayer() {
          return l(this, void 0, void 0, function* () {
            return this.sdk.getPlayer();
          });
        }
        isPlatformAvatar() {
          return !1;
        }
        publishRecord(t) {}
      }
      var f = r(501),
        p = r(2712),
        y = r(5942),
        m = r(5572);
      class w {
        constructor(t) {
          (this.sdk = t),
            (this.hasIntegratedAuth = !1),
            (this.isExternalLinksAllowed = !1),
            (this.isSecretCodeAuthAvailable = !0),
            (this._hasAuthModal = !1),
            (this.type = y.z.POKI),
            (this.socialNetworks = p.FU);
        }
        getSDK() {
          return this.sdk;
        }
        getNativeSDK() {
          return this.sdk.poki;
        }
        requestPermissions() {
          return (
            (t = this),
            (e = void 0),
            (n = function* () {
              return m.VK;
            }),
            new ((r = void 0) || (r = Promise))(function (i, o) {
              function s(t) {
                try {
                  u(n.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                try {
                  u(n.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? i(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(s, a);
              }
              u((n = n.apply(t, e || [])).next());
            })
          );
          var t, e, r, n;
        }
      }
      class k {
        constructor(t, e) {
          (this.sdk = t),
            (this.gameLink = e),
            (this.isSupportsShare = !0),
            (this.isSupportsNativeShare = !1),
            (this.isSupportsNativePosts = !1),
            (this.isSupportsNativeInvite = !1),
            (this.isSupportsNativeCommunityJoin = !1),
            (this.canJoinCommunity = !1),
            (this.isSupportShareParams = !0);
        }
        get shareParams() {
          return this.sdk.shareParams;
        }
        share() {
          return (
            (t = this),
            (e = void 0),
            (n = function* () {
              return Promise.resolve(!1);
            }),
            new ((r = void 0) || (r = Promise))(function (i, o) {
              function s(t) {
                try {
                  u(n.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                try {
                  u(n.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? i(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(s, a);
              }
              u((n = n.apply(t, e || [])).next());
            })
          );
          var t, e, r, n;
        }
        post(t) {
          return Promise.resolve(!1);
        }
        invite(t) {
          return Promise.resolve(!1);
        }
        joinCommunity() {
          return Promise.resolve(!1);
        }
        makeShareUrl(t) {
          return this.sdk.makeShareUrl(t);
        }
        getShareParam(t) {
          return this.sdk.getShareParam(t);
        }
      }
      var g = function (t, e, r, n) {
        return new (r || (r = Promise))(function (i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof r
                  ? e
                  : new r(function (t) {
                      t(e);
                    })).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        });
      };
      class P {
        constructor(t) {
          (this.sdk = t),
            (this.isSupportsSubscriptions = !1),
            (this.isSupportsPayments = !1),
            (this.isServerValidation = !1);
        }
        mapProducts(t, e) {
          return g(this, void 0, void 0, function* () {
            return e;
          });
        }
        consumeAllExpired(t, e) {
          return g(this, void 0, void 0, function* () {});
        }
        fetchPurchases() {
          return g(this, void 0, void 0, function* () {
            return { payload: {}, purchases: [] };
          });
        }
        purchase(t) {
          return g(this, void 0, void 0, function* () {
            return {};
          });
        }
        consume(t) {
          return g(this, void 0, void 0, function* () {
            return {};
          });
        }
        subscribe(t, e) {
          return g(this, void 0, void 0, function* () {
            return {};
          });
        }
        unsubscribe(t, e) {
          return g(this, void 0, void 0, function* () {
            return {};
          });
        }
      }
      function S(t) {
        return (
          (e = this),
          (r = void 0),
          (i = function* () {
            const e = new c(t.gp),
              [, , r] = yield Promise.all([
                e.init(),
                t.setupStorage([]),
                t.fetchConfig(e.lang),
              ]),
              n = new d(e),
              i = new v(e);
            return {
              adsAdapter: n,
              appAdapter: new f.Z(),
              playerAdapter: i,
              platformAdapter: new w(e),
              socialsAdapter: new k(e, r.platformConfig.gameLink),
              paymentsAdapter: new P(e),
              projectConfig: r,
            };
          }),
          new ((n = void 0) || (n = Promise))(function (t, o) {
            function s(t) {
              try {
                u(i.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(i.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(e) {
              var r;
              e.done
                ? t(e.value)
                : ((r = e.value),
                  r instanceof n
                    ? r
                    : new n(function (t) {
                        t(r);
                      })).then(s, a);
            }
            u((i = i.apply(e, r || [])).next());
          })
        );
        var e, r, n, i;
      }
    },
  },
]);
