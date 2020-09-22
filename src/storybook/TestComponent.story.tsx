import React from 'react';
import { storiesOf } from '@storybook/react';
import BitMovinPlayer from '../index';

export default {
  title: 'BitMovinPlayer'
};

export const HSLMTest = () => (
  <BitMovinPlayer
    src="//bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
    lincenseKey="9692e0b2-56b3-4c3e-88e4-cda5bd751517"
  />
);

export const DashTest = () => (
  <BitMovinPlayer
    src="https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd"
    lincenseKey="9692e0b2-56b3-4c3e-88e4-cda5bd751517"
  />
);

export const WithPoster = () => (
  <BitMovinPlayer
    source={{
      poster:
        'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/art-of-motion_poster.jpg'
    }}
    lincenseKey="9692e0b2-56b3-4c3e-88e4-cda5bd751517"
    src="//bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
  />
);

export const Mp4Test = () => (
  <BitMovinPlayer
    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    lincenseKey="9692e0b2-56b3-4c3e-88e4-cda5bd751517"
  />
);

export const TestSourceProps = () => (
  <BitMovinPlayer
    source={{
      progressive: [
        {
          url:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          type: 'video/mp4'
        }
      ]
    }}
    lincenseKey="9692e0b2-56b3-4c3e-88e4-cda5bd751517"
  />
);

storiesOf('BitMovinPlayer', module)
  .add('HSLMTest', HSLMTest)
  .add('DashTest', DashTest)
  .add('Mp4Test', Mp4Test)
  .add('TestSourceProps', TestSourceProps)
  .add('WithPoster', WithPoster);
