// Constants for adjusting various parameters
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

function setup() {
  try {
    // Create canvas with a size relative to the window
    createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    console.error("Error creating canvas:", error.message);
  }
}

function draw() {
  // Set background color
  background('#d1d6e6');

  // Calculate the number of samples based on frame count
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
  const sampleDelta = PI / sampleDivisions; // Angular distance between samples
  let nSamples = 0; // Counter for the number of samples

  // Set up sphere parameters
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const centerX = width / 2;
  const centerY = height / 2 - radius * CENTER_Y_ADJUSTMENT;

  // Draw samples on the upper hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Draw a small circle at the calculated position
      circle(x * radius + centerX, centerY + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Adjust for vertical separation
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Draw samples on the lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Draw a small circle at the calculated position
      circle(x * radius + centerX, centerY + radius + yOffset - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Display the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw a label with a value on the canvas
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(15);
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }
  
  // Set label color and display label and value
  fill('#01af52');
  text(label, x, y + 45);
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45); // Adjust the value to move the label lower/higher
  
  pop();
}

// Function to handle window resizing
function windowResized() {
  try {
    resizeCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
    // Redraw the scene
    draw();
  } catch (error) {
    console.error("Error resizing canvas:", error.message);
  }
}
