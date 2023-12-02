// Function to draw the title with responsive width
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");
  textSize(width < 600 ? "1.5em" : "2em"); // Adjust these values as needed
  fill('#01af52');
  textAlign(CENTER);

  // Limit title width to 90% of screen width
  const titleWidth = min(width * 0.9, textWidth(title));
  text(title, width / 2, height - yOffset, titleWidth);

  pop();
}
