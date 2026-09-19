var control_points = [
    {x: 10, y: 10, r: 10},
    {x: 200, y: 10, r: 10},
    {x: 10, y: 200, r: 10},
    {x: 200, y: 200, r: 10}
]

update_canvas();

window.addEventListener('mousedown', (event) => {
  // event.buttons returns a bitmask of currently pressed buttons
    while (event.buttons === 0) {
        if (is_pt_in_circle()) {

        }
        update_canvas();
    }
});


function draw_circle(x, y, col, rad) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.stroke();
};

function add_point() {
    control_points.push({x: 50, y: 50, r: 10});
    update_canvas();
}

function remove_point() {
    if (control_points.length > 0) {
        control_points.pop();
    }
    update_canvas();
}

function update_canvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < control_points.length; i++) {
        draw_circle(control_points[i].x, control_points[i].y, "red", control_points[i].r);
    }
}

function is_pt_in_circle(pt, circle_pt, rad) {
    let dx = pt[0] - circle_pt[0];
    let dy = pt[1] - circle_pt[1];

    return (dx * dx + dy * dy) <= rad * rad;
}