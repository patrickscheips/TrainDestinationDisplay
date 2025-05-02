// Draw outer and inner rectangles (i.e., the background of the matrix display)
function drawShape(ctx, canvas) {
    const w = canvas.width, h = canvas.height;
    const radius = 80;
    // Outer border
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(w - radius, 0);
    ctx.quadraticCurveTo(w, 0, w, radius);
    ctx.lineTo(w, h - radius);
    ctx.quadraticCurveTo(w, h, w - radius, h);
    ctx.lineTo(radius, h);
    ctx.quadraticCurveTo(0, h, 0, h - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fillStyle = "#3a312c";
    ctx.fill();
    // Inner fill
    ctx.fillStyle = "#000";
    ctx.fillRect(32, 52, w - 70, h - 110);
}
