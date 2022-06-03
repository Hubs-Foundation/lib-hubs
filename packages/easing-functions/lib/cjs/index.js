"use strict";
// Extracted from Tween.js
// https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L473
// https://github.com/tweenjs/tween.js/blob/master/LICENSE
// Originally based on Robert Penner's Easing Functions
// http://robertpenner.com/easing/
// http://robertpenner.com/easing_terms_of_use.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounceInOut = exports.bounceOut = exports.bounceIn = exports.backInOut = exports.backOut = exports.backIn = exports.elasticInOut = exports.elasticOut = exports.elasticIn = exports.circularInOut = exports.circularOut = exports.circularIn = exports.exponentialInOut = exports.exponentialOut = exports.exponentialIn = exports.sinusoidalInOut = exports.sinusoidalOut = exports.sinusoidalIn = exports.quinticInOut = exports.quinticOut = exports.quinticIn = exports.quarticInOut = exports.quarticOut = exports.quarticIn = exports.cubicInOut = exports.cubicOut = exports.cubicIn = exports.quadraticInOut = exports.quadraticOut = exports.quadraticIn = exports.linear = void 0;
function linear(k) {
    return k;
}
exports.linear = linear;
function quadraticIn(k) {
    return k * k;
}
exports.quadraticIn = quadraticIn;
function quadraticOut(k) {
    return k * (2 - k);
}
exports.quadraticOut = quadraticOut;
function quadraticInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
}
exports.quadraticInOut = quadraticInOut;
function cubicIn(k) {
    return k * k * k;
}
exports.cubicIn = cubicIn;
function cubicOut(k) {
    return --k * k * k + 1;
}
exports.cubicOut = cubicOut;
function cubicInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
}
exports.cubicInOut = cubicInOut;
function quarticIn(k) {
    return k * k * k * k;
}
exports.quarticIn = quarticIn;
function quarticOut(k) {
    return 1 - --k * k * k * k;
}
exports.quarticOut = quarticOut;
function quarticInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
}
exports.quarticInOut = quarticInOut;
function quinticIn(k) {
    return k * k * k * k * k;
}
exports.quinticIn = quinticIn;
function quinticOut(k) {
    return --k * k * k * k * k + 1;
}
exports.quinticOut = quinticOut;
function quinticInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
}
exports.quinticInOut = quinticInOut;
function sinusoidalIn(k) {
    return 1 - Math.cos((k * Math.PI) / 2);
}
exports.sinusoidalIn = sinusoidalIn;
function sinusoidalOut(k) {
    return Math.sin((k * Math.PI) / 2);
}
exports.sinusoidalOut = sinusoidalOut;
function sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
}
exports.sinusoidalInOut = sinusoidalInOut;
function exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
}
exports.exponentialIn = exponentialIn;
function exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
}
exports.exponentialOut = exponentialOut;
function exponentialInOut(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
}
exports.exponentialInOut = exponentialInOut;
function circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
}
exports.circularIn = circularIn;
function circularOut(k) {
    return Math.sqrt(1 - --k * k);
}
exports.circularOut = circularOut;
function circularInOut(k) {
    if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
}
exports.circularInOut = circularInOut;
function elasticIn(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
}
exports.elasticIn = elasticIn;
function elasticOut(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
}
exports.elasticOut = elasticOut;
function elasticInOut(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    k *= 2;
    if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
}
exports.elasticInOut = elasticInOut;
function backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
}
exports.backIn = backIn;
function backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
}
exports.backOut = backOut;
function backInOut(k) {
    const s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
}
exports.backInOut = backInOut;
function bounceIn(k) {
    return 1 - bounceOut(1 - k);
}
exports.bounceIn = bounceIn;
function bounceOut(k) {
    if (k < 1 / 2.75) {
        return 7.5625 * k * k;
    }
    else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    }
    else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    }
    else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
}
exports.bounceOut = bounceOut;
function bounceInOut(k) {
    if (k < 0.5) {
        return bounceIn(k * 2) * 0.5;
    }
    return bounceOut(k * 2 - 1) * 0.5 + 0.5;
}
exports.bounceInOut = bounceInOut;
