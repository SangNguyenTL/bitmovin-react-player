import React from 'react';
import { PlaybackConfig, SourceConfig, StyleConfig } from 'bitmovin-player';
import './scss/index.scss';
export declare type BitMovinPlayerProps = {
    lincenseKey: string;
    src: string;
    source?: SourceConfig;
    playback?: PlaybackConfig;
    style?: StyleConfig;
};
declare const BitMovinPlayer: React.FC<BitMovinPlayerProps>;
export default BitMovinPlayer;
