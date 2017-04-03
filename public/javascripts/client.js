/**
 * Created by jonah on 23-Mar-17.
 */
var c;
var ctx;
var audio;
$(document).ready(function() {
c = document.getElementById("myCanvas");
ctx = c.getContext("2d");
try{
    audio = new Audio('../Sound/Goal.mp3');
    // console.log("Sound geladen");
}catch(e){
    // console.log("Geluid kan niet geladen worden " + e);
}
});
var currentY;
var localgame;
var player;
var host;
var started = false;
// $(document).on("click", "#mgyBtn",function () {
//     console.log("sent join");
//     var username = $('input[name="uname"]').val();
//     var roomnumber = parseInt($('input[name="roomnumber"]').val());
//     var msg = {
//         username: username,
//         roomnumber: roomnumber
//     };
//     io.emit('join', msg);
//     console.log(msg);
// });
io.on('login', function(data) {
    // console.log("Successfully logged in as " + data.status + " and " +data.player);
    localgame = data.game;
    player = data.player;
    // console.log(player);
    // console.log(localgame);
    if(data.player == 1) {
        $('#start').css('display','block');
        host = true;
    } else {
        host = false;
    }

});
io.on('roomfull')
io.on('user_disconnect', function(room) {
    $('#start').css('display','block');
    localgame = room;

});
io.on('playerjoined', function(game) {
    localgame = game;
    // console.log(game);
    // console.log('other player joined');
});

$(document).on("click", "#start", function() {
    if(localgame.players.length == 2) {
    io.emit("start", localgame);
    $('#start').css('display','none');
    } else {
        // console.log("yo mama");
        ctx.font = '24px Arial';
        ctx.fillStyle ="red";
        ctx.fillText("Not enough players in game", c.width /3, c.height/2);
    }
});

io.on('started', function(instance) {
    localgame = instance;
    // console.log(localgame);
    // setInterval(update(), 15);
    started = true;
});
io.on('update', function(data) {
    // console.log('data');
   if(data.score.player2 > localgame.localinstance.score.player2 && player === 1){playSound()}
   if(data.score.player1 > localgame.localinstance.score.player1 && player === 2){playSound()}
   localgame.localinstance = data;
   update();
   // console.log(data);
});


function update() {

    draw();
    processinput();
}
function playSound(){
    if(audio != undefined || audio != null) {
        audio.play();
    }
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawPlayer(ctx, localgame.localinstance.player1);
    drawPlayer(ctx, localgame.localinstance.player2);
    drawBall(ctx, localgame.localinstance.ball);
    drawScore(ctx, localgame.localinstance.score, localgame.players[0].username, localgame.players[1].username);

}
function processinput() {
    io.emit('input', { currentY :currentY, localGame: localgame });
}

function Setup() {
    // console.log("setup gerund");
    $(document).on("click", "#myBtn", function(){
        // console.log("button geklikt");
        var nameValue = document.getElementById("uname").value;
        var roomNumber = document.getElementById("roomnumber").value;
        // console.log(roomNumber);
        if(nameValue.length == 0){
            $('#nameError').html("Please enter a valid name ");
            nameValue = null;
        }else if(roomNumber.length == 0){
            $('#nameError').html("Please enter a valid number");
            roomNumber = 0;
        }else {
            //do handling of playername

            //fillRooms();
            $("body").css("background-color","black");

            // console.log("sent join");
            var username = $('input[name="uname"]').val();
            var roomnumber = parseInt($('input[name="roomnumber"]').val());
            var msg = {
                username: username,
                roomnumber: roomnumber
            };
            io.emit('join', msg);
            // console.log(msg);

            io.on("roomcheck", function(data) {
                if(data) {
                    $('#nameError').html("Room is full");
                } else {
                    $(".modal").css("display","none");
                }
            })

        }
        if(host) {
        $('#start').css('display','block');
        }

    });

}


//rooms maken
var roomArray = ["Awesome Room", "Less Awesome room"];

function fillRooms() {
    var rooms = document.getElementById("rooms");
    rooms.innerHTML += "<ul>";
    for (i = 0; i < roomArray.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = "<li>" + roomArray[i] + "</li><BR>  ";
        rooms.appendChild(div);
    }
    rooms.innerHTML += "</ul>";

}


function drawPlayer(ctx, player) {
        ctx.beginPath();
        ctx.rect(player.posx, player.posy,10,player.hoogte);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();


}
function drawBall(ctx, ball) {

        ctx.beginPath();
        ctx.arc(ball.posx, ball.posy, ball.balGrootte, 0, 2*Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();

}
function drawScore(ctx, score, username1, username2) {

        ctx.font = '24px Arial';
        ctx.fillText(score.player1 + "", c.width/4, c.height / 8);
        ctx.fillText(username2+ "", c.width/4 -20, c.height / 8 -40);
        ctx.fillText(":", c.width/2, c.height / 8);
        ctx.fillText(score.player2 + "", c.width/2 + c.width/5, c.height / 8);
        ctx.fillText(username1+ "", c.width/2 + c.width/5 -20, c.height / 8 - 40);

}
function SetPlayerY(event){
    currentY = Math.round(event.clientY-165, 0);
}
