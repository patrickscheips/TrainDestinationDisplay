// Low-level drawing utilities

/**
 * Draws a grid of background dots (matrix) onto the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
 * @param {string} color - The fill color for the dots.
 * @param {number} offsetX - Horizontal offset for drawing start.
 * @param {number} offsetY - Vertical offset for drawing start.
 * @param {number} limitWidth - Number of dot columns to draw.
 * @param {number} limitHeight - Number of dot rows to draw.
 */
function initializeBackground(ctx, color, offsetX, offsetY, limitWidth, limitHeight) {
    for (let row = 0; row < limitHeight; row++) {
        for (let col = 0; col < limitWidth; col++) {
            ctx.beginPath();
            // Calculate the position of each dot
            const x = offsetX + col * (dotSize + dotSpacing);
            const y = offsetY + row * (dotSize + dotSpacing);
            // Draw a filled circle
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }
}

/**
 * Draws a single horizontal row of dots (a "line") on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
 * @param {string} color - The fill color for the dots.
 * @param {number} offsetX - Horizontal offset for the start position.
 * @param {number} offsetY - Vertical line index (not pixel-based).
 * @param {number} limitWidth - Number of dots to draw in the line.
 */
function renderSeparator(ctx, color, offsetX, offsetY, limitWidth) {
    for (let i = 0; i < limitWidth; i++) {
        ctx.beginPath();
        const x = offsetX + i * (dotSize + dotSpacing);
        const y = offsetY * (dotSize + dotSpacing);
        ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

/**
 * Calculates the total width (in dot units) of a line of text based on the character patterns.
 *
 * @param {string[]} textArray - Array of characters to render.
 * @param {Object} characterSet - The character set mapping characters to pixel patterns.
 * @returns {number} - Total width of the text in character units.
 */
function getTextWidth(textArray, characterSet) {
    let totalWidth = 0;
    // Use narrower spacing for small fonts
    const charSpacing = (characterSet === characters_small) ? 1 : 2;

    textArray.forEach(character => {
        // Fallback to space character if not found
        const pattern = characterSet[character] || characterSet[" "];
        const rows = pattern.split(".");
        const maxWidth = Math.max(...rows.map(r => r.length));
        totalWidth += (maxWidth + charSpacing);
    });

    // Subtract final spacing to avoid trailing gap
    return totalWidth - charSpacing;
}

/**
 * Renders a line of text onto the canvas using the dot matrix character set.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
 * @param {string[]} textArray - Array of characters to render.
 * @param {number} xOffset - Horizontal offset in character units.
 * @param {number} yOffset - Vertical offset in character units.
 * @param {boolean} center - Whether to horizontally center the text.
 * @param {string} color - Color to use for rendering the text.
 * @param {Object} characterSet - The character set mapping characters to pixel patterns.
 */
function renderTextOnCanvas(ctx, textArray, xOffset, yOffset, center, color, characterSet) {
    // Calculate the total width of the rendered text
    const totalWidth = getTextWidth(textArray, characterSet);

    // Center the text horizontally if required
    if (center) {
        xOffset = Math.floor(((matrixWidth - totalWidth) / 2) + (xOffset / 2));
    }

    // Convert character units to pixel coordinates
    let x = overallOffsetX + xOffset * (dotSize + dotSpacing);
    let y = overallOffsetY + yOffset * (dotSize + dotSpacing);

    const charSpacing = (characterSet === characters_small) ? 1 : 2;
    const spacingPx = charSpacing * (dotSize + dotSpacing);

    // Render each character
    textArray.forEach(character => {
        const pattern = characterSet[character] || characterSet[" "];
        const rows = pattern.split(".");

        rows.forEach((row, rowIndex) => {
            row.split("").forEach((pixel, colIndex) => {
                if (pixel === "1") {
                    ctx.beginPath();
                    ctx.arc(
                        x + colIndex * (dotSize + dotSpacing),
                        y + rowIndex * (dotSize + dotSpacing),
                        dotSize / 2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            });
        });

        // Move to the next character position
        const letterWidth = Math.max(...rows.map(r => r.length));
        x += letterWidth * (dotSize + dotSpacing) + spacingPx;
    });
}
