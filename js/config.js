// Configuration for Train Destination Display
const dotSize = 4; // size per dot
const dotSpacing = 1; // spacing between each dot (both horizontal and vertical)
const matrixWidth = 202; // width of matrix display rendered on background
const matrixHeight = 64; // height of matrix display rendered on background
const overallOffsetX = 40; // x offset of matrix display
const overallOffsetY = 50; // y offset of matrix display
const countdownPaddingRight = 22; // right padding for (right-aligned) countdown

const displayConfig = {
  lineName: "U1",
  destination: "Central Station",
  viaLine1: "via Main Street - House Road -",
  viaLine2: "Bank Road",

  // year, month (0 = Jan), day, hours, minutes, seconds
  // use a fixed date, e.g.: new Date(2025, 4, 3, 2, 30, 0)
  // or use a variable date, e.g.: new Date(Date.now() + 30 * 1000)
  countdownTarget: new Date(Date.now() + 30 * 1000),

  // true to show Save as PNG button, false to hide it
  showSaveButton: true,

  // Configure colors as hex color codes
  colors: {
    background: "#454037",
    lineBackground: "#FF6657",
    separator: "#C1EB6F",
    lineName: "#454037",
    destination: "#FF6657",
    via: "#E4A94E",
    countdown: "#C1EB6F"
  }
};
