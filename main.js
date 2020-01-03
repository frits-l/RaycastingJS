
function rand() {
    return Math.floor(Math.random() * (500 - 0 + 1)) + 0;
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function fillRectCentered(context, x, y, width, height) {
    context.fillRect(x - width / 2, y - height / 2, width, height);
}

function getAngle(x, y) {
    let angle = Math.atan2(y, x);
    let degrees = 180 * angle / Math.PI;
    return (360 + Math.round(degrees)) % 360;
}

// Get canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 1000;
let walls = [];

let camera = new Camera(250, 250, 90, 60);
let rays = [];

// add random walls
for (let i = 0; i < 3; i++) {

    walls.push(new Wall(rand(), rand(), rand(), rand()));

}
walls.push(new Wall(0, 0, 0, 500));
walls.push(new Wall(500, 0, 0, 0));
walls.push(new Wall(500, 0, 500, 500));
walls.push(new Wall(0, 500, 500, 500));

walls.push(new Wall(172, 350, 65, 315));
walls.push(new Wall(44, 483, 113, 350));
walls.push(new Wall(429, 116, 161, 491));
walls.push(new Wall(229, 216, 261, 291));


for (let i = camera.angle - camera.fov / 2; i < camera.angle + camera.fov / 2; i += .1) {
    let p = new Ray(camera.x, camera.y, i);
    rays.push(p);
}


// controls
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 40) {
        camera.y = camera.y + 5;
        for (let i = 0; i < rays.length; i++) {
            rays[i].updatepos(camera.x, camera.y);
        }

    }
    if (event.keyCode == 38) {

        camera.y = camera.y - 5;
        for (let i = 0; i < rays.length; i++) {
            rays[i].updatepos(camera.x, camera.y);
        }

    }
    if (event.keyCode == 37) {

        camera.x = camera.x - 5;
        for (let i = 0; i < rays.length; i++) {
            rays[i].updatepos(camera.x, camera.y);
        }

    }
    if (event.keyCode == 39) {

        camera.x = camera.x + 5;
        for (let i = 0; i < rays.length; i++) {
            rays[i].updatepos(camera.x, camera.y);
        }
    }

    if (event.keyCode == 65) {

        camera.angle += 5;
        rays = [];
        for (let i = camera.angle - camera.fov / 2; i < camera.angle + camera.fov / 2; i += .1) {
            let p = new Ray(camera.x, camera.y, i);
            rays.push(p);
        }
    }

    if (event.keyCode == 68) {

        camera.angle -= 5;
        rays = [];
        for (let i = camera.angle - camera.fov / 2; i < camera.angle + camera.fov / 2; i += .1) {
            let p = new Ray(camera.x, camera.y, i);
            rays.push(p);
        }
    }
});


// main loop
ctx.save();
setInterval(() => {

    ctx.restore();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rays.length; i++) {


        for (let x = 0; x < walls.length; x++) {
            let raycast = rays[i].cast(walls[x]);

            if (raycast != false) {
                rays[i].casting = true;

                if (rays[i].casting != false) {
                    let posToCurrentCast = Math.hypot(rays[i].dirx - camera.x, rays[i].diry - camera.y);
                    let posToNewCast = Math.hypot(raycast.x - camera.x, raycast.y - camera.y);

                    if (posToNewCast < posToCurrentCast) {
                        rays[i].dirx = raycast.x;
                        rays[i].diry = raycast.y;
                    }
                }


            }
        }


        for (let i = 0; i < walls.length; i++) {
            walls[i].draw();

        }
        rays[i].draw();
        camera.draw();

    }


    let step = 500 / rays.length;
    for (let i = 0; i < rays.length; i++) {




        if (rays[i].casting != false) {
            let posToCast = Math.hypot(rays[i].dirx - camera.x, rays[i].diry - camera.y);

            let z = posToCast * Math.cos(degrees_to_radians(rays[i].angle) - degrees_to_radians(camera.angle));
            posToCast = z;


            let mappedHeight = map_range(posToCast, 0, 500, 500, 25);
            let mappedDist = map_range(posToCast, 0, 500, 255, 0);


            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.beginPath();
            fillRectCentered(ctx, (i * step + step / 2) + 500, 500 / 2, step + 1, mappedHeight);

            ctx.fillStyle = "rgb(" + mappedDist + ", " + mappedDist + ", " + mappedDist + ")";
            ctx.fill();
            ctx.restore();
        } else {
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.rect(i * step + 500, 0, step, 500);
            ctx.fillStyle = "black";
            ctx.fill();

        }


    }




}, 50);

