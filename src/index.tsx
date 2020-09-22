import React, { Component } from 'react';
import mimeTypes from 'mime-types';
import {
  PlaybackConfig,
  Player,
  PlayerAPI,
  SourceConfig,
  StyleConfig
} from 'bitmovin-player';
import { UIFactory } from 'bitmovin-player-ui';
import './scss/index.scss';

export type BitmovinPlayerProps = {
  lincenseKey: string;
  src?: string;
  source?: SourceConfig;
  playback?: PlaybackConfig;
  style?: StyleConfig;
};

class BitmovinPlayer extends Component<BitmovinPlayerProps> {
  player: PlayerAPI | null;

  playerRef: HTMLDivElement | null = null;

  constructor(props: BitmovinPlayerProps) {
    super(props);
    this.props = props;
  }

  componentDidMount(): void {
    if (this.playerRef) this.player = this.createPlayer(this.playerRef);
    if (this.player) {
      UIFactory.buildDefaultSmallScreenUI(this.player);
      this.player.load(this.processSource());
    }
  }

  createPlayer = (elementContainer: HTMLElement): PlayerAPI => {
    const { lincenseKey, playback, style } = this.props;
    return new Player(elementContainer, {
      key: lincenseKey,
      ui: false,
      playback: playback || {},
      style: style || {}
    });
  };

  processSource = (): SourceConfig => {
    const { src, source } = this.props;
    if (!src) return source || {};
    const mime = mimeTypes.lookup(src);
    let newSource: SourceConfig = {};
    if (mime === 'application/vnd.apple.mpegurl') newSource.hls = src;
    else if (mime === 'application/dash+xml') newSource.dash = src;
    else if (mime) newSource.progressive = [{ url: src, type: mime }];
    newSource = { ...source, ...newSource };
    return newSource;
  };

  render(): JSX.Element {
    return (
      <div
        ref={(ref) => {
          this.playerRef = ref;
        }}
      />
    );
  }
}

export default BitmovinPlayer;
