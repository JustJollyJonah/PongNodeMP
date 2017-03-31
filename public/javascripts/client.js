/**
 * Created by jonah on 23-Mar-17.
 */
var localgame;
$(document).on("click", "#myBtn",function () {
    console.log("sent join");
    var username = $('input[name="uname"]').val();
    var roomnumber = parseInt($('input[name="roomnumber"]').val());
    var msg = {
        username: username,
        roomnumber: roomnumber
    };
    io.emit('join', msg);
    console.log(msg);
});
io.on('login', function(data) {
    console.log("Sucessfully logged in as " + data.status);
    localgame = data.game;
    console.log(localgame);

});

$(document).on("click", "#start", function() {
    io.emit("start", localgame);
});


function Setup() {
    console.log("setup gerund");
    $(document).on("click", "#myBtn", function(){
        console.log("button geklikt");
        var nameValue = document.getElementById("uname").value;
        var roomNumber = document.getElementById("roomnumber").value;
        console.log(roomNumber);
        if(nameValue.length == 0){
            $('#nameError').html("Please enter a valid name ");
            nameValue = null;
        }else if(roomNumber.length == 0){
            $('#nameError').html("Please enter a valid number");
            roomNumber = 0;
        }else {
            //do handling of playername
            $(".modal").css("display","none");
            fillRooms();
        }


    });

}


//rooms maken
var roomArray = ["Awesome Room", "Less Awesome room", "Stijn's gay paradise"];

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