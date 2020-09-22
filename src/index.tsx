import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PlaybackConfig,
  Player,
  PlayerAPI,
  SourceConfig,
  StyleConfig
} from 'bitmovin-player';
import { UIFactory } from 'bitmovin-player-ui';
import mimeTypes from 'mime-types';
import './scss/index.scss';

export type BitMovinPlayerProps = {
  lincenseKey: string;
  src: string;
  source?: SourceConfig;
  playback?: PlaybackConfig;
  style?: StyleConfig;
};

const BitMovinPlayer: React.FC<BitMovinPlayerProps> = ({
  lincenseKey,
  src,
  source,
  playback,
  style
}) => {
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<PlayerAPI>();

  const createPlayer = useCallback(
    (elementContainer: HTMLElement) => {
      return new Player(elementContainer, {
        key: lincenseKey,
        ui: false,
        playback: playback || {},
        style: style || {}
      });
    },
    [lincenseKey, playback, style]
  );

  const processSource = useCallback(() => {
    if (!src) return source || {};
    const mime = mimeTypes.lookup(src);
    let newSource: SourceConfig = {};
    if (mime === 'application/vnd.apple.mpegurl') newSource.hls = src;
    else if (mime === 'application/dash+xml') newSource.dash = src;
    else if (mime) newSource.progressive = [{ url: src, type: mime }];
    newSource = { ...source, ...newSource };
    return newSource;
  }, [src, source]);

  // Create player
  useEffect(() => {
    if (playerWrapperRef.current) {
      const newPlayer = createPlayer(playerWrapperRef.current);
      UIFactory.buildDefaultSmallScreenUI(newPlayer);
      setPlayer(newPlayer);
    }
  }, [createPlayer, playerWrapperRef]);

  useEffect(() => {
    player?.load(processSource());
  }, [processSource, player]);

  return <div ref={playerWrapperRef} />;
};

export default BitMovinPlayer;
