$(function(){

  // Target user-agent for browser-specific styles e.g. IE10
  var b = document.documentElement;
  b.setAttribute('data-useragent', navigator.userAgent);
  b.setAttribute('data-platform', navigator.platform);
  var mySwiper = $('.swiper-container').swiper({
    //Your options here:
    mode:'horizontal',
    keyboardControl: false,
    a11y: true,
    effect: 'fade',
    onKeyPress: function onKeyPress(e) {
      e.which === 32
        ? !state.paused
          ? audio.pause()
          : audio.play()
        : false
    }
  });

    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0;
        var mediaPath = 'https://wreche.s3.amazonaws.com/';
        var extension = '';
        var state = {
          paused: true,
          seeking: false
        }
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
          },
          {
            "track": 6,
            "name": "Credits",
            "length": null,
            "file": null,
          }
        ];

        var doHandlePause = function doHandlePause (e) {
          console.log('pausing');

          if (!state.seeking) {
            switchImage('pause');
          } else {
            state.seeking = false;
          }

          return state.paused = true;
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

        var switchImage = function switchImage (status) {
          if (status === 'play') {
            $('.swiper-slide-active .grayscale').removeClass('active');
            $('.swiper-slide-active .color').addClass('active');
          } else {
            $('.swiper-slide-active .color').removeClass('active');
            $('.swiper-slide-active .grayscale').addClass('active');
          }
        }

        var handlePlay = function handlePlay () {
          switchImage('play');
          $('.player-container').addClass('player-container--active');
          return state.paused = false;
        };


        var handleSeeking = function (e) {
          console.log('seeking');
          return state.seeking = true;
        }

        var handlePause = function (e) {
          return setTimeout(function (e) {
            doHandlePause(e)
          }, 10);
        }

        var audio = document.querySelector('.player-audio-node');
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('seeking', handleSeeking);
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
            var isFirst = index === 0;
            if (isFirst) {
                audio.pause();
                index = trackCount - 1;
                mySwiper.slideTo(index);
            } else {
              mySwiper.slidePrev();
              index--;
            }
            loadTrack(index);
        }

        var handleBtnNextClick = function handleBtnNextClick () {
            if (index < trackCount - 1) {
                index++;
                mySwiper.slideNext();
                loadTrack(index);
                if (!state.paused) {
                  audio.pause();
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
