/**
 * Created by jonah on 30-Mar-17.
 */
function Game() {
    var started = false;
    var player1 = {
        posx: 'links',
        posy: 0,
        hoogte: 80,

    };
    var player2 = {
        posx: 'rechts',
        posy: 0,
        hoogte: 80,
    };
    var ball = {
        velx: 0,
        vely: 0,
        posx: 0,
        posy: 0,
    };
    var score = {
        player1: 0,
        player2: 0,
    };
    this.updatePhysics = function() {

    };

    this.updateGames = function() {

    };

    this.handleInput = function() {

    };
    this.startGame = function() {
        started = true;
    }

}

module.exports = {Game : Game};