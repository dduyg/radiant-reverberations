// Set constants for canvas size, frame count modification, sample division, sphere properties, and positioning
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

// Setup function to create canvas
function setup() {
  const canvas = createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
}

// Draw function for the animation
function draw() {
  // Set background color
  background('#d1d6e6');

  // Calculate sample divisions based on frame count
  const div = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
  const sampleDelta = PI / div; // Angle between samples

  // Initialize variables
  let nSamples = 0;
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const cx = width / 2;
  const cy = height / 2 - radius * CENTER_Y_ADJUSTMENT;

  // Draw samples on the upper hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      circle(x * radius + cx, cy + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Draw samples on the lower hemisphere with vertical separation
  const yOffset = height * Y_OFFSET_PERCENTAGE;
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      circle(x * radius + cx, cy + radius + yOffset - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Display the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw labels with specified position and alignment
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(15);
  textAlign(align);

  // Adjust label position for LEFT and RIGHT alignment
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  // Set label color and draw
  fill('#01af52');
  text(label, x, y + 45);
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45); // Adjust the value to move the label lower/higher
  
  pop();
}
