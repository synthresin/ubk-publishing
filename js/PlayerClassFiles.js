
// 띵 박스용 플레이어

UBKPlayer = (function() {

  function UBKPlayer(params) {
    this.view = params.view
    this.href = params.href
    this.sound;
    this.manager = params.manager;
    this.sm = soundManager;
    this.progress_bar = params.progress_bar;

  }  

  UBKPlayer.prototype = {
    init: function() {

      var self = this;

      // sound object 생성. 이벤트에 따라 콜백 함수를 호출합니다.
      this.sound = self.sm.createSound({
       id: 'UBKSound' + self.manager.players.length, // required
       url: self.href, // required
       autoPlay: false,
       onplay: function() {
        self.add_playing(self);
        self.enable_slider(self);
       },
       onresume: function() {
        self.add_playing(self);
       },
       onpause: function() {
        self.remove_playing(self);
       },
       onfinish: function() {
        self.remove_playing(self);
        self.reset_progress(self);
        self.disable_slider(self);
       },
       onstop: function() {
        self.remove_playing(self);

       },
       whileplaying: function() {
        self.update_progress(self);
       }
      });

      // 각 뷰에 대한 핸들러.
      this.view.click(function(e) {
        self.handle_play_pause(e);
      });

      // 슬라이더 활성화
      this.progress_bar.slider({
        range: "min", 
        disabled: true, 
        start: function(ev, ui) {
          self.sound.pause();
        }, 
        stop: function(ev, ui) {

          var duration; 

          if(self.sound.readyState == 1) { // loading
            duration = self.sound.durationEstimate;
          } else if (self.sound.readyState == 3){ //fully loaded
            duration = self.sound.duration;
          }

          var percent = ui.value;
          
          var position = duration * percent / 100;

          console.log(position);

          self.sound.setPosition(position);
          self.sound.resume();



          // ui 값 받아서
          // 총 듀레이션에 퍼센트로 곱한다음
          // 포지션으로 지정하고
          // 재생
        }
      });

    },

    // 매니저에 의해서 최근 구동 노래를 완전히 멈출때 사용됩니다. 여기서 곧바로 사용하지 않음.
    stop: function() {
      this.view.removeClass('sm2_playing');
      this.progress_bar.slider('value', 0);
      this.progress_bar.slider('disable');
      this.sm.stop(this.sound.id);
      this.sm.unload(this.sound.id);
    },

    // 플레이 버튼을 위한 콜백 함수입니다.
    handle_play_pause: function(e){
      var self = this;

      e.preventDefault();
      if(self.manager.lastPlayer == self) {
        self.sound.togglePause(); 
      } else {
        if (self.manager.lastPlayer) {
          self.manager.stopPlayer(self.manager.lastPlayer);
        }
        self.manager.lastPlayer = self;
        self.sound.play();
      }
    },

    // 사운드 매니저 오브젝트의 이벤트에 의해 불러지는 콜백 함수들입니다.
    add_playing: function(self) {
      self.view.addClass('sm2_playing');
    },

    remove_playing: function(self) {
      self.view.removeClass('sm2_playing');
    },

    update_progress: function(self) {

      var duration; 

      if(self.sound.readyState == 1) { // loading
        duration = self.sound.durationEstimate;
      } else if (self.sound.readyState == 3){ //fully loaded
        duration = self.sound.duration;
      }

      var progressValue = self.sound.position;

      var percent = progressValue/duration * 100;

      self.progress_bar.slider('value', percent);

    },

    reset_progress: function(self) {
      self.progress_bar.slider('value', 0);
    },
    enable_slider:function(self) {
      self.progress_bar.slider("enable");
    },
    disable_slider:function(self) {
      self.progress_bar.slider("disable");
    }

  };

  return UBKPlayer;

})();

UBKSoundManager = (function() {

  function UBKSoundManager() {
    this.sm = soundManager;
    this.players = [];
    this.lastPlayer;

  }

  UBKSoundManager.prototype = {
    init: function() {
      this.sm._writeDebug('mp3 파일 찾기 시작');
      
      var self = this;

      // 띵 박스의 음악 플레이어들 init
      $('.sound_wrap a.sound').each(function(index, elem) {
        if( self.sm.canPlayLink(elem) ) {
          var player = new UBKPlayer({view:$(elem), href:elem.href, progress_bar:$(elem).parent().find('.progress_bar'), manager:self});
          player.init();
          self.players.push(player);
        }
      });

      // 프로그래시브 바 음악 플레이어들을 init 
      $('.single_audio_left a.sound').each(function(index, elem) {
        if( self.sm.canPlayLink(elem) ) {
          var player = new UBKPlayer({view:$(elem), href:elem.href, progress_bar:$(elem).parent().parent().find('.progress_bar'), manager:self});
          player.init();
          self.players.push(player);
        }
      });
    },

    stopPlayer: function(player) {
      player.stop();
    },

    addPlayers : function() {
      // TODO : ajax 에 따라서 적당히 구현. 
      // 새로 추가되는 .sound_wrap a 마다 
      // 1. 새 UBKPlayer 생성해서 init,
      // 2. this.players 어레이에 추가
    } 
  };

  return UBKSoundManager;

})();