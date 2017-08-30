'use strict';

Game.Level1 = function(game){
};

Game.Level1.prototype = {
    init: function() {
        let platforms;
        let player;
        let cursors;
        let batteries;
        let score;
        let scoreText;
        let timer;
        let totalTime;
        let seconds;
        let timerTxt;
        let layer;
        let enemyGroup;
    }, 
    create: function(game) {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // game.add.sprite(0, 0, 'bg2');
        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(0.5, 1);
        
        this.layer = createMaps(game, 'map');
      
        //see collision blocks
        //this.layer.debug = true;
        this.player = createPlayer(game);

        this.player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
        this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 10, true);

        createRain(game);

        //////////IF YOU WANT UP TO BE JUMP, UNCOMMENT THE BELOW////////////
        this.cursors = game.input.keyboard.createCursorKeys();

        //////////IF YOU WANT SPACEBAR TO BE JUMP, UNCOMMENT THE BELOW////////////
        // this.cursors = this.game.input.keyboard.addKeys({
        // 	'up': Phaser.Keyboard.SPACEBAR,
        // 	'down': Phaser.Keyboard.DOWN,
        // 	'left': Phaser.Keyboard.LEFT,
        // 	'right': Phaser.Keyboard.RIGHT
        // });
        
        //Creating Piglets
        this.enemyGroup = game.add.group();
        new Piglet(game, 500, game.world.height - 250, 100, this.layer, this.enemyGroup);
        new Piglet(game, 100, game.world.height - 100, 100, this.layer, this.enemyGroup);
        new Piglet(game, 1000, game.world.height - 100, 100, this.layer, this.enemyGroup);

        this.batteries = createBatteries(game);

        // this.timer = createTimer(game,
        //                         ()=>{
        //                             this.camera.reset();
        //                             this.state.start('GameOver');
        //                         });


        // this.timerTxt = createText(game, `Timer: ${(this.timer.duration/1000).toPrecision(2)}s`, 1300, 50, '30px Freckle Face', '#FFF', 'center');
        // this.timerTxt.fixedToCamera = true;

        ////////TRYING TO CREATE CUSTOM TIMER///////////////////
        this.totalTime = 30;
        this.timerTxt = createText(game, `Timer: ${this.totalTime}s`, 1300, 50, '30px Freckle Face', '#FFF', 'center');
        console.log('initial time', this.totalTime);
        this.timerTxt.anchor.set(0.5, 0.5);
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
        

        ///////////////CUSTOM TIMER ATTEMPT ABOVE///////////////////

        this.scoreText = createText(game, 'Score: 0', 150, 50, '30px Freckle Face', '#FFF');
        this.scoreText.fixedToCamera = true;
    }, 
    tick: function(game) {
        this.totalTime--;
        console.log('subtract time', this.totalTime);
        if(this.totalTime === 0) {
            this.camera.reset();
            this.state.start('GameOver');
        }
    },
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.batteries, this.layer);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        playerActions(this.cursors, this.player, hitPlatforms);

        //tile collision with enemies
        game.physics.arcade.collide(this.enemyGroup, this.layer);
        this.enemyGroup.forEach(function(enemy){
            if(enemy.previousPosition.x >= enemy.position.x){
                enemy.animations.play('left');
            }else{
                enemy.animations.play('right');
            }
        });

        //player collision with enemies
        game.physics.arcade.collide(this.player, this.enemyGroup, this.resetPlayer);

        //////////////////////////If we want game over//////////////////////////////
        // game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('GameOver');
        // });

        // this.timerTxt.setText(`Timer: ${(this.timer.duration/1000).toPrecision(2)}s`);
        this.timerTxt.setText(`Timer: ${this.totalTime}s`);
        

    },
    resetPlayer: function(player, enemyGroup){
        player.reset(32, 650);
    },
    render:function(game) {
        
        // Sprite debug info
        // game.debug.spriteInfo(this.piglet, 32, 32);
        // let y = 0;
        // this.enemyGroup.forEach(function(enemy){
        //     game.debug.body(enemy);
        //     // game.debug.bodyInfo(enemy, 32, y=y+128);
        // });
        // game.debug.body(this.player);
        // game.debug.bodyInfo(this.player, 32, 256);
    }
};
