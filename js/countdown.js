// Countdown and render loop
$(document).ready(function () {
    const canvas = document.getElementById('zzaCanvas');
    const ctx = canvas.getContext('2d');
    const target = displayConfig.countdownTarget;

    // Only show Save as PNG button if enabled in config
    if (displayConfig.showSaveButton) {
        $('#saveBtn').css('display', 'inline-block');
    }

    function update() {
        const now = new Date(), diff = target - now;

        if (diff <= 1000) {
            textLine3 = "due";
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            let parts = [];

            if (days > 0) {
                parts.push(`${days}d`);
            }
            if (hours > 0 || days > 0) {
                parts.push(`${hours}h`);
            }
            if (minutes > 0 || hours > 0 || days > 0) {
                parts.push(`${minutes}m`);
            }

            parts.push(`${seconds}s`);
            textLine3 = `in ${parts.join(" ")}`;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShape(ctx, canvas);
        renderDisplay(ctx);
    }

    setInterval(update, 1000);
    update();

    // Button to save canvas as PNG
    $('#saveBtn').on('click', function() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'trainDestinationDisplay.png';
        link.click();
    });
});
