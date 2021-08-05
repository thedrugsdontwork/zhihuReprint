// JavaScript source code
function zse86inf(e) {
    return h(v(e))
}//次级入口
function xabparaminf(e) {
    var param = JSON.parse(e);
    return param.map((function (param) {
        return param.id + "=" + param.value
    }
    )).join(";")
};
function h(e) {
    var t, n, r = "";
    for (n = 0; n < e.length; n += 1)
        t = e.charCodeAt(n),
            r += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
    return r
}
function v(e) {
    return function (e) {
        return f(d(p(e), 8 * e.length))
    }(b(e))
}
function p(e) {
    var t, n = [];
    for (n[(e.length >> 2) - 1] = void 0,
        t = 0; t < n.length; t += 1)
        n[t] = 0;
    var r = 8 * e.length;
    for (t = 0; t < r; t += 8)
        n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
    return n
}
function d(e, t) {
    var n, r, o, a, d;
    e[t >> 5] |= 128 << t % 32,
        e[14 + (t + 64 >>> 9 << 4)] = t;
    var f = 1732584193
        , p = -271733879
        , h = -1732584194
        , b = 271733878;
    for (n = 0; n < e.length; n += 16)
        r = f,
            o = p,
            a = h,
            d = b,
            f = c(f, p, h, b, e[n], 7, -680876936),
            b = c(b, f, p, h, e[n + 1], 12, -389564586),
            h = c(h, b, f, p, e[n + 2], 17, 606105819),
            p = c(p, h, b, f, e[n + 3], 22, -1044525330),
            f = c(f, p, h, b, e[n + 4], 7, -176418897),
            b = c(b, f, p, h, e[n + 5], 12, 1200080426),
            h = c(h, b, f, p, e[n + 6], 17, -1473231341),
            p = c(p, h, b, f, e[n + 7], 22, -45705983),
            f = c(f, p, h, b, e[n + 8], 7, 1770035416),
            b = c(b, f, p, h, e[n + 9], 12, -1958414417),
            h = c(h, b, f, p, e[n + 10], 17, -42063),
            p = c(p, h, b, f, e[n + 11], 22, -1990404162),
            f = c(f, p, h, b, e[n + 12], 7, 1804603682),
            b = c(b, f, p, h, e[n + 13], 12, -40341101),
            h = c(h, b, f, p, e[n + 14], 17, -1502002290),
            f = s(f, p = c(p, h, b, f, e[n + 15], 22, 1236535329), h, b, e[n + 1], 5, -165796510),
            b = s(b, f, p, h, e[n + 6], 9, -1069501632),
            h = s(h, b, f, p, e[n + 11], 14, 643717713),
            p = s(p, h, b, f, e[n], 20, -373897302),
            f = s(f, p, h, b, e[n + 5], 5, -701558691),
            b = s(b, f, p, h, e[n + 10], 9, 38016083),
            h = s(h, b, f, p, e[n + 15], 14, -660478335),
            p = s(p, h, b, f, e[n + 4], 20, -405537848),
            f = s(f, p, h, b, e[n + 9], 5, 568446438),
            b = s(b, f, p, h, e[n + 14], 9, -1019803690),
            h = s(h, b, f, p, e[n + 3], 14, -187363961),
            p = s(p, h, b, f, e[n + 8], 20, 1163531501),
            f = s(f, p, h, b, e[n + 13], 5, -1444681467),
            b = s(b, f, p, h, e[n + 2], 9, -51403784),
            h = s(h, b, f, p, e[n + 7], 14, 1735328473),
            f = u(f, p = s(p, h, b, f, e[n + 12], 20, -1926607734), h, b, e[n + 5], 4, -378558),
            b = u(b, f, p, h, e[n + 8], 11, -2022574463),
            h = u(h, b, f, p, e[n + 11], 16, 1839030562),
            p = u(p, h, b, f, e[n + 14], 23, -35309556),
            f = u(f, p, h, b, e[n + 1], 4, -1530992060),
            b = u(b, f, p, h, e[n + 4], 11, 1272893353),
            h = u(h, b, f, p, e[n + 7], 16, -155497632),
            p = u(p, h, b, f, e[n + 10], 23, -1094730640),
            f = u(f, p, h, b, e[n + 13], 4, 681279174),
            b = u(b, f, p, h, e[n], 11, -358537222),
            h = u(h, b, f, p, e[n + 3], 16, -722521979),
            p = u(p, h, b, f, e[n + 6], 23, 76029189),
            f = u(f, p, h, b, e[n + 9], 4, -640364487),
            b = u(b, f, p, h, e[n + 12], 11, -421815835),
            h = u(h, b, f, p, e[n + 15], 16, 530742520),
            f = l(f, p = u(p, h, b, f, e[n + 2], 23, -995338651), h, b, e[n], 6, -198630844),
            b = l(b, f, p, h, e[n + 7], 10, 1126891415),
            h = l(h, b, f, p, e[n + 14], 15, -1416354905),
            p = l(p, h, b, f, e[n + 5], 21, -57434055),
            f = l(f, p, h, b, e[n + 12], 6, 1700485571),
            b = l(b, f, p, h, e[n + 3], 10, -1894986606),
            h = l(h, b, f, p, e[n + 10], 15, -1051523),
            p = l(p, h, b, f, e[n + 1], 21, -2054922799),
            f = l(f, p, h, b, e[n + 8], 6, 1873313359),
            b = l(b, f, p, h, e[n + 15], 10, -30611744),
            h = l(h, b, f, p, e[n + 6], 15, -1560198380),
            p = l(p, h, b, f, e[n + 13], 21, 1309151649),
            f = l(f, p, h, b, e[n + 4], 6, -145523070),
            b = l(b, f, p, h, e[n + 11], 10, -1120210379),
            h = l(h, b, f, p, e[n + 2], 15, 718787259),
            p = l(p, h, b, f, e[n + 9], 21, -343485551),
            f = i(f, r),
            p = i(p, o),
            h = i(h, a),
            b = i(b, d);
    return [f, p, h, b]
}
function f(e) {
    var t, n = "", r = 32 * e.length;
    for (t = 0; t < r; t += 8)
        n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
    return n
}
function b(e) {
    return unescape(encodeURIComponent(e))
}
function c(e, t, n, r, o, i, c) {
    return a(t & n | ~t & r, e, t, o, i, c)
}
function s(e, t, n, r, o, i, c) {
    return a(t & r | n & ~r, e, t, o, i, c)
}
function u(e, t, n, r, o, i, c) {
    return a(t ^ n ^ r, e, t, o, i, c)
}
function l(e, t, n, r, o, i, c) {
    return a(n ^ (t | ~r), e, t, o, i, c)
}
function i(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}
function a(e, t, n, r, o, a) {
    return i((c = i(i(t, e), i(r, a))) << (s = o) | c >>> 32 - s, n);
    var c, s
}
function Hminf(e) {
    var k = D.k;
    var c = D.c;
    var mao=JSON.parse(e)
    var a, b, d, e, f, g;
    k.N = mao.Hm_lpvt || 0;
    13 === k.N.length && (k.N = Math.round(k.N / 1E3));
    b = D.Sb();
    a = 4 !== b ? 1 : 0;
    if (g = mao.Hm_lvt) {
        e = g.split(",");
        for (f = e.length - 1; 0 <= f; f--)
            13 === e[f].length && (e[f] = "" + Math.round(e[f] / 1E3));
        for (; 2592E3 < k.J - e[0];)
            e.shift();
        f = 4 > e.length ? 2 : 3;
        for (1 === a && e.push(k.J); 4 < e.length;)
            e.shift();
        g = e.join(",");
        e = e[e.length - 1]
    } else
        g = k.J,
            e = "",
            f = 1;
    return JSON.stringify({ "Hm_lpvt": k.J, "Hm_lvt": g });
}
var D = {
    Sb: function () {
        if (!"")
            return D.k.J - D.k.N > D.c.vdur ? 1 : 4;
        var a = false;
        D.ea("") && D.ea("https://www.zhihu.com/signin?next=%2F") ? a = u : (a = D.urll(""),
            a = D.W(a || "", "www.zhihu.com"));
        return a ? D.k.J - D.k.N > D.c.vdur ? 1 : 4 : 3
    },
    ea: function (a) {
        for (var d = 0; d < D.c.dm.length; d++)
            if (-1 < D.c.dm[d].indexOf("/")) {
                if (D.ga(a, D.c.dm[d]))
                    return true            } else {
                var e = D.urll(a);
                if (e && D.W(e, D.c.dm[d]))
                    return true
            }
        return false
    },
    ga: function (a, b) {
        a = a.replace(/^https?:\/\//, "");
        return 0 === a.indexOf(b)
    },
    W: function (a, b) {
        a = "." + a.replace(/:\d+/, "");
        b = "." + b.replace(/:\d+/, "");
        var d = a.indexOf(b);
        return -1 < d && d + b.length === a.length
    },
   urlMb:function (a) {
        return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : null
    },
   urll:function (a) {
    return (a = D.urlMb(a)) ? a.replace(/:\d+$/, "") : a
    },
    c : {
        id: "98beee57fd2ef70ccdd5ca52b9740c49",
        dm: ["zhihu.com"],
        js: "tongji.baidu.com/hm-web/js/",
        etrk: [],
        cetrk: [],
        cptrk: [],
        icon: '',
        ctrk: [],
        nv: -1,
        vdur: 1800000,
        age: 31536000000,
        rec: 0,
        rp: [],
        trust: 0,
        vcard: 0,
        qiao: 0,
        lxb: 0,
        kbtrk: 0,
        pt: 0,
        spa: 0,
        oc: 0,
        aet: '',
        hca: 'A5E33DC074924736',
        conv: 0,
        med: 0,
        cvcc: '',
        cvcf: [],
        apps: ''
    }
    ,
    k : {
        Fc: "http://tongji.baidu.com/hm-web/welcome/ico",
        fb: "hm.baidu.com/hm.gif",
        vb: /^(tongji|hmcdn).baidu.com$/,
        nb: "tongji.baidu.com",
        Zb: "hmmd",
        $b: "hmpl",
        xc: "utm_medium",
        Yb: "hmkw",
        zc: "utm_term",
        Wb: "hmci",
        wc: "utm_content",
        ac: "hmsr",
        yc: "utm_source",
        Xb: "hmcu",
        vc: "utm_campaign",
        N: 0,
        J: Math.round(+new Date / 1E3),
        protocol: "https:" ,
        Ea: "https:",
        Hc: 0,
        Bc: 6E5,
        Ic: 6E5,
        lc: 5E3,
        Cc: 5,
        pa: 1024,
        Ac: 1,
        Ga: 2147483647,
        mb: "hca kb cc cf ci ck cl cm cp cu cw ds vl ep et fl ja ln lo lt rnd si su v cv lv api sn r ww p ct u tt".split(" "),
        V: u,
        Ra: ["a", "input", "button"],
        Oa: {
            id: "data-hm-id",
            aa: "data-hm-class",
            $: "data-hm-xpath",
            content: "data-hm-content",
            ia: "data-hm-tag",
            link: "data-hm-link"
        },
        Qa: "data-hm-enabled",
        Pa: "data-hm-disabled",
        ic: "https://hmcdn.baidu.com/static/tongji/plugins/",
        eb: ["UrlChangeTracker", "OcpcCbHm"]
    }
}