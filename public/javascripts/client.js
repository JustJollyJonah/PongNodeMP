/**
 * Created by jonah on 23-Mar-17.
 */
var localgame;
$(document).on("click", "#join",function () {
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
    console.log("Sucessfully loged in as "+data.status);
    localgame = data.game;
    console.log(localgame);

});

$(document).on("click", "#start", function() {
    io.emit("start", localgame);
});