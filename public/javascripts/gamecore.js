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
    this.addPlayer = function(username) {
        if (this.players.length  < 2) {
            this.players.push(username);
        } else {
            return false;
        }
    };
    this.startGame = function() {
        this.localinstance.startGame();

    }
};
function updatePhysics(){
    game.startedRooms.forEach(function(item, index) {
        item.localinstance.updatePhysics();
    });
};

function updateGames(){
    game.startedRooms.forEach(function(item, index) {
        item.localinstance.updateGames();
    })
};

module.exports = { game: game, Room: Room};