import TrackPlayer from 'react-native-track-player';
module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());

  TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious(),
  );

  TrackPlayer.addEventListener('remote-duck', (e) => {
    console.log(e);
    if (e.permanent === true) {
      TrackPlayer.pause();
    } else {
      if (e.paused === true) TrackPlayer.pause();
      else TrackPlayer.play();
    }
  });

  TrackPlayer.addEventListener('remote-seek', (e) => {
    TrackPlayer.seekTo(e.position);
  });
};
