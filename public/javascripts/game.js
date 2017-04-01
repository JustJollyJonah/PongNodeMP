/**
 * Created by jonah on 30-Mar-17.
 */
function Game() {
    this.started = false;
    this.canvasHeight = 600;
    this.canvasWidth = 800;
    this.framerate = 1000/60;
    this.veloctityX = (this.canvasWidth / 5)/this.framerate;
    this.veloctityY = (this.canvasHeight / 5)/this.framerate;
    this.speed = 5;
    this.player1 = {
        posx: 0,
        posy: 0,
        hoogte: 80,
    };
    this.player2 = {
        posx: 0,
        posy: 0,
        hoogte: 80,
    };
    this.ball = {
        velx: 0,
        vely: 0,
        posx: 0,
        posy: 0,
        balGrootte: 0,

    };
    this.score = {
        player1: 0,
        player2: 0,
    };
    this.updatePhysics = function() {

        if(this.ball.posx - this.ball.balGrootte <= this.player2.posx + 10){
            //console.log("ball voorbij plankAI");
            if((this.ball.posy <= this.player2.posy + this.player2.hoogte && this.ball.posy >= this.player2.posy)) {
                //console.log("ball raakt plankAi");
                this.ball.velx = this.ball.velx * -1;
                this.ball.vely = this.ball.vely + this.getNumber();
            }
        }

        //check if the plankplayer was hit
        if(this.ball.posx + this.ball.balGrootte >= this.player1.posx + 10){
            //console.log("ball voorbij plank");
            if((this.ball.posy <= this.player1.posy + this.player1.hoogte && this.ball.posy >= this.player2.posy)) {
                //console.log("ball raakt plank");
                this.ball.velx = this.ball.velx * -1;
                this.ball.vely = this.ball.vely + this.getNumber();
            }
        }
        var scored = false;
        if (this.ball.posx - this.ball.balGrootte < 0){
            //linkerkant
            this.score.player2++;
            scored = true;
        }else if (this.ball.posx + this.ball.balGrootte > 800){
            //rechterkant
            this.score.player1++;
            scored = true;
        }
        if (this.ball.posy < this.ball.balGrootte || this.ball.posy > 600 - this.ball.balGrootte){
            this.ball.vely = this.ball.vely * -1;
        }
        if(scored){
            //reset ball wanneer er is gescoord

            if (this.ball.x < 800/2){
                this.ball.velx = this.veloctityX;
            }else if (this.ball.posx > 800/2){
                this.ball.velx = this.veloctityX * -1;
            }else {
                //default
                //console.log("default");
                this.ball.velx = this.veloctityX
            }
            this.ball.posx = 800/2;
            this.ball.posy = 600/2;
            this.ball.vely = Math.floor((Math.random() * 4) + 1);

        }
        this.ball.posy+= this.ball.vely;
        this.ball.posx+= this.ball.velx;
    };


    this.handleInput = function(direction, y, number) {
        // console.log(number);
        if(number == 1) {
            if(direction == "+") {
                this.player1.posy += this.speed;
            } else {
                this.player1.posy -= this.speed;
            }
        } else {
            if(direction == "+") {
                this.player2.posy += this.speed;
            } else {
                this.player2.posy -= this.speed;
            }
        }
    };
    this.startGame = function() {
        this.started = true;
        this.player1.posx = 780;
        this.player2.posx = 20;
        this.player1.posy = 300;
        this.player2.posy = 300;
        this.ball.posx = 400;
        this.ball.posy = 300;
        this.ball.velx = this.veloctityX;
        this.ball.vely = this.veloctityY;
        this.ball.balGrootte = 10;
    }
    this.getNumber = function(){
        var negativeOrPositive = Math.floor(Math.random() * 2);
        var speedDifference = Math.random() * 2;
        //console.log(negativeOrPositive)
        if(negativeOrPositive == 0){
            return speedDifference;
        }else{
            return speedDifference * -1;
        }
    }
}

module.exports = {Game : Game};