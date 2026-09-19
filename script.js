var control_points = [
    {x: 10, y: 10, r: 10},
    {x: 200, y: 10, r: 10},
    {x: 10, y: 200, r: 10},
    {x: 200, y: 200, r: 10}
];

var mouse_pos = {x: 0, y: 0};
var selected_control_pt = -1;
var bezier_resolution = 500;


const canvas = document.getElementById('myCanvas');
const availWidth = screen.availWidth;

canvas.width = availWidth * 0.985

const range = document.getElementById("myRange");
const output = document.getElementById("rangeValue");
output.innerHTML = range.value;


update_canvas();

window.addEventListener('mousemove', (event) => {
    mouse_pos = get_canvas_mouse_pos(event);

    if (selected_control_pt > -1) {
        control_points[selected_control_pt].x = mouse_pos.x;
        control_points[selected_control_pt].y = mouse_pos.y;
        update_canvas();
    }

    range.oninput = function() { output.innerHTML = this.value; }

    bezier_resolution = output.innerHTML;
});

window.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;

    mouse_pos = get_canvas_mouse_pos(event);

    for (let i = 0; i < control_points.length; i++) {
        if (is_pt_in_control_pt(mouse_pos, control_points[i])) {
            selected_control_pt = i;
            break;
        }
    }
});

window.addEventListener('mouseup', () => {
    selected_control_pt = -1;
    update_canvas();
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
    if (control_points.length < 30) {
        control_points.push({x: 50, y: 50, r: 10});
    }
    update_canvas();
}

function remove_point() {
    if (control_points.length > 2) {
        control_points.pop();
    }
    update_canvas();
}

function update_canvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing circles around the control points
    for (let i = 0; i < control_points.length; i++) {
        draw_circle(control_points[i].x, control_points[i].y, "red", control_points[i].r);
    }

    // Drawing the bezier curve
    for (let i = 0; i < bezier_resolution; i++) {
        t = i / bezier_resolution;

        vec_pt = get_pt_of_nth_degree_bezier(t, control_points);

        draw_pixel(vec_pt.x, vec_pt.y, "red")
    }

}

function is_pt_in_circle(pt, circle_pt, rad) {
    let dx = pt.x - circle_pt.x;
    let dy = pt.y - circle_pt.y;

    return (dx * dx + dy * dy) <= rad * rad;
}

function is_pt_in_control_pt(pt, control_pt) {
    return is_pt_in_circle(pt, control_pt, control_pt.r);
}

function get_canvas_mouse_pos(event) {
    const canvas = document.getElementById("myCanvas");
    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function get_pt_of_nth_degree_bezier(t, control_pts) {
    var v_return = {x: 0, y: 0};
    var n = control_pts.length - 1;

    for (let i = 0; i < control_pts.length; i++) {
        let basis = binomial_coefficient(n, i) * (1.0 - t) ** (n - i) * (t ** i);
        v_return.x += (basis * control_pts[i].x);
        v_return.y += (basis * control_pts[i].y);
    }

    return v_return;
}

function binomial_coefficient(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function draw_pixel(x, y, color) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}