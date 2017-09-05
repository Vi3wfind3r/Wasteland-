window.onload = function() {
    let game = new Phaser.Game(1600, 800, Phaser.AUTO, '');
    game.global = {
        score: 0,
        initials: '',
        tentacleFrame: 'start',
        shadowFrame: 'start',
        totalTime: 0
    };
    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('InfoModal', Game.InfoModal);
    game.state.add('HighScores', Game.HighScores);
    game.state.add('Level1', Game.Level1);
    game.state.add('GameOver', Game.GameOver);
    game.state.add('Victory', Game.Victory);
    game.state.start('Boot');
};
