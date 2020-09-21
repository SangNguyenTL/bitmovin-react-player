import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Player, PlayerAPI, PlayerEvent } from 'bitmovin-player';
import { UIFactory } from 'bitmovin-player-ui';
import './index.scss';

export type BitMovinPlayerProps = {
  lincenseKey: string;
};

const BitMovinPlayer: React.FC<BitMovinPlayerProps> = ({ lincenseKey }) => {
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<PlayerAPI>();

  const createPlayer = useCallback(
    (elementContainer: HTMLElement) => {
      return new Player(elementContainer, {
        key: lincenseKey,
        ui: false
      });
    },
    [lincenseKey]
  );

  useEffect(() => {
    if (playerWrapperRef.current) {
      const newPlayer = createPlayer(playerWrapperRef.current);
      UIFactory.buildDefaultSmallScreenUI(newPlayer);
      setPlayer(newPlayer);
    }
  }, [createPlayer, playerWrapperRef]);

  useEffect(() => {
    const playing = () => console.log('player is playing');
    player?.on(PlayerEvent.Playing, playing);
    const source = {
      hls:
        '//bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    };
    player?.load(source).then(() => {
      player.play();
    });
    return () => {
      player?.off(PlayerEvent.Playing, playing);
    };
  }, [player]);

  return <div ref={playerWrapperRef} />;
};

export default BitMovinPlayer;
