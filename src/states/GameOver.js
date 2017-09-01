Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
        fetchTopScores()
        .then(highScores => {
            if (highScores.length >= 10) {
                if (highScores[highScores.length - 1].score < this.game.global.score) {
                    let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                    postTopScores(this.game.global.score, this.game.global.initials)
                    .then(scores => {
                        // scores.map(topScore => {
                        //     createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                        //     createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                        //     yPosText += 50;
                        // });
                        game.state.start('HighScores');
                    });
                } else {
                    // fetchTopScores()
                    // .then(topScores=>{
                    //     topScores.map(topScore => {
                    //     createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                    //     createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                    //     yPosText += 50;
                    //     });
                    // })
                    // .catch(err => {
                    //     return err;
                    // });
                }
            } else {
                let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                postTopScores(this.game.global.score, this.game.global.initials)
                .then(scores => {
                    // scores.map(topScore => {
                    //     createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                    //     createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                    //     yPosText += 50;
                    // });
                    game.state.start('HighScores');
                });
          }
        })
        game.add.sprite(0,0,'bg2');
        let background = game.add.sprite(0,0,'gameover');
        background.scale.setTo(0.8, 1);
        let grim = game.add.sprite(800, 350, 'grim');
        grim.anchor.setTo(0.5,0.5);
        grim.scale.setTo(0.7,0.7);
        createText(game, 'Game Over', 615, 325, '100px Freckle Face', '#FFF');
        createText(game, 'YOUR SOUL IS MINE!', 1200, 100, '60px Freckle Face', '#FFF','center', 0.5, 0.5);
        createButton(game, 'Go Back to Menu', 175, 75,
        275, 60, () => {
            this.state.start('MainMenu');
        });

        // let highScore = 'Name';
        // createText(game, highScore, 200, 150, '20px Arial', '#FFF', 'center');
        
        // highScore = 'Score';
        // createText(game, highScore, 500, 150, '20px Arial', '#FFF', 'center');
            
        // let yPosText = 200;
    }
};
