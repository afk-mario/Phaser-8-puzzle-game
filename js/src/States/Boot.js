(function () {
  'use strict';

  function Boot() {
  }

  Boot.prototype = {
    preload: function() {
      this.load.image('loadingBG', 'js/res/img/LoadingBG.png');
      this.load.image('loading', 'js/res/img/Loading.png');
      this.load.image('frame', 'js/res/textures/frame.png');
    },
    create: function() {
      game.input.maxPointers = 1;
      game.state.start('preloader');
    }
  };

  BootS = Boot;
}());