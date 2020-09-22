Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var bitmovinPlayer = require('bitmovin-player');
var bitmovinPlayerUi = require('bitmovin-player-ui');
var mimeTypes = require('mime-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var mimeTypes__default = /*#__PURE__*/_interopDefaultLegacy(mimeTypes);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var BitMovinPlayer = function (_a) {
    var lincenseKey = _a.lincenseKey, src = _a.src, source = _a.source, playback = _a.playback, style = _a.style;
    var playerWrapperRef = React.useRef(null);
    var _b = React.useState(), player = _b[0], setPlayer = _b[1];
    var createPlayer = React.useCallback(function (elementContainer) {
        return new bitmovinPlayer.Player(elementContainer, {
            key: lincenseKey,
            ui: false,
            playback: playback || {},
            style: style || {}
        });
    }, [lincenseKey, playback, style]);
    var processSource = React.useCallback(function () {
        if (!src)
            return source || {};
        var mime = mimeTypes__default['default'].lookup(src);
        var newSource = {};
        if (mime === 'application/vnd.apple.mpegurl')
            newSource.hls = src;
        else if (mime === 'application/dash+xml')
            newSource.dash = src;
        else if (mime)
            newSource.progressive = [{ url: src, type: mime }];
        newSource = __assign(__assign({}, source), newSource);
        return newSource;
    }, [src, source]);
    // Create player
    React.useEffect(function () {
        if (playerWrapperRef.current) {
            var newPlayer = createPlayer(playerWrapperRef.current);
            bitmovinPlayerUi.UIFactory.buildDefaultSmallScreenUI(newPlayer);
            setPlayer(newPlayer);
        }
    }, [createPlayer, playerWrapperRef]);
    React.useEffect(function () {
        player === null || player === void 0 ? void 0 : player.load(processSource());
    }, [processSource, player]);
    return React__default['default'].createElement("div", { ref: playerWrapperRef });
};

exports.default = BitMovinPlayer;
//# sourceMappingURL=index.js.map
