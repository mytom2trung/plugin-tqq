var _t = Object.defineProperty;
var $t = (S, I, g) =>
  I in S
    ? _t(S, I, { enumerable: !0, configurable: !0, writable: !0, value: g })
    : (S[I] = g);
var z = (S, I, g) => ($t(S, typeof I != "symbol" ? I + "" : I, g), g);
(function () {
  "use strict";
  const S = [];
  for (let t = 0; t < 256; ++t) S.push((t + 256).toString(16).slice(1));
  typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  function I(t) {
    try {
      const { pathname: n, search: e } = new URL(t);
      return `${n}${e}`;
    } catch (n) {
      return t;
    }
  }
  function g(t, n) {
    const e = I(t.attr("href")),
      a = t.text().trim();
    return { path: e, name: n ? n(a) : a };
  }
  function G(t) {
    const [n, e, a] = t.split("/");
    return new Date(`00:00 ${e}/${n}/${a}`).getTime();
  }
  function L(t) {
    t = t.trim().toLowerCase().replace(".", "");
    const n = parseFloat(t);
    if (Number.isNaN(n)) return null;
    switch (t[t.length - 1]) {
      case "k":
        return n * 1e3;
      case "m":
        return n * 1e6;
      case "g":
        return n * 1e9;
      default:
        return n;
    }
  }
  function b(t, n) {
    return (
      (t = t.trim().toLowerCase()),
      t.endsWith("giây trước")
        ? n - parseInt(t) * 1e3
        : t.endsWith("phút trước")
        ? n - parseInt(t) * 1e3 * 60
        : t.endsWith("giờ trước")
        ? n - parseInt(t) * 1e3 * 60 * 60
        : t.endsWith("ngày trước")
        ? n - parseInt(t) * 1e3 * 60 * 60 * 24
        : t.endsWith("tháng trước")
        ? n - parseInt(t) * 1e3 * 60 * 60 * 24 * 30
        : t.endsWith("năm trước")
        ? n - parseInt(t) * 1e3 * 60 * 60 * 24 * 365
        : new Date(
            t.replace(
              /^(\d{1,2}):(\d{1,2}) (\d{1,2})\/(\d{1,2})(\/\d{2,4})?$/,
              (e, a, s, r, o, c) => {
                var i;
                return `${a}:${s}:00 ${o}/${r}/${
                  (i = c == null ? void 0 : c.slice(1)) != null
                    ? i
                    : new Date(n).getFullYear()
                }`;
              }
            )
          ).getTime() ||
          new Date(
            t.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{1,})$/, "$2/$1/$3")
          ).getTime()
    );
  }
  const Y = /^Chương|Chapter|Chap\.?\s+/i;
  function j(t) {
    return t.replace(Y, "").trim();
  }
  function O(t, n = !0) {
    const { pathname: e, search: a } = new URL(t, "http://localhost");
    return (
      (!e || e === "/" || e === "/index" || e === "/index.html") && (!n || !a)
    );
  }
  function R(t) {
    return t.startsWith("http://")
      ? `https${t.slice(4)}`
      : t.startsWith("//")
      ? `https:${t}`
      : t;
  }
  function K(t) {
    return Object.assign(self, { __DEFINE_API__: t }), t;
  }
  function Z(t) {
    return Object.assign(self, { __DEFINE_PACKAGE__: t }), t;
  }
  function U(t, n) {
    return AppInfo.extension
      ? `${t}#truyenqq_extra`
      : `https://mangahay.deno.dev/?url=${encodeURIComponent(
          t.slice(t.indexOf(".") + 1).split("/", 1)[0] ===
            "googleusercontent.com"
            ? t
            : `https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*&url=${encodeURIComponent(
                t
              )}`
        )}&headers=${encodeURIComponent(JSON.stringify(n))}`;
  }
  const d = "https://truyenqqvn.com",
    P = {
      "mangaqq.net": "i200.truyenvua.com",
      "cdnqq.xyz": "i200.truyenvua.com",
      "mangaqq.com": "i216.truyenvua.com",
      "photruyen.com": "i109.truyenvua.com",
      "tintruyen.com": "i109.truyenvua.com",
      "trangshop.net": "i109.truyenvua.com",
      "tintruyen.net": "i138.truyenvua.com",
      "i125.tintruyen.net": "i125.truyenvua.com",
      "qqtaku.com": "i125.truyenvua.com",
    },
    D = { referer: d },
    tt = [
      {
        name: "Server 1",
        has: () => !0,
        parse: ({ pages: t }) => t.map((n) => U(n.src, D)),
      },
      {
        name: "Server 2",
        has: ({ pages: t }) => t[0].original !== null,
        parse: ({ pages: t }) => t.map((n) => U(n.original, D)),
      },
      {
        name: "Server 4",
        has: ({ pages: t }) => {
          var n;
          for (const e in P)
            if ((n = t[0].cdn) != null && n.includes(e)) return !0;
          return !1;
        },
        parse: ({ pages: t }) =>
          t.map((n) => {
            var e;
            for (const a in P)
              if ((e = n.original) != null && e.includes(a))
                return U(n.original.replace(a, P[a]), D);
            return U(n.original, D);
          }),
      },
      {
        name: "Server 5",
        has: ({ pages: t }) => t[0].cdn !== null,
        parse: ({ pages: t }) => t.map((n) => U(n.cdn, D)),
      },
    ],
    B = [
      {
        value: "ngay",
        match: "/top-ngay.html",
        name: { "vi-VN": "Ngày", "en-US": "Date" },
      },
      {
        value: "tuan",
        match: "/top-tuan.html",
        name: { "vi-VN": "Tuần", "en-US": "Week" },
      },
      {
        value: "thang",
        match: "/top-thang.html",
        name: { "vi-VN": "Tháng", "en-US": "Month" },
      },
    ],
    F = "truyenqqq",
    et = "Truyện QQ",
    nt = "0.1.7",
    at = "Plugin nguồn Truyện QQ.",
    rt = "deptrai",
    ot = "//m.ophimne.xyz",
    st =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACf1BMVEUjHyAjHiEiISAkHyEkICEiHh4jHiAtKihXNROFTiAnICQAAAA6KyYAADpDMiUnIiJsQiIjHyAjHyAjHyAjHyAjHyAjHyAkHyEkICEjHyAjHyAkICEmISEkHyArJyg9OTorJygvLCw7NzgmIiMjICEqJisiHh82MjOura3m5eWwr68zLzBDQEHAv7/l5OWYlpYoJCUjHyAkICEjHyAiHh+Jh4jQz8/x8PBxbm8gHB2XlZbf399hXl8gHB0jHyEmIiO4t7fU09SLiosdGx25t7iMioseGhwnIyTJycqBcGOglY7DwsKMiosfGxwlISKzsbLv8PCsmYvCiFe9h1ujlYr///+DgYEfGxwiHh9XVFTZ2dn+/v76+vvq7O7Cu6eejVy7uro6NzgiHh8jHyAhHR5EQEG/vb78/Px2XBUsKCUjHyAkICEpJSYdGRpAPD3f398kICEjHyAlISKDgIGRj4+UkpPt7e1qYEdOS0shHR4kHyEkICEhHR5gXV7f3t7y8O/19fX29vjKwam7tak9OjsiHh8lISEkHyAkICE+OjpeVE5YUlFVUlNVU1NVUE83MjIjHx8jICErJCFrQR9ELR4gGxsdGRseGhseGhxGLx5sQSBUNyErJSdeOyFoQCFGLyIFEyI/LCFpQCFgPCFiPiIjHyAiHh+ysbHm5uarqqqRj5BZVlcgHR+0s7S8u7tJRke5uLh9e3tsPxtpPhzHyMl7eXr////8/PzGwbPd3Nf9/f2qkk6QcBb09fe/qWrHlAakegX+/v79/v/SyrPMnBa3ig04Lh0hHh/x8fHAo1TKlwhzWRbz7+z07+qyjja/qXRhVU5aTUVaUEx8SB5/Sh+kvHkiAAAApXRSTlMAAAAAAAAAAAAAAAAAAAAAADWs7/7spC4yz8UoCaL78/n78vqSA9/89/jr9Pz79eL1zRsz7ff++dz+/vDW2yfu/vvU/v3H1+7y1/v9xdfu+/Tt8vT7+cTY7vDz/v36+/zT3t3u/vLw/vns3e78/fX4+jDq8ff7/PjO1SQWv/P2+PLy+d7crQ1H1ff+9Onp9fXMOD7l2X5wcITd7EMMe5Q7AkSWew2abqMxAAAAAWJLR0RVkwS4MwAAAAd0SU1FB+cKAg8rCSPcU0AAAAEUSURBVBjTY2BgFBQSXgoCIqJi4kzMDAwSksuWLQMJAEkpaRYGGdllcvIKQJFlikrKy1RUGaTV1DU0tbSXLdPR1dM3MDRiMDYxNVtubmG5zGrFSmsbWzsGY3uHVasdnZzXrF233sXVDSjgvmHDRg/PTZu9tmz19vEFCvj5b9seEBgUHLJjZ2hYOFAgIjIqeldMbNzuPfEJiUlAgeSU1LT0XXv37T+QkbksCyiQnZObl3/w0OEjR48dLwAKFBYVl5SWHdx14uSp0+UVlVUM1TW1dWfO1jc0Np0739zS2sbA2t7R2XWhu6e37+Kl/gkT2RjYOSZNvjxl6rTpM2ZemTWbk4uBm2fO3Hnzefn4FyxctHiJADcAQx5tLT0vWccAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMDJUMTU6NDM6MDkrMDA6MDCZdQqgAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTAyVDE1OjQzOjA5KzAwOjAw6CiyHAAAAABJRU5ErkJggg==",
    q = F;
  Z({
    id: F,
    name: et,
    favicon: st,
    version: nt,
    description: at,
    author: rt,
    homepage: ot,
    isNSFW: !1,
    language: "vi",
    support: !0,
    updatedAt: 1700038414939,
  });
  function E(t) {
    t = t.replace(/\.html$/i, "");
    const n = t.indexOf("/truyen-tranh/") + 14;
    if (n === 13) throw new Error("Invalid url " + t);
    t = t.slice(n, t.indexOf("?", n) >>> 0).replace(/\.html$/, "");
    const e = t.match(/(.+?)-chap-(\d+)$/) || t.match(/(.+)$/);
    if (e) {
      const [, a, s] = e;
      return s
        ? { name: "comic chap", params: { sourceId: q, comic: a, chap: s } }
        : { name: "comic", params: { sourceId: q, comic: a } };
    }
    throw new Error("Invalid url " + t);
  }
  function M(t, n, e) {
    var h;
    const a = E(n.find("a").attr("href")),
      s = R(n.find("img").attr("src")),
      r = n.find(".book_name").text().trim(),
      o = n.find(".more-info .info"),
      c = g(n.find(".last_chapter > a"), (p) =>
        j(p).replace("Đọc Tiếp", "").trim()
      ),
      i = E(c.path),
      y = [
        {
          route: i,
          name: c.name,
          id: (h = i.params.chap) != null ? h : i.params.comic,
          updated_at: b(n.find(".time-ago").text().trim(), e),
          views: null,
        },
      ],
      _ = n.find(".type-label").text().trim(),
      x =
        o.length === 0
          ? null
          : o.eq(0).text().replace("Tình trạng:", "").trim(),
      v =
        o.length === 0
          ? null
          : L(
              o
                .eq(2)
                .text()
                .trim()
                .replace("Lượt theo dõi:", "")
                .replace(/,/g, "")
            ),
      w = n
        .find(".list-tags")
        .find("p")
        .toArray()
        .map((p) => t(p).text()),
      u = n.find(".excerpt").text().trim(),
      l =
        o.length === 0
          ? null
          : L(
              o
                .eq(1)
                .text()
                .trim()
                .replace("Lượt xem:", "")
                .trim()
                .replace(/,/g, "")
            );
    return {
      route: a,
      image: s,
      name: r,
      othername: null,
      author: null,
      last_chapters: y,
      label: _,
      status: x,
      views: l,
      likes: v,
      comments: null,
      tags: w,
      description: u,
    };
  }
  function ct(t, n) {
    const e = parseDom(t),
      a = e(".hero .is-child")
        .toArray()
        .map((o) => {
          var u;
          const c = e(o),
            i = E(c.find("a").attr("href")),
            y = R(c.find("img").attr("src").replace("290x191", "583x386")),
            _ = c.find("h3").text(),
            x =
              c
                .find("h5")
                .text()
                .replace("Thể loại: ", "")
                .split(",")
                .map((l) => l.trim()) || [],
            v = c.find(".excerpt").text(),
            w = [
              {
                route: i,
                name: j(c.find(".chapter").text()),
                id: (u = i.params.chap) != null ? u : i.params.comic,
                updated_at: null,
                views: null,
              },
            ];
          return {
            route: {
              name: "comic",
              params: { sourceId: i.params.sourceId, comic: i.params.comic },
            },
            last_chapters: w,
            image: y,
            name: _,
            othername: "",
            status: "",
            author: "",
            views: null,
            comments: null,
            likes: null,
            label: null,
            tags: x,
            description: v,
          };
        }),
      s = e("#div_suggest li")
        .toArray()
        .map((o) => M(e, e(o), n)),
      r = e("#main_homepage li")
        .toArray()
        .map((o) => M(e, e(o), n));
    return { sliders: a, hot: s, last_update: r };
  }
  function W(t) {
    t = t.replace(/\.html$/i, "");
    const n = t.indexOf("/the-loai/") + 10,
      e = t
        .slice(n, t.indexOf("?", n) >>> 0)
        .replace(/\/$/, "")
        .replace(/\/$/, "_");
    return {
      name: "genre",
      params: { sourceId: q, type: e },
      query: Object.fromEntries(
        new URL(t, "http://localhost").searchParams.entries()
      ),
    };
  }
  function T(t, n) {
    return t.toArray().map((e) => {
      var c;
      const a = n(e),
        s = parseInt(
          a.find(".icon-checkbox, .icon-tick").attr("data-id")
        ).toString(),
        r =
          (c = a.find(".icon-checkbox, .icon-tick").attr("title")) != null
            ? c
            : void 0;
      return { name: a.text().trim(), value: s, title: r };
    });
  }
  function Q(t, n) {
    var x, v, w;
    const e = parseDom(t),
      a = e(".homepage_tags h1").text().trim(),
      s = e(".tags_detail").text().trim();
    let r;
    if (
      ((r = e(".story-list-bl01 tr")
        .toArray()
        .map((u) => {
          const l = e(u),
            h = l.find("th").text(),
            p = l
              .find("select option")
              .toArray()
              .map((m) => {
                const A = e(m),
                  $ = W(A.attr("value")),
                  C = A.text();
                return { route: $, name: C };
              });
          if (h === "Sắp xếp") {
            let m = "";
            const A = p.map(($) => {
              const [C, f] = Object.entries($.route.query).at(-1);
              m = C;
              const k = $.name;
              return { value: f, name: k };
            });
            return { type: h, key: m, items: A };
          }
          if (p.length === 0) {
            let m = "";
            const A = l
              .find(".choose a")
              .toArray()
              .map(($) => {
                const C = e($),
                  [f, k] = [
                    ...new URL(
                      C.attr("href"),
                      "http://localhost"
                    ).searchParams.entries(),
                  ].at(-1);
                m = f;
                const H = C.text();
                return { value: k, name: H };
              });
            return { type: h, key: m, items: A };
          }
          return { type: h, select: p };
        })),
      r.length === 0)
    ) {
      const u = {
          type: "Thể loại",
          key: "category",
          items: [{ name: "Tất cả", value: "" }, ...T(e(".genre-item"), e)],
        },
        l = {
          type: "Quốc gia",
          key: "country",
          items: T(e("#country option"), e),
        },
        h = {
          type: "Tình trạng",
          key: "status",
          items: T(e("#status option"), e),
        },
        p = {
          type: "Số chap",
          key: "minchapter",
          items: T(e("#minchapter option"), e),
        },
        m = { type: "Sắp xếp", key: "sort", items: T(e("#sort option"), e) };
      r = [u, l, h, p, m];
    }
    const o = e("#main_homepage .list_grid li")
        .toArray()
        .map((u) => M(e, e(u), n)),
      c = parseInt(e(".page_redirect .active").text()),
      i = Number.isNaN(c) ? 1 : c,
      y = parseInt(
        (w =
          (v =
            (x = e(".page_redirect > *").last().attr("href")) == null
              ? void 0
              : x.match(/\/trang-(\d+)/)) == null
            ? void 0
            : v[1]) != null
          ? w
          : i + ""
      ),
      _ = Number.isNaN(y) ? 1 : y;
    return {
      name: a,
      description: s,
      filters: r,
      items: o,
      curPage: i,
      maxPage: _,
    };
  }
  async function J(t, n, e) {
    const { data: a, url: s } = await get({
      url: `${d}/${t.replace(
        ".html",
        ""
      )}/trang-${n}.html?${new URLSearchParams(e)}`,
    });
    if (O(s)) throw new Error("not_found");
    return Q(a, Date.now());
  }
  async function it() {
    const [t, n] = await Promise.all([
      get({ url: d }).then((e) => ct(e.data, Date.now())),
      J("top-ngay", 1, {}),
    ]);
    return {
      sliders: n.items.slice(0, 7),
      hot: n.items.slice(7),
      last_update: t.last_update,
    };
  }
  async function mt(t, n, e) {
    const a = new URL(
      t ? `the-loai/${t}` : `tim-kiem-nang-cao/trang-${n}.html`,
      d
    );
    for (const r in e) {
      const o = e[r];
      Array.isArray(o)
        ? o.forEach((c) => {
            a.searchParams.append(r, c);
          })
        : a.searchParams.set(r, e[r] + "");
    }
    const { data: s } = await get({ url: a.toString() });
    return Q(s, Date.now());
  }
  function N(t, n) {
    const e =
        +t
          .find(".reply-comment")
          .attr("onclick")
          .match(/addReply\((\d+)\)/)[1] + "",
      a = {
        avatar: R(t.find(".avartar-comment img").attr("data-src")),
        name: t.find(".outline-content-comment strong").text(),
        level: null,
        chapter: "",
      },
      s = t.find(".content-comment").html().trim(),
      r = parseInt(t.find(".total-like-comment").text()),
      o = b(t.find(".time").text(), n),
      c =
        t.find(".text-list-reply").length === 0
          ? 0
          : parseInt(t.find(".text-list-reply").text().trim());
    return {
      id: e,
      author: a,
      content: s,
      like: r,
      dislike: 0,
      created_at: o,
      replies: c,
      chapter_name: "",
    };
  }
  function pt(t, n) {
    var o, c;
    const e = parseDom(t),
      a = e(".info-comment")
        .toArray()
        .map((i) => N(e(i), n)),
      s = parseInt(e(".comment-count").text()),
      r = parseInt(
        ((c =
          (o = e("#comment_list .page_redirect > p").last().attr("onclick")) ==
          null
            ? void 0
            : o.match(/(\d+)/)) == null
          ? void 0
          : c[1]) || "0"
      );
    return { comments: a, comments_count: s, comments_pages: r };
  }
  async function ut(t, n = 0, e = 1, a, s) {
    const { data: r } = await post({
      url: `${d}/frontend/comment/list`,
      data: { book_id: t, parent_id: n, page: e, episode_id: a, team_id: s },
    });
    return pt(r, Date.now());
  }
  function V(t) {
    const n = parseDom(t);
    return n(".chapter-list")
      .find("a")
      .toArray()
      .map((e) => {
        const a = n(e),
          s = a.find(".time-chap").text(),
          { name: r, path: o } = g(a, j),
          c = E(o);
        return {
          path: o,
          route: c,
          id: c.params.chap,
          name: r,
          updated_at: s ? G(s) : null,
          views: null,
        };
      });
  }
  async function lt(t) {
    const { data: n } = await post({
      url: `${d}/frontend/manga/list`,
      data: { id: t, order: 1 },
    });
    return await V(n);
  }
  function ht(t) {
    const n = parseDom(t);
    return n("li > a")
      .toArray()
      .map((e) => {
        const a = n(e),
          s = E(a.attr("href")),
          r = R(a.find("img").attr("src")),
          o = a.find(".name").text(),
          c = a.find(".name_other").text(),
          i = j(a.find(".search_info p:eq(2)").text());
        return {
          route: s,
          image: r,
          name: o,
          othername: c,
          last_chapter: i,
          tags: [],
        };
      });
  }
  async function dt(t) {
    const { data: n } = await post({
      url: `${d}/frontend/search/search`,
      data: { type: "0", search: t },
    });
    return ht(n);
  }
  async function gt(t, n) {
    const { data: e } = await get({
      url: `${d}/tim-kiem/trang-${n}.html?q=${encodeURIComponent(t)}`,
    });
    return Q(e, Date.now());
  }
  function At(t) {
    t = t.replace(/\.html$/i, "");
    const n = t.indexOf("/tac-gia/") + 9,
      e = t
        .slice(n, t.indexOf("?", n) >>> 0)
        .replace(/\/$/, "")
        .replace(/\/$/, "_");
    return {
      name: "author",
      params: { sourceId: q, type: e },
      query: Object.fromEntries(
        new URL(t, "http://localhost").searchParams.entries()
      ),
    };
  }
  function ft(t, n) {
    var $, C;
    const e = parseDom(t),
      a = e(".book_other h1").text().trim(),
      s = e(".other-name").text(),
      r = parseInt(e("#book_id").attr("value")) + "",
      o = b(e(".time-chap").eq(0).text().trim(), n),
      c = R(e(".book_avatar img").attr("src")),
      i = e(".author a")
        .toArray()
        .map((f) => {
          const { name: k, path: H } = g(e(f));
          return { name: k, route: At(H) };
        }),
      y = e(".status p:not(.name)").text().trim(),
      _ = e(".list01 a")
        .toArray()
        .map((f) => {
          const { name: k, path: H } = g(e(f));
          return { name: k, route: W(H) };
        }),
      x = L(
        e(".status")
          .next()
          .next()
          .next()
          .find("p:not(.name)")
          .text()
          .replace(/,/g, "")
      ),
      v = { cur: 0, max: 0, count: 0 },
      w = parseInt(
        e(".status").next().next().find("p:not(.name)").text().replace(/,/g, "")
      ),
      u = parseInt(
        e(".status").next().find("p:not(.name)").text().replace(/,/g, "")
      ),
      l = e(".detail-content").text().trim(),
      h = e(".works-chapter-item")
        .toArray()
        .map((f) => {
          const k = e(f),
            H = k.find(".time-chap"),
            { name: kt, path: It } = g(k.find("a"), j),
            X = E(It);
          return {
            route: X,
            id: X.params.chap,
            name: kt,
            updated_at: G(H.text()),
            views: null,
          };
        }),
      p = e(".info-comment")
        .toArray()
        .map((f) => N(e(f), n)),
      m = parseInt(e(".comment-count").text()),
      A = parseInt(
        ((C =
          ($ = e("#comment_list .page_redirect > p").last().attr("onclick")) ==
          null
            ? void 0
            : $.match(/(\d+)/)) == null
          ? void 0
          : C[1]) || "0"
      );
    return {
      name: a,
      othername: s,
      manga_id: r,
      updated_at: o,
      image: c,
      author: i,
      status: y,
      genres: _,
      views: x,
      rate: v,
      follows: w,
      likes: u,
      description: l,
      chapters: h,
      comments: p,
      comments_count: m,
      comments_pages: A,
    };
  }
  async function yt(t) {
    const { data: n, url: e } = await get({
      url: `${d}/truyen-tranh/${t}.html`,
    });
    if (O(e)) throw new Error("not_found");
    return ft(n, Date.now());
  }
  function xt(t, n, e = !1) {
    var l, h;
    const a = parseDom(t),
      s = a("h1 > a").text(),
      r = parseInt(a("#book_id").attr("value")) + "",
      o = parseInt(a("#episode_name").attr("value")) + "",
      c = new Date(a(".detail-title").next("time").attr("datetime")).getTime(),
      i = a('meta[property="og:image"]').attr("content"),
      y = E(a("#path > ol > li:nth-child(2) > a").attr("href")),
      _ = a(".page-chapter img")
        .toArray()
        .map((p) => {
          const m = a(p);
          return {
            src: R(m.attr("src")),
            original: m.attr("data-original"),
            cdn: m.attr("data-cdn"),
          };
        }),
      x = a(".info-comment")
        .toArray()
        .map((p) => N(a(p), n)),
      v = parseInt(a(".comment-count").text()),
      w = parseInt(
        ((h =
          (l = a("#comment_list .page_redirect > p").last().attr("onclick")) ==
          null
            ? void 0
            : l.match(/(\d+)/)) == null
          ? void 0
          : h[1]) || "0"
      ),
      u = a(".chapter_list option")
        .toArray()
        .map((p) => {
          const m = a(p),
            A = E(m.attr("value"));
          return {
            route: A,
            id: A.params.chap,
            name: j(m.text().trim()),
            updated_at: null,
            views: null,
          };
        });
    return {
      name: s,
      manga_id: r,
      ep_id: o,
      updated_at: c,
      image: i,
      path_manga: y,
      pages: _,
      comments: x,
      comments_count: v,
      comments_pages: w,
      chapters: e ? void 0 : u,
    };
  }
  async function vt(t, n, e) {
    var o;
    const { data: a, url: s } = await get({
      url: `${d}/truyen-tranh/${t}-chap-${n}.html`,
    });
    if (O(s)) throw new Error("not_found");
    const r = await xt(a, Date.now(), e);
    if (e) return r;
    if (!((o = r.chapters) != null && o.length)) {
      const { data: c } = await post({
        url: `${d}/frontend/manga/list`,
        data: {
          id: r.manga_id,
          slug: r.path_manga.params.comic.replace(/-\d+$/, ""),
          order: 1,
        },
      });
      r.chapters = V(c);
    }
    return r;
  }
  class wt {
    constructor() {
      z(this, "Rankings", B);
      z(this, "Servers", tt);
    }
    async setup() {
      AppInfo.extension && (await setReferrers({ "#truyenqq": d }));
    }
    async index() {
      return it();
    }
    async getComic(n) {
      return yt(n);
    }
    async getComicChapter(n, e, a) {
      return vt(n, e, a);
    }
    async getComicComments(n, e, a = -1, s = 0, r, o) {
      return ut(n, s, r, a, o);
    }
    async getListChapters(n) {
      return lt(n);
    }
    async searchQuickly(n, e) {
      return dt(n);
    }
    async search(n, e) {
      return gt(n, e);
    }
    async getRanking(n, e, a) {
      n = n.toLowerCase();
      const s = B.find((r) => r.value.toLowerCase() === n);
      if (!s) throw new Error("not_found");
      return J(s.match, e, a);
    }
    async getCategory(n, e, a) {
      return mt(n, e, a);
    }
  }
  K(wt);
})();
