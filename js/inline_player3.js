
// 띵 박스용 플레이어

UBKPlayer = (function() {

  function UBKPlayer(params) {
    this.view = params.view;
    this.sound = params.sound;
    this.manager = params.manager;
    this.sm = soundManager;

  }  

  UBKPlayer.prototype = {
    init: function() {

      var self = this;

      this.view.click(function (e){
        e.preventDefault();
        if(self.manager.lastPlayer == self) {
          if(self.sound.paused) {
            self.view.addClass('sm2_playing');
          } else {
            self.view.removeClass('sm2_playing');
          }
          self.sound.togglePause(); 
        } else {
          if (self.manager.lastPlayer) {
            self.manager.stopPlayer(self.manager.lastPlayer);
          }
          self.manager.lastPlayer = self;
          self.view.addClass('sm2_playing');
          self.sound.play();
        }
      });
    },

    stop: function() {
      this.view.removeClass('sm2_playing');
      this.sm.stop(this.sound.id);
      this.sm.unload(this.sound.id);
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
      
      // bind 귀찮아.
      var self = this;

      // 띵 박스의 음악 플레이어들 init

      $('.sound_wrap a').each(function(index, elem) {
        if( self.sm.canPlayLink(elem) ) {

          // sound object 생성, id 숫자대로 먹인다.
          var soundObject = self.sm.createSound({
           id: 'UBKSound' + self.players.length, // required
           url: elem.href, // required
           // optional sound parameters here, see Sound Properties for full list
           autoPlay: false
          });

          // 누르면 해당 사운드 오브젝트가 실행되게
          var player = new UBKPlayer({view: $(elem), sound: soundObject, manager:self});
          player.init();
          self.players.push(player);
        }
      });

      // 중심 음악 플레이어 init (보통 한개밖에 없을걸?)
      $('.single_audio a').each(function(index, elem) {
        if( self.sm.canPlayLink(elem) ) {

          // sound object 생성, id 숫자대로 먹인다.
          var soundObject = self.sm.createSound({
           id: 'UBKSound' + self.players.length, // required
           url: elem.href, // required
           // optional sound parameters here, see Sound Properties for full list
           autoPlay: false
          });

          // 누르면 해당 사운드 오브젝트가 실행되게
          var player = new UBKProgressPlayer({view: $(elem), sound: soundObject, manager:self});
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