/**
 * Created by jonah on 23-Mar-17.
 */
var gameinstance = require('../javascripts/game.js');
var game = {
    rooms: [new Room(1)],
    users: [],
    startedRooms: []
};

setInterval(updateGames, 45);
setInterval(updatePhysics, 15);

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
        console.log("Hello");
        if(!this.localinstance.started) {
        this.localinstance.startGame();
        console.log("Hello there");
        game.startedRooms.push(this);
        return true;
        } else {
            return false;
        }

    };
    this.updatePhysics = function() {
        this.localinstance.updatePhysics();
    };
    this.updateGames = function() {
        this.localinstance.updateGames();
    };
    this.stopGame = function() {
        game.startedRooms.remove(this);
    }
}

function Player(username, id) {
    this.username = username;
    this.id = id;
}
function updateGames() {
// console.log(game.startedRooms);
    game.startedRooms.forEach(function(item, index) {
        item.updateGames();
        console.log("Updated");
        syncGame(item)
    })

}
function updatePhysics() {
    game.startedRooms.forEach(function(item, index) {
        item.updatePhysics();
        console.log("Updated");
        syncGame(item)
    })


}
function syncGame(game) {
    game.players.forEach(function(item, index) {
        io.sockets.socket(item.id).emit('update',game.localinstance)
    })
}


module.exports = { game: game, Room: Room};