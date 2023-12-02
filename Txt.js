// Function to draw the title with responsive width
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");

  // Adjust font size based on screen width using em units directly
  textSize(width < 600 ? "1.5em" : "2em"); // Adjust these values as needed

  // Limit title width to 90% of screen width for smaller screens
  const titleWidth = min(width * 0.9, textWidth(title));

  fill('#01af52');
  textAlign(CENTER);

  // Draw the title, centered with responsive width
  text(title, width / 2, height - yOffset, titleWidth);

  pop();
}
