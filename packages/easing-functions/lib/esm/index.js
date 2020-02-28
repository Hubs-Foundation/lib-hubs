// Extracted from Tween.js
// https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L473
// https://github.com/tweenjs/tween.js/blob/master/LICENSE
// Originally based on Robert Penner's Easing Functions
// http://robertpenner.com/easing/
// http://robertpenner.com/easing_terms_of_use.html
export function linear(k) {
    return k;
}
export function quadraticIn(k) {
    return k * k;
}
export function quadraticOut(k) {
    return k * (2 - k);
}
export function quadraticInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
}
export function cubicIn(k) {
    return k * k * k;
}
export function cubicOut(k) {
    return --k * k * k + 1;
}
export function cubicInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
}
export function quarticIn(k) {
    return k * k * k * k;
}
export function quarticOut(k) {
    return 1 - --k * k * k * k;
}
export function quarticInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
}
export function quinticIn(k) {
    return k * k * k * k * k;
}
export function quinticOut(k) {
    return --k * k * k * k * k + 1;
}
export function quinticInOut(k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
}
export function sinusoidalIn(k) {
    return 1 - Math.cos((k * Math.PI) / 2);
}
export function sinusoidalOut(k) {
    return Math.sin((k * Math.PI) / 2);
}
export function sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
}
export function exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
}
export function exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
}
export function exponentialInOut(k) {
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
export function circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
}
export function circularOut(k) {
    return Math.sqrt(1 - --k * k);
}
export function circularInOut(k) {
    if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
}
export function elasticIn(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
}
export function elasticOut(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
}
export function elasticInOut(k) {
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
export function backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
}
export function backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
}
export function backInOut(k) {
    const s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
}
export function bounceIn(k) {
    return 1 - bounceOut(1 - k);
}
export function bounceOut(k) {
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
export function bounceInOut(k) {
    if (k < 0.5) {
        return bounceIn(k * 2) * 0.5;
    }
    return bounceOut(k * 2 - 1) * 0.5 + 0.5;
}
