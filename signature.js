function signature(e, t, n) {
    "use strict";
    var a;
        function i(e, t, n) {
            var a, r, i, c, o, g, m, b, A, v = 0, C = [], E = 0, w = !1, S = [], y = [], O = !1, I = !1, j = -1;
            if (a = (n = n || {}).encoding || "UTF8",
                (A = n.numRounds || 1) !== parseInt(A, 10) || 1 > A)
                throw Error("numRounds must a integer >= 1");
            if ("SHA-1" === e)
                o = 512,
                    g = x,
                    m = z,
                    c = 160,
                    b = function (e) {
                        return e.slice()
                    }
                    ;
            else if (0 === e.lastIndexOf("SHA-", 0))
                if (g = function (t, n) {
                    return L(t, n, e)
                }
                    ,
                    m = function (t, n, a, r) {
                        var i, c;
                        if ("SHA-224" === e || "SHA-256" === e)
                            i = 15 + (n + 65 >>> 9 << 4),
                                c = 16;
                        else {
                            if ("SHA-384" !== e && "SHA-512" !== e)
                                throw Error("Unexpected error in SHA-2 implementation");
                            i = 31 + (n + 129 >>> 10 << 5),
                                c = 32
                        }
                        for (; t.length <= i;)
                            t.push(0);
                        for (t[n >>> 5] |= 128 << 24 - n % 32,
                            n += a,
                            t[i] = 4294967295 & n,
                            t[i - 1] = n / 4294967296 | 0,
                            a = t.length,
                            n = 0; n < a; n += c)
                            r = L(t.slice(n, n + c), r, e);
                        if ("SHA-224" === e)
                            t = [r[0], r[1], r[2], r[3], r[4], r[5], r[6]];
                        else if ("SHA-256" === e)
                            t = r;
                        else if ("SHA-384" === e)
                            t = [r[0].a, r[0].b, r[1].a, r[1].b, r[2].a, r[2].b, r[3].a, r[3].b, r[4].a, r[4].b, r[5].a, r[5].b];
                        else {
                            if ("SHA-512" !== e)
                                throw Error("Unexpected error in SHA-2 implementation");
                            t = [r[0].a, r[0].b, r[1].a, r[1].b, r[2].a, r[2].b, r[3].a, r[3].b, r[4].a, r[4].b, r[5].a, r[5].b, r[6].a, r[6].b, r[7].a, r[7].b]
                        }
                        return t
                    }
                    ,
                    b = function (e) {
                        return e.slice()
                    }
                    ,
                    "SHA-224" === e)
                    o = 512,
                        c = 224;
                else if ("SHA-256" === e)
                    o = 512,
                        c = 256;
                else if ("SHA-384" === e)
                    o = 1024,
                        c = 384;
                else {
                    if ("SHA-512" !== e)
                        throw Error("Chosen SHA variant is not supported");
                    o = 1024,
                        c = 512
                }
            else {
                if (0 !== e.lastIndexOf("SHA3-", 0) && 0 !== e.lastIndexOf("SHAKE", 0))
                    throw Error("Chosen SHA variant is not supported");
                var B = 6;
                if (g = H,
                    b = function (e) {
                        var t, n = [];
                        for (t = 0; 5 > t; t += 1)
                            n[t] = e[t].slice();
                        return n
                    }
                    ,
                    j = 1,
                    "SHA3-224" === e)
                    o = 1152,
                        c = 224;
                else if ("SHA3-256" === e)
                    o = 1088,
                        c = 256;
                else if ("SHA3-384" === e)
                    o = 832,
                        c = 384;
                else if ("SHA3-512" === e)
                    o = 576,
                        c = 512;
                else if ("SHAKE128" === e)
                    o = 1344,
                        c = -1,
                        B = 31,
                        I = !0;
                else {
                    if ("SHAKE256" !== e)
                        throw Error("Chosen SHA variant is not supported");
                    o = 1088,
                        c = -1,
                        B = 31,
                        I = !0
                }
                m = function (e, t, n, a, r) {
                    var i, c = B, s = [], u = (n = o) >>> 5, l = 0, d = t >>> 5;
                    for (i = 0; i < d && t >= n; i += u)
                        a = H(e.slice(i, i + u), a),
                            t -= n;
                    for (e = e.slice(i),
                        t %= n; e.length < u;)
                        e.push(0);
                    for (e[(i = t >>> 3) >> 2] ^= c << i % 4 * 8,
                        e[u - 1] ^= 2147483648,
                        a = H(e, a); 32 * s.length < r && (e = a[l % 5][l / 5 | 0],
                            s.push(e.b),
                            !(32 * s.length >= r));)
                        s.push(e.a),
                            0 == 64 * (l += 1) % n && (H(null, a),
                                l = 0);
                    return s
                }
            }
            i = f(t, a, j),
                r = F(e),
                this.setHMACKey = function (t, n, i) {
                    var s;
                    if (!0 === w)
                        throw Error("HMAC key already set");
                    if (!0 === O)
                        throw Error("Cannot set HMAC key after calling update");
                    if (!0 === I)
                        throw Error("SHAKE is not supported for HMAC");
                    for (t = (n = f(n, a = (i || {}).encoding || "UTF8", j)(t)).binLen,
                        n = n.value,
                        i = (s = o >>> 3) / 4 - 1,
                        s < t / 8 && (n = m(n, t, 0, F(e), c)); n.length <= i;)
                        n.push(0);
                    for (t = 0; t <= i; t += 1)
                        S[t] = 909522486 ^ n[t],
                            y[t] = 1549556828 ^ n[t];
                    r = g(S, r),
                        v = o,
                        w = !0
                }
                ,
                this.update = function (e) {
                    var t, n, a, c = 0, s = o >>> 5;
                    for (e = (t = i(e, C, E)).binLen,
                        n = t.value,
                        t = e >>> 5,
                        a = 0; a < t; a += s)
                        c + o <= e && (r = g(n.slice(a, a + s), r),
                            c += o);
                    v += c,
                        C = n.slice(c >>> 5),
                        E = e % o,
                        O = !0
                }
                ,
                this.getHash = function (t, n) {
                    var a, i, o, f;
                    if (!0 === w)
                        throw Error("Cannot call getHash after setting HMAC key");
                    if (o = p(n),
                        !0 === I) {
                        if (-1 === o.shakeLen)
                            throw Error("shakeLen must be specified in options");
                        c = o.shakeLen
                    }
                    switch (t) {
                        case "HEX":
                            a = function (e) {
                                return s(e, c, j, o)
                            }
                                ;
                            break;
                        case "B64":
                            a = function (e) {
                                return u(e, c, j, o)
                            }
                                ;
                            break;
                        case "BYTES":
                            a = function (e) {
                                return l(e, c, j)
                            }
                                ;
                            break;
                        case "ARRAYBUFFER":
                            try {
                                i = new ArrayBuffer(0)
                            } catch (e) {
                                throw Error("ARRAYBUFFER not supported by this environment")
                            }
                            a = function (e) {
                                return d(e, c, j)
                            }
                                ;
                            break;
                        case "UINT8ARRAY":
                            try {
                                i = new Uint8Array(0)
                            } catch (e) {
                                throw Error("UINT8ARRAY not supported by this environment")
                            }
                            a = function (e) {
                                return h(e, c, j)
                            }
                                ;
                            break;
                        default:
                            throw Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")
                    }
                    for (f = m(C.slice(), E, v, b(r), c),
                        i = 1; i < A; i += 1)
                        !0 === I && 0 != c % 32 && (f[f.length - 1] &= 16777215 >>> 24 - c % 32),
                            f = m(f, c, 0, F(e), c);
                    return a(f)
                }
                ,
                this.getHMAC = function (t, n) {
                    var a, i, f, A;
                    if (!1 === w)
                        throw Error("Cannot call getHMAC without first setting HMAC key");
                    switch (f = p(n),
                    t) {
                        case "HEX":
                            a = function (e) {
                                return s(e, c, j, f)
                            }
                                ;
                            break;
                        case "B64":
                            a = function (e) {
                                return u(e, c, j, f)
                            }
                                ;
                            break;
                        case "BYTES":
                            a = function (e) {
                                return l(e, c, j)
                            }
                                ;
                            break;
                        case "ARRAYBUFFER":
                            try {
                                a = new ArrayBuffer(0)
                            } catch (e) {
                                throw Error("ARRAYBUFFER not supported by this environment")
                            }
                            a = function (e) {
                                return d(e, c, j)
                            }
                                ;
                            break;
                        case "UINT8ARRAY":
                            try {
                                a = new Uint8Array(0)
                            } catch (e) {
                                throw Error("UINT8ARRAY not supported by this environment")
                            }
                            a = function (e) {
                                return h(e, c, j)
                            }
                                ;
                            break;
                        default:
                            throw Error("outputFormat must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")
                    }
                    return i = m(C.slice(), E, v, b(r), c),
                        A = g(y, F(e)),
                        a(A = m(i, c, o, A, c))
                }
        }
        function c(e, t) {
            this.a = e,
                this.b = t
        }
        function o(e, t, n, a) {
            var r, i, c, o, s;
            for (t = t || [0],
                i = (n = n || 0) >>> 3,
                s = -1 === a ? 3 : 0,
                r = 0; r < e.length; r += 1)
                c = (o = r + i) >>> 2,
                    t.length <= c && t.push(0),
                    t[c] |= e[r] << 8 * (s + o % 4 * a);
            return {
                value: t,
                binLen: 8 * e.length + n
            }
        }
        function s(e, t, n, a) {
            var r, i, c, o = "";
            for (t /= 8,
                c = -1 === n ? 3 : 0,
                r = 0; r < t; r += 1)
                i = e[r >>> 2] >>> 8 * (c + r % 4 * n),
                    o += "0123456789abcdef".charAt(i >>> 4 & 15) + "0123456789abcdef".charAt(15 & i);
            return a.outputUpper ? o.toUpperCase() : o
        }
        function u(e, t, n, a) {
            var r, i, c, o, s = "", u = t / 8;
            for (o = -1 === n ? 3 : 0,
                r = 0; r < u; r += 3)
                for (i = r + 1 < u ? e[r + 1 >>> 2] : 0,
                    c = r + 2 < u ? e[r + 2 >>> 2] : 0,
                    c = (e[r >>> 2] >>> 8 * (o + r % 4 * n) & 255) << 16 | (i >>> 8 * (o + (r + 1) % 4 * n) & 255) << 8 | c >>> 8 * (o + (r + 2) % 4 * n) & 255,
                    i = 0; 4 > i; i += 1)
                    s += 8 * r + 6 * i <= t ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >>> 6 * (3 - i) & 63) : a.b64Pad;
            return s
        }
        function l(e, t, n) {
            var a, r, i, c = "";
            for (t /= 8,
                i = -1 === n ? 3 : 0,
                a = 0; a < t; a += 1)
                r = e[a >>> 2] >>> 8 * (i + a % 4 * n) & 255,
                    c += String.fromCharCode(r);
            return c
        }
        function d(e, t, n) {
            t /= 8;
            var a, r, i, c = new ArrayBuffer(t);
            for (i = new Uint8Array(c),
                r = -1 === n ? 3 : 0,
                a = 0; a < t; a += 1)
                i[a] = e[a >>> 2] >>> 8 * (r + a % 4 * n) & 255;
            return c
        }
        function h(e, t, n) {
            t /= 8;
            var a, r, i = new Uint8Array(t);
            for (r = -1 === n ? 3 : 0,
                a = 0; a < t; a += 1)
                i[a] = e[a >>> 2] >>> 8 * (r + a % 4 * n) & 255;
            return i
        }
        function p(e) {
            var t = {
                outputUpper: !1,
                b64Pad: "=",
                shakeLen: -1
            };
            if (e = e || {},
                t.outputUpper = e.outputUpper || !1,
                !0 === e.hasOwnProperty("b64Pad") && (t.b64Pad = e.b64Pad),
                !0 === e.hasOwnProperty("shakeLen")) {
                if (0 != e.shakeLen % 8)
                    throw Error("shakeLen must be a multiple of 8");
                t.shakeLen = e.shakeLen
            }
            if ("boolean" != typeof t.outputUpper)
                throw Error("Invalid outputUpper formatting option");
            if ("string" != typeof t.b64Pad)
                throw Error("Invalid b64Pad formatting option");
            return t
        }
        function f(e, t, n) {
            switch (t) {
                case "UTF8":
                case "UTF16BE":
                case "UTF16LE":
                    break;
                default:
                    throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")
            }
            switch (e) {
                case "HEX":
                    e = function (e, t, a) {
                        var r, i, c, o, s, u, l = e.length;
                        if (0 != l % 2)
                            throw Error("String of HEX type must be in byte increments");
                        for (t = t || [0],
                            s = (a = a || 0) >>> 3,
                            u = -1 === n ? 3 : 0,
                            r = 0; r < l; r += 2) {
                            if (i = parseInt(e.substr(r, 2), 16),
                                isNaN(i))
                                throw Error("String of HEX type contains invalid characters");
                            for (c = (o = (r >>> 1) + s) >>> 2; t.length <= c;)
                                t.push(0);
                            t[c] |= i << 8 * (u + o % 4 * n)
                        }
                        return {
                            value: t,
                            binLen: 4 * l + a
                        }
                    }
                        ;
                    break;
                case "TEXT":
                    e = function (e, a, r) {
                        var i, c, o, s, u, l, d, h, p = 0;
                        if (a = a || [0],
                            u = (r = r || 0) >>> 3,
                            "UTF8" === t)
                            for (h = -1 === n ? 3 : 0,
                                o = 0; o < e.length; o += 1)
                                for (c = [],
                                    128 > (i = e.charCodeAt(o)) ? c.push(i) : 2048 > i ? (c.push(192 | i >>> 6),
                                        c.push(128 | 63 & i)) : 55296 > i || 57344 <= i ? c.push(224 | i >>> 12, 128 | i >>> 6 & 63, 128 | 63 & i) : (o += 1,
                                            i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(o)),
                                            c.push(240 | i >>> 18, 128 | i >>> 12 & 63, 128 | i >>> 6 & 63, 128 | 63 & i)),
                                    s = 0; s < c.length; s += 1) {
                                    for (l = (d = p + u) >>> 2; a.length <= l;)
                                        a.push(0);
                                    a[l] |= c[s] << 8 * (h + d % 4 * n),
                                        p += 1
                                }
                        else if ("UTF16BE" === t || "UTF16LE" === t)
                            for (h = -1 === n ? 2 : 0,
                                c = "UTF16LE" === t && 1 !== n || "UTF16LE" !== t && 1 === n,
                                o = 0; o < e.length; o += 1) {
                                for (i = e.charCodeAt(o),
                                    !0 === c && (i = (s = 255 & i) << 8 | i >>> 8),
                                    l = (d = p + u) >>> 2; a.length <= l;)
                                    a.push(0);
                                a[l] |= i << 8 * (h + d % 4 * n),
                                    p += 2
                            }
                        return {
                            value: a,
                            binLen: 8 * p + r
                        }
                    }
                        ;
                    break;
                case "B64":
                    e = function (e, t, a) {
                        var r, i, c, o, s, u, l, d, h = 0;
                        if (-1 === e.search(/^[a-zA-Z0-9=+\/]+$/))
                            throw Error("Invalid character in base-64 string");
                        if (i = e.indexOf("="),
                            e = e.replace(/\=/g, ""),
                            -1 !== i && i < e.length)
                            throw Error("Invalid '=' found in base-64 string");
                        for (t = t || [0],
                            u = (a = a || 0) >>> 3,
                            d = -1 === n ? 3 : 0,
                            i = 0; i < e.length; i += 4) {
                            for (s = e.substr(i, 4),
                                c = o = 0; c < s.length; c += 1)
                                o |= (r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(c))) << 18 - 6 * c;
                            for (c = 0; c < s.length - 1; c += 1) {
                                for (r = (l = h + u) >>> 2; t.length <= r;)
                                    t.push(0);
                                t[r] |= (o >>> 16 - 8 * c & 255) << 8 * (d + l % 4 * n),
                                    h += 1
                            }
                        }
                        return {
                            value: t,
                            binLen: 8 * h + a
                        }
                    }
                        ;
                    break;
                case "BYTES":
                    e = function (e, t, a) {
                        var r, i, c, o, s, u;
                        for (t = t || [0],
                            c = (a = a || 0) >>> 3,
                            u = -1 === n ? 3 : 0,
                            i = 0; i < e.length; i += 1)
                            r = e.charCodeAt(i),
                                o = (s = i + c) >>> 2,
                                t.length <= o && t.push(0),
                                t[o] |= r << 8 * (u + s % 4 * n);
                        return {
                            value: t,
                            binLen: 8 * e.length + a
                        }
                    }
                        ;
                    break;
                case "ARRAYBUFFER":
                    try {
                        e = new ArrayBuffer(0)
                    } catch (e) {
                        throw Error("ARRAYBUFFER not supported by this environment")
                    }
                    e = function (e, t, a) {
                        return o(new Uint8Array(e), t, a, n)
                    }
                        ;
                    break;
                case "UINT8ARRAY":
                    try {
                        e = new Uint8Array(0)
                    } catch (e) {
                        throw Error("UINT8ARRAY not supported by this environment")
                    }
                    e = function (e, t, a) {
                        return o(e, t, a, n)
                    }
                        ;
                    break;
                default:
                    throw Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")
            }
            return e
        }
        function g(e, t) {
            return e << t | e >>> 32 - t
        }
        function m(e, t) {
            return 32 < t ? (t -= 32,
                new c(e.b << t | e.a >>> 32 - t, e.a << t | e.b >>> 32 - t)) : 0 !== t ? new c(e.a << t | e.b >>> 32 - t, e.b << t | e.a >>> 32 - t) : e
        }
        function b(e, t) {
            return e >>> t | e << 32 - t
        }
        function A(e, t) {
            var n = null;
            n = new c(e.a, e.b);
            return 32 >= t ? new c(n.a >>> t | n.b << 32 - t & 4294967295, n.b >>> t | n.a << 32 - t & 4294967295) : new c(n.b >>> t - 32 | n.a << 64 - t & 4294967295, n.a >>> t - 32 | n.b << 64 - t & 4294967295)
        }
        function v(e, t) {
            return 32 >= t ? new c(e.a >>> t, e.b >>> t | e.a << 32 - t & 4294967295) : new c(0, e.a >>> t - 32)
        }
        function C(e, t, n) {
            return e & t ^ ~e & n
        }
        function E(e, t, n) {
            return new c(e.a & t.a ^ ~e.a & n.a, e.b & t.b ^ ~e.b & n.b)
        }
        function w(e, t, n) {
            return e & t ^ e & n ^ t & n
        }
        function S(e, t, n) {
            return new c(e.a & t.a ^ e.a & n.a ^ t.a & n.a, e.b & t.b ^ e.b & n.b ^ t.b & n.b)
        }
        function y(e) {
            return b(e, 2) ^ b(e, 13) ^ b(e, 22)
        }
        function O(e) {
            var t = A(e, 28)
                , n = A(e, 34);
            return e = A(e, 39),
                new c(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
        }
        function I(e) {
            return b(e, 6) ^ b(e, 11) ^ b(e, 25)
        }
        function j(e) {
            var t = A(e, 14)
                , n = A(e, 18);
            return e = A(e, 41),
                new c(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
        }
        function B(e) {
            return b(e, 7) ^ b(e, 18) ^ e >>> 3
        }
        function R(e) {
            var t = A(e, 1)
                , n = A(e, 8);
            return e = v(e, 7),
                new c(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
        }
        function k(e) {
            return b(e, 17) ^ b(e, 19) ^ e >>> 10
        }
        function Q(e) {
            var t = A(e, 19)
                , n = A(e, 61);
            return e = v(e, 6),
                new c(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b)
        }
        function T(e, t) {
            var n = (65535 & e) + (65535 & t);
            return ((e >>> 16) + (t >>> 16) + (n >>> 16) & 65535) << 16 | 65535 & n
        }
        function N(e, t, n, a) {
            var r = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & a);
            return ((e >>> 16) + (t >>> 16) + (n >>> 16) + (a >>> 16) + (r >>> 16) & 65535) << 16 | 65535 & r
        }
        function D(e, t, n, a, r) {
            var i = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & a) + (65535 & r);
            return ((e >>> 16) + (t >>> 16) + (n >>> 16) + (a >>> 16) + (r >>> 16) + (i >>> 16) & 65535) << 16 | 65535 & i
        }
        function M(e, t) {
            var n, a, r;
            return n = (65535 & e.b) + (65535 & t.b),
                r = (65535 & (a = (e.b >>> 16) + (t.b >>> 16) + (n >>> 16))) << 16 | 65535 & n,
                n = (65535 & e.a) + (65535 & t.a) + (a >>> 16),
                new c((65535 & (a = (e.a >>> 16) + (t.a >>> 16) + (n >>> 16))) << 16 | 65535 & n, r)
        }
        function V(e, t, n, a) {
            var r, i, o;
            return r = (65535 & e.b) + (65535 & t.b) + (65535 & n.b) + (65535 & a.b),
                o = (65535 & (i = (e.b >>> 16) + (t.b >>> 16) + (n.b >>> 16) + (a.b >>> 16) + (r >>> 16))) << 16 | 65535 & r,
                r = (65535 & e.a) + (65535 & t.a) + (65535 & n.a) + (65535 & a.a) + (i >>> 16),
                new c((65535 & (i = (e.a >>> 16) + (t.a >>> 16) + (n.a >>> 16) + (a.a >>> 16) + (r >>> 16))) << 16 | 65535 & r, o)
        }
        function P(e, t, n, a, r) {
            var i, o, s;
            return i = (65535 & e.b) + (65535 & t.b) + (65535 & n.b) + (65535 & a.b) + (65535 & r.b),
                s = (65535 & (o = (e.b >>> 16) + (t.b >>> 16) + (n.b >>> 16) + (a.b >>> 16) + (r.b >>> 16) + (i >>> 16))) << 16 | 65535 & i,
                i = (65535 & e.a) + (65535 & t.a) + (65535 & n.a) + (65535 & a.a) + (65535 & r.a) + (o >>> 16),
                new c((65535 & (o = (e.a >>> 16) + (t.a >>> 16) + (n.a >>> 16) + (a.a >>> 16) + (r.a >>> 16) + (i >>> 16))) << 16 | 65535 & i, s)
        }
        function U(e, t) {
            return new c(e.a ^ t.a, e.b ^ t.b)
        }
        function F(e) {
            var t, n = [];
            if ("SHA-1" === e)
                n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            else if (0 === e.lastIndexOf("SHA-", 0))
                switch (n = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
                t = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                e) {
                    case "SHA-224":
                        break;
                    case "SHA-256":
                        n = t;
                        break;
                    case "SHA-384":
                        n = [new c(3418070365, n[0]), new c(1654270250, n[1]), new c(2438529370, n[2]), new c(355462360, n[3]), new c(1731405415, n[4]), new c(41048885895, n[5]), new c(3675008525, n[6]), new c(1203062813, n[7])];
                        break;
                    case "SHA-512":
                        n = [new c(t[0], 4089235720), new c(t[1], 2227873595), new c(t[2], 4271175723), new c(t[3], 1595750129), new c(t[4], 2917565137), new c(t[5], 725511199), new c(t[6], 4215389547), new c(t[7], 327033209)];
                        break;
                    default:
                        throw Error("Unknown SHA variant")
                }
            else {
                if (0 !== e.lastIndexOf("SHA3-", 0) && 0 !== e.lastIndexOf("SHAKE", 0))
                    throw Error("No SHA variants supported");
                for (e = 0; 5 > e; e += 1)
                    n[e] = [new c(0, 0), new c(0, 0), new c(0, 0), new c(0, 0), new c(0, 0)]
            }
            return n
        }
        function x(e, t) {
            var n, a, r, i, c, o, s, u = [];
            for (n = t[0],
                a = t[1],
                r = t[2],
                i = t[3],
                c = t[4],
                s = 0; 80 > s; s += 1)
                u[s] = 16 > s ? e[s] : g(u[s - 3] ^ u[s - 8] ^ u[s - 14] ^ u[s - 16], 1),
                    o = 20 > s ? D(g(n, 5), a & r ^ ~a & i, c, 1518500249, u[s]) : 40 > s ? D(g(n, 5), a ^ r ^ i, c, 1859775393, u[s]) : 60 > s ? D(g(n, 5), w(a, r, i), c, 2400959708, u[s]) : D(g(n, 5), a ^ r ^ i, c, 3395469782, u[s]),
                    c = i,
                    i = r,
                    r = g(a, 30),
                    a = n,
                    n = o;
            return t[0] = T(n, t[0]),
                t[1] = T(a, t[1]),
                t[2] = T(r, t[2]),
                t[3] = T(i, t[3]),
                t[4] = T(c, t[4]),
                t
        }
        function z(e, t, n, a) {
            var r;
            for (r = 15 + (t + 65 >>> 9 << 4); e.length <= r;)
                e.push(0);
            for (e[t >>> 5] |= 128 << 24 - t % 32,
                t += n,
                e[r] = 4294967295 & t,
                e[r - 1] = t / 4294967296 | 0,
                t = e.length,
                r = 0; r < t; r += 16)
                a = x(e.slice(r, r + 16), a);
            return a
        }
        function L(e, t, n) {
            var a, r, i, o, s, u, l, d, h, p, f, g, m, b, A, v, U, F, x, z, L, H, Z, K = [];
            if ("SHA-224" === n || "SHA-256" === n)
                p = 64,
                    g = 1,
                    H = Number,
                    m = T,
                    b = N,
                    A = D,
                    v = B,
                    U = k,
                    F = y,
                    x = I,
                    L = w,
                    z = C,
                    Z = q;
            else {
                if ("SHA-384" !== n && "SHA-512" !== n)
                    throw Error("Unexpected error in SHA-2 implementation");
                p = 80,
                    g = 2,
                    H = c,
                    m = M,
                    b = V,
                    A = P,
                    v = R,
                    U = Q,
                    F = O,
                    x = j,
                    L = S,
                    z = E,
                    Z = J
            }
            for (n = t[0],
                a = t[1],
                r = t[2],
                i = t[3],
                o = t[4],
                s = t[5],
                u = t[6],
                l = t[7],
                f = 0; f < p; f += 1)
                16 > f ? (h = f * g,
                    d = e.length <= h ? 0 : e[h],
                    h = e.length <= h + 1 ? 0 : e[h + 1],
                    K[f] = new H(d, h)) : K[f] = b(U(K[f - 2]), K[f - 7], v(K[f - 15]), K[f - 16]),
                    d = A(l, x(o), z(o, s, u), Z[f], K[f]),
                    h = m(F(n), L(n, a, r)),
                    l = u,
                    u = s,
                    s = o,
                    o = m(i, d),
                    i = r,
                    r = a,
                    a = n,
                    n = m(d, h);
            return t[0] = m(n, t[0]),
                t[1] = m(a, t[1]),
                t[2] = m(r, t[2]),
                t[3] = m(i, t[3]),
                t[4] = m(o, t[4]),
                t[5] = m(s, t[5]),
                t[6] = m(u, t[6]),
                t[7] = m(l, t[7]),
                t
        }
        function H(e, t) {
            var n, a, r, i, o = [], s = [];
            if (null !== e)
                for (a = 0; a < e.length; a += 2)
                    t[(a >>> 1) % 5][(a >>> 1) / 5 | 0] = U(t[(a >>> 1) % 5][(a >>> 1) / 5 | 0], new c(e[a + 1], e[a]));
            for (n = 0; 24 > n; n += 1) {
                for (i = F("SHA3-"),
                    a = 0; 5 > a; a += 1) {
                    r = t[a][0];
                    var u = t[a][1]
                        , l = t[a][2]
                        , d = t[a][3]
                        , h = t[a][4];
                    o[a] = new c(r.a ^ u.a ^ l.a ^ d.a ^ h.a, r.b ^ u.b ^ l.b ^ d.b ^ h.b)
                }
                for (a = 0; 5 > a; a += 1)
                    s[a] = U(o[(a + 4) % 5], m(o[(a + 1) % 5], 1));
                for (a = 0; 5 > a; a += 1)
                    for (r = 0; 5 > r; r += 1)
                        t[a][r] = U(t[a][r], s[a]);
                for (a = 0; 5 > a; a += 1)
                    for (r = 0; 5 > r; r += 1)
                        i[r][(2 * a + 3 * r) % 5] = m(t[a][r], Z[a][r]);
                for (a = 0; 5 > a; a += 1)
                    for (r = 0; 5 > r; r += 1)
                        t[a][r] = U(i[a][r], new c(~i[(a + 1) % 5][r].a & i[(a + 2) % 5][r].a, ~i[(a + 1) % 5][r].b & i[(a + 2) % 5][r].b));
                t[0][0] = U(t[0][0], K[n])
            }
            return t
        }
        var q, J, Z, K;
    J = [new c((q = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])[0], 3609767458), new c(q[1], 602891725), new c(q[2], 3964484399), new c(q[3], 2173295548), new c(q[4], 4081628472), new c(q[5], 3053834265), new c(q[6], 2937671579), new c(q[7], 3664609560), new c(q[8], 2734883394), new c(q[9], 1164996542), new c(q[10], 1323610764), new c(q[11], 3590304994), new c(q[12], 4068182383), new c(q[13], 991336113), new c(q[14], 633803317), new c(q[15], 3479774868), new c(q[16], 2666613458), new c(q[17], 944711139), new c(q[18], 2341262773), new c(q[19], 2007800933), new c(q[20], 1495990901), new c(q[21], 1856431235), new c(q[22], 3175218132), new c(q[23], 2198950837), new c(q[24], 3999719339), new c(q[25], 766784016), new c(q[26], 2566594879), new c(q[27], 3203337956), new c(q[28], 1034457026), new c(q[29], 2466948901), new c(q[30], 3758326383), new c(q[31], 168717936), new c(q[32], 1188179964), new c(q[33], 1546045734), new c(q[34], 1522805485), new c(q[35], 2643833823), new c(q[36], 2343527390), new c(q[37], 1014477480), new c(q[38], 1206759142), new c(q[39], 344077627), new c(q[40], 1290863460), new c(q[41], 3158454273), new c(q[42], 3505952657), new c(q[43], 106217008), new c(q[44], 3606008344), new c(q[45], 1432725776), new c(q[46], 1467031594), new c(q[47], 851169720), new c(q[48], 3100823752), new c(q[49], 1363258195), new c(q[50], 3750685593), new c(q[51], 3785050280), new c(q[52], 3318307427), new c(q[53], 3812723403), new c(q[54], 2003034995), new c(q[55], 3602036899), new c(q[56], 1575990012), new c(q[57], 1125592928), new c(q[58], 2716904306), new c(q[59], 442776044), new c(q[60], 593698344), new c(q[61], 3733110249), new c(q[62], 2999351573), new c(q[63], 3815920427), new c(3391569614, 3928383900), new c(3515267271, 566280711), new c(3940187606, 3454069534), new c(4118630271, 4000239992), new c(116418474, 1914138554), new c(174292421, 2731055270), new c(289380356, 3203993006), new c(460393269, 320620315), new c(685471733, 587496836), new c(852142971, 1086792851), new c(1017036298, 365543100), new c(1126000580, 2618297676), new c(1288033470, 3409855158), new c(1501505948, 4234509866), new c(1607167915, 987167468), new c(1816402316, 1246189591)];
    K = [new c(0, 1), new c(0, 32898), new c(2147483648, 32906), new c(2147483648, 2147516416), new c(0, 32907), new c(0, 2147483649), new c(2147483648, 2147516545), new c(2147483648, 32777), new c(0, 138), new c(0, 136), new c(0, 2147516425), new c(0, 2147483658), new c(0, 2147516555), new c(2147483648, 139), new c(2147483648, 32905), new c(2147483648, 32771), new c(2147483648, 32770), new c(2147483648, 128), new c(0, 32778), new c(2147483648, 2147483658), new c(2147483648, 2147516545), new c(2147483648, 32896), new c(0, 2147483649), new c(2147483648, 2147516424)];
    Z = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
        return i;
}
function infsignature(arg) {
    var dic=JSON.parse(arg)
    var sgne = signature("SHA-1", "TEXT");
    var n = parseInt(dic['time'])
        , a = new sgne("SHA-1", "TEXT");
    a.setHMACKey("d1b964811afb40118a12068ff74a12f4", "TEXT");
    a.update("password");
    a.update(dic['id']);
    a.update("com.zhihu.web");
    a.update(String(n));
    return a.getHMAC("HEX");
};
var ee = "c3cef7c66a1843f8b3a9e6a1e3160e20"
