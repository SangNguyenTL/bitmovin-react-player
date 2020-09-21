Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var bitmovinPlayer = require('bitmovin-player');
var bitmovinPlayerUi = require('bitmovin-player-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var BitMovinPlayer = function (_a) {
    var lincenseKey = _a.lincenseKey;
    var playerWrapperRef = React.useRef(null);
    var _b = React.useState(), player = _b[0], setPlayer = _b[1];
    var createPlayer = React.useCallback(function (elementContainer) {
        return new bitmovinPlayer.Player(elementContainer, {
            key: lincenseKey,
            ui: false
        });
    }, [lincenseKey]);
    React.useEffect(function () {
        if (playerWrapperRef.current) {
            var newPlayer = createPlayer(playerWrapperRef.current);
            bitmovinPlayerUi.UIFactory.buildDefaultSmallScreenUI(newPlayer);
            setPlayer(newPlayer);
        }
    }, [createPlayer, playerWrapperRef]);
    React.useEffect(function () {
        var playing = function () { return console.log('player is playing'); };
        player === null || player === void 0 ? void 0 : player.on(bitmovinPlayer.PlayerEvent.Playing, playing);
        var source = {
            hls: '//bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
        };
        player === null || player === void 0 ? void 0 : player.load(source).then(function () {
            player.play();
        });
        return function () {
            player === null || player === void 0 ? void 0 : player.off(bitmovinPlayer.PlayerEvent.Playing, playing);
        };
    }, [player]);
    return React__default['default'].createElement("div", { ref: playerWrapperRef });
};

exports.default = BitMovinPlayer;
//# sourceMappingURL=index.js.map
