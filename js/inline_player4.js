
// 띵 박스용 플레이어

UBKPlayer = (function() {

  function UBKPlayer(params) {
    this.view = params.view
    this.href = params.href
    this.sound;
    this.manager = params.manager;
    this.sm = soundManager;

  }  

  UBKPlayer.prototype = {
    init: function() {

      var self = this;

      // sound object 생성, id 숫자대로 먹인다.
      this.sound = self.sm.createSound({
       id: 'UBKSound' + self.manager.players.length, // required
       url: self.href, // required
       // optional sound parameters here, see Sound Properties for full list
       autoPlay: false,
       onplay: function() {
        self.add_playing(self);
       },
       onresume: function() {
        self.add_playing(self);
       },
       onpause: function() {
        self.remove_playing(self);
       },
       onfinish: function() {
        self.remove_playing(self);
       },
       onstop: function() {
        self.remove_playing(self);
       }
      });

      // 각 뷰에 대한 핸들러.
      this.view.click(function(e) {
        self.handle_play_pause(e);
      });
    },

    stop: function() {
      this.view.removeClass('sm2_playing');
      this.sm.stop(this.sound.id);
      this.sm.unload(this.sound.id);
    },

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

    add_playing: function(self) {
      self.view.addClass('sm2_playing');
    },

    remove_playing: function(self) {
      self.view.removeClass('sm2_playing');
    }

  };

  return UBKPlayer;

})();

// 슬라이더 조절 가능한 플레이어
UBKProgressPlayer = (function() {

  function UBKProgressPlayer(params) {
    _.extend(this, new UBKPlayer(params));

    // this.init = function() {
    //   console.log('오버라이딩 되라!');
    // }
  }  


  return UBKProgressPlayer;

})();

// 프리뷰 박스용 플레이어 && 프로그레스 바 플레이어 합친 플레이리스트 관리.

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
      $('.sound_wrap a').each(function(index, elem) {
        if( self.sm.canPlayLink(elem) ) {
          var player = new UBKPlayer({view:$(elem), href:elem.href, manager:self});
          player.init();
          self.players.push(player);
        }
      });

      // 프로그래시브 바 음악 플레이어들을 init 
    },

    stopPlayer: function(player) {
      player.stop();
    },

    addPlayers : function() {
      // TODO : ajax 에 따라서 적당히 구현. 
      // 새로 추가되는 .sound_wrap a 마다 
      // 1. soundObject 생성하고 
      // 2. 새 UBKPlayer 생성해서 init,
      // 3. this.players 어레이에 추가
    } 
  };

  return UBKSoundManager;

})();