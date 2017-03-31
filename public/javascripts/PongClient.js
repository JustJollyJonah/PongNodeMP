/**
 * Created by Matthaia on 31-3-2017.
 */
function Ball(x, y, velx, vely){
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.ballGrootte = 10;

    this.draw = function(canvas){
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.ballGrootte, 0, 2*Math.PI, false);
        canvas.fillStyle = 'white';
        canvas.fill();
        canvas.stroke();
    }
}

function Plank(x, y, hoogte){
    this.x = x;
    this.y = y;
    this.hoogte = hoogte;

    this.draw = function(canvas){
        canvas.beginPath();
        canvas.rect(this.x, this.y,10,this.hoogte);
        canvas.fillStyle = 'white';
        canvas.fill();
        canvas.stroke();
    }
}