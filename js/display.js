// High-level render of text and lines
function renderDisplay(ctx) {
    initializeBackground(ctx, displayConfig.colors.background, overallOffsetX, 60, matrixWidth, matrixHeight);
    initializeBackground(ctx, displayConfig.colors.lineBackground, overallOffsetX, 60, 25, 19);

    renderSeparator(ctx, displayConfig.colors.separator, overallOffsetX, 31, matrixWidth);
    renderSeparator(ctx, displayConfig.colors.separator, overallOffsetX, 61, matrixWidth);

    renderTextOnCanvas(ctx, displayConfig.lineName.toUpperCase().split(""), 5, 2, false, displayConfig.colors.lineName, characters);
    renderTextOnCanvas(ctx, displayConfig.destination.toUpperCase().split(""), 25, 2, true, displayConfig.colors.destination, characters);
    renderTextOnCanvas(ctx, displayConfig.viaLine1.split(""), 0, 23, true, displayConfig.colors.via, characters_small);
    renderTextOnCanvas(ctx, displayConfig.viaLine2.split(""), 0, 37, true, displayConfig.colors.via, characters_small);

    const width = getTextWidth(textLine3.split(""), characters_small);
    renderTextOnCanvas(ctx, textLine3.split(""), matrixWidth - countdownPaddingRight - width, 53, false, displayConfig.colors.countdown, characters_small);
}
