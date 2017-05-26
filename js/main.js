$(function(){

  // Target user-agent for browser-specific styles e.g. IE10
  var b = document.documentElement;
  b.setAttribute('data-useragent', navigator.userAgent);
  b.setAttribute('data-platform', navigator.platform);
  var mySwiper = $('.swiper-container').swiper({
    //Your options here:
    mode:'horizontal',
    loop: true,
    keyboardControl: false,
    a11y: true,
    effect: 'fade',
    onKeyPress: function onKeyPress(e) {
      alert('cool');
      e.which === 32
        ? playing
          ? audio.pause()
          : audio.play()
        : false
    }
  });

    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0;
        var playing = false;
        var mediaPath = 'https://wreche.s3.amazonaws.com/';
        var extension = '';
        var tracks = [
          {
            "track": 1,
            "name": "Pruning The Spirit",
            "length": "1:30",
            "file": "1_wreche_pruning_the_spirit"
          },
          {
            "track": 2,
            "name": "Angel City",
            "length": "6:55",
            "file": "2_wreche_angel_city"
          },
          {
            "track": 3,
            "name": "Fata Morgana",
            "length": "13:23",
            "file": "3_wreche_fata_morgana"
          },
          {
            "track": 4,
            "name": "Petals",
            "length": "3:20",
            "file": "4_wreche_petals"
          },
          {
            "track": 5,
            "name": "Vessel",
            "length": "8:22",
            "file": "5_wreche_vessel",
          }
        ];

        var handlePause = function handlePause (e) {
          return playing = false;
        };

        var handleTrackEnd = function handleTrackEnd (e) {
          if ((index + 1) < trackCount) {
              index++;
              loadTrack(index);
              mySwiper.slideNext();
              audio.play();
          } else {
              audio.pause();
              index = 0;
              mySwiper.slideTo(0);
              loadTrack(index);
          }
        };

        var handlePlay = function handlePlay () {
          $('.player-container').addClass('player-container--active');
          return playing = true;
        };

        var audio = document.querySelector('.player-audio-node');
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleTrackEnd);

        var extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';

        var loadTrack = function loadTrack (id) {
          trackName.text(tracks[id].name);
          index = id;
          audio.src = mediaPath + tracks[id].file + extension;
        };

        var playTrack = function playTrack (id) {
          loadTrack(id);
          audio.play();
        };

        var trackCount = tracks.length;
        var trackName = $('.player-track');

        var handleBtnPrevClick = function handleBtnPrevClick () {
            if ((index - 1) > -1) {
                mySwiper.slidePrev();
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                mySwiper.slideTo(0);
                loadTrack(index);
            }
        }

        var handleBtnNextClick = function handleBtnNextClick () {
            if ((index + 1) < trackCount) {
                index++;
                mySwiper.slideNext();
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                mySwiper.slideTo(0);
                loadTrack(index);
            }
        }

        var btnPrev = $('.player-btn-prev').click(handleBtnPrevClick)
        var btnNext = $('.player-btn-next').click(handleBtnNextClick);

        loadTrack(index);
    }
});
