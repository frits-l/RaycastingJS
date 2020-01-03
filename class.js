class Ray {

    constructor(x, y,angle) {
        this.x = x;
        this.y = y;


        let length = 1000;
        this.angle = angle; // change later
        this.dirx = this.x+Math.cos(Math.PI * angle / 180) * length;
        this.diry = this.y+Math.sin(Math.PI * angle / 180) * length;

        this.casting = false;
    
    }

    setDir(event) {
        let rect = canvas.getBoundingClientRect();
        this.dirx = event.clientX - rect.left;
        this.diry = event.clientY - rect.top;

    }

    updatepos(cx, cy){

        this.x = cx;
        this.y = cy;
        
        let length = 1000;
        this.dirx = this.x+Math.cos(Math.PI * this.angle / 180) * length;
        this.diry = this.y+Math.sin(Math.PI * this.angle / 180) * length;

        this.casting = false;
    }

    draw() {

        if (this.casting != false) {
            ctx.strokeStyle = "red";
        } else {
            ctx.strokeStyle = "black";
        }

        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.dirx, this.diry);
        ctx.stroke();
    }


    cast(wall) {
        const x1 = wall.x1;
        const y1 = wall.y1;
        const x2 = wall.x2;
        const y2 = wall.y2;


        const x3 = this.x;
        const y3 = this.y;
        const x4 = this.dirx;
        const y4 = this.diry;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        if (den == 0) {
            return false;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {

            const ix = x1 + t * (x2 - x1);
            const iy = y1 + t * (y2 - y1);

            return new Vector(ix,iy);
        } else {
            return false;
        }


    }



}


class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }


    draw() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }


}


class Camera{


    constructor(x,y, angle, fov){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fov = fov;
    }

    draw(){
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
        ctx.stroke();
    }

    
}


class Vector{

    constructor(x,y){
        this.x = x;
        this.y = y;
    }


}