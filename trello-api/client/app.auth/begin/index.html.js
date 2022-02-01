import { Page } from "../../app/page/page.js";
var w = 0;
var h = 0;
var ctx;
var particles = [];
function move() {
    for (var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > w || p.y > h) {
            p.x = -20;
            p.y = Math.random() * h;
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var c = 0; c < particles.length; c++) {
        var p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
    }
    move();
}
var frm = 0;
function drfrm() {
    frm++;
    if (frm == 5) {
        frm = 0;
        draw();
    }
    window.requestAnimationFrame(drfrm);
}
function raining() {
    var canvas = document.createElement("canvas");
    canvas.classList.add("page-canvas");
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        w = canvas.width;
        h = canvas.height;
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.strokeStyle = 'rgba(0,128,0,1)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        var init = [];
        var maxParts = 100;
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 1,
                xs: Math.random() * 10 + 10,
                ys: -4 + Math.random() * 4 + 2
            });
        }
        for (var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }
        window.requestAnimationFrame(drfrm);
    }
}
;
Page.IsLoaded = true;
raining();
//# sourceMappingURL=index.html.js.map