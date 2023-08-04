let canvas = document.getElementById('thecanvas');

function canvas_read_mouse(canvas, e) {

    /*
    let canvasRect = canvas.getBoundingClientRect();
    canvas.tc_x1 = canvas.tc_x2;
    canvas.tc_y1 = canvas.tc_y2;
    canvas.tc_x2 = e.clientX - canvasRect.left;
    canvas.tc_y2 = e.clientY - canvasRect.top;
    */

    let canvasRect = canvas.getBoundingClientRect();

    canvas.tc_x1 = canvas.tc_x2;
    canvas.tc_y1 = canvas.tc_y2;
    canvas.tc_x2 = e.offsetX;
    canvas.tc_y2 = e.offsetY;

    // x = e.offsetX;
    // y = e.offsetY;
}

function on_canvas_mouse_down(e) {
    canvas_read_mouse(canvas, e);
    canvas.tc_md = true;
}

function on_canvas_mouse_up(e) {
    canvas.tc_md = false;
}

function on_canvas_mouse_move(e) {
    canvas_read_mouse(canvas, e);
    if (canvas.tc_md && (canvas.tc_x1 !== canvas.tc_x2 || canvas.tc_y1 !== canvas.tc_y2)) {

      // Drawline !!!
        let ctx = canvas.getContext("2d");

        /*
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 15;
        ctx.lineJoin = "round";
        ctx.moveTo(canvas.tc_x1, canvas.tc_y1);
        ctx.lineTo(canvas.tc_x2, canvas.tc_y2);
        ctx.stroke();
        */

        drawLine(ctx, canvas.tc_x1, canvas.tc_y1, canvas.tc_x2, canvas.tc_y2);
    }
}

function canvas_read_touch(canvas, e) {
    let canvasRect = canvas.getBoundingClientRect();

    // Old Stuff

    /*
    let touch = event.touches[0];

    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    */

    touch = e.touches[0];

    canvas.tc_x1 = canvas.tc_x2;
    canvas.tc_y1 = canvas.tc_y2;

    canvas.tc_x2 = e.clientX - canvasRect.left;
    canvas.tc_y2 = e.clientY - canvasRect.top;

    /*
    canvas.tc_x2 = touch.pageX - document.documentElement.scrollLeft - canvasRect.left;
    canvas.tc_y2 = touch.pageY - document.documentElement.scrollTop - canvasRect.top;
    */
}

function on_canvas_touch_start(e) {
    canvas_read_touch(canvas, e);
    canvas.tc_md = true;
}

function on_canvas_touch_end(e) {
    canvas.tc_md = false;
}

function on_canvas_touch_move(e) {    
    canvas_read_touch(canvas, e);
    if (canvas.tc_md && (canvas.tc_x1 !== canvas.tc_x2 || canvas.tc_y1 !== canvas.tc_y2)) {
        //alert(`${canvas.tc_x1} ${canvas.tc_y1} ${canvas.tc_x2} ${canvas.tc_y2}`);
        let ctx = canvas.getContext("2d");

        // Drawline !!!
        /*
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 15;
        ctx.lineJoin = "round";
        ctx.moveTo(canvas.tc_x1, canvas.tc_y1);
        ctx.lineTo(canvas.tc_x2, canvas.tc_y2);
        ctx.closePath();
        ctx.stroke();
        */

        drawLine(ctx, canvas.tc_x1, canvas.tc_y1, canvas.tc_x2, canvas.tc_y2);
    }
}

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 13;
  context.lineJoin = "round";
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
}

function clearArea() {
  let ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}




canvas.addEventListener('mousedown', (e) => { on_canvas_mouse_down(e) }, false);
canvas.addEventListener('mouseup', (e) => { on_canvas_mouse_up(e) }, false);
canvas.addEventListener('mousemove', (e) => { on_canvas_mouse_move(e) }, false);
canvas.addEventListener('touchstart', (e) => { on_canvas_touch_start(e) }, false);
canvas.addEventListener('touchend', (e) => { on_canvas_touch_end(e) }, false);
canvas.addEventListener('touchmove', (e) => { on_canvas_touch_move(e) }, false);