/**
 * Created by jonah on 23-Mar-17.
 */
var gameinstance = require('../javascripts/game.js');
var game = {
    rooms: [new Room(1)],
    users: [],
    startedRooms: []
};


function Room(roomnumber) {
    this.localinstance = new gameinstance.Game();
    this.players = [];
    this.roomnumber = roomnumber;
    this.addPlayer = function(username, id) {
        if (this.players.length  < 2) {
            this.players.push(new Player(username, id));
        } else {
            return false;
        }
    };
    this.startGame = function() {
        if(!this.localinstance.started) {
        this.localinstance.startGame();
        game.startedRooms.push(this);
        return true;
        } else {
            return false;
        }

    };
    this.updatePhysics = function() {
        this.localinstance.updatePhysics();
    };
    this.stopGame = function() {
        game.startedRooms.splice(this,1);
        this.localinstance = new gameinstance.Game();
        this.localinstance.stopGame()
    };
    this.removePlayer = function(username, id) {
        var player = new Player(username, id);
        var foundplayer = this.players.indexOf(player);
        this.players.splice(foundplayer,1);
        this.stopGame();
    }
}

function Player(username, id) {
    this.username = username;
    this.id = id;
}



module.exports = { game: game, Room: Room};