// Constants defining parameters for the simulation
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

function setup() {
  // Creating a canvas based on a percentage of the window size
  const canvas = createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
}

function draw() {
  // Setting the background color
  background('#d1d6e6');

  // Calculating the number of samples based on frame count
  const div = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;

  // Calculating the angular separation between samples
  const sampleDelta = PI / div;
  let nSamples = 0;

  // Calculating sphere parameters
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const cx = width / 2;
  const cy = height / 2 - radius * CENTER_Y_ADJUSTMENT;

  // Drawing samples on the upper sphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Drawing a sample point on the upper sphere
      circle(x * radius + cx, cy + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Adjusting for vertical separation between spheres
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Drawing samples on the lower sphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Drawing a sample point on the lower sphere
      circle(x * radius + cx, cy + radius + yOffset - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Drawing a label indicating the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw a labeled text on the canvas
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

  // Styling the label and value text
  fill('#01af52'); // Green color for the label
  text(label, x, y + 45);
  fill(0); // Black color for the value
  text(value, x + textWidth(label + ' '), y + 45); // Adjust the value to move the label lower/higher

  pop();
}
