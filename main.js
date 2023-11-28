/***********************************
 * Constants for controlling various aspects of the simulation
 * ----------------------------------------------------------
 */
// Canvas size percentage (adjust to observe responsiveness)
const CANVAS_PERCENTAGE = 0.9;

// Frame count modifier (controls the variation speed)
const FRAME_MODIFIER = 200;

// Sample divider (affects the number of samples)
const SAMPLE_DIVIDER = 40;

// Sphere radius percentage (adjust to change the size of the spheres)
const SPHERE_RADIUS_PERCENTAGE = 0.4;

// Vertical separation percentage (controls the distance between the upper and lower hemispheres)
const VERTICAL_SEPARATION_PERCENTAGE = 0.6;

// Vertical adjustment for the center of the upper hemisphere (experiment to change its position)
const UPPER_HEMISPHERE_VERTICAL_ADJUSTMENT = 0.9;

// Vertical adjustment for the center of the lower hemisphere (experiment to change its position)
const LOWER_HEMISPHERE_VERTICAL_ADJUSTMENT = 1.1;

// Fill color for points (experiment with different colors)
const POINT_FILL_COLOR = 0; // Black
/***********************************/

// Function to set up the canvas
function setup() {
  const canvas = createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
}

// Function to draw the irradiance sampling simulation
function draw() {
  // Set background color
  background('#d1d6e6');

  // Parameters influencing sample distribution
  const div = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
  const sampleDelta = PI / div;
  let nSamples = 0;

  // Sphere properties
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const cx = width / 2;

  // Vertical separation adjustment
  const cyUpper = height / 2 - radius * UPPER_HEMISPHERE_VERTICAL_ADJUSTMENT;
  const cyLower = height / 2 + radius * LOWER_HEMISPHERE_VERTICAL_ADJUSTMENT;

  // Draw samples on the upper hemisphere
  noStroke();
  fill(POINT_FILL_COLOR);
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Visualize samples
      circle(x * radius + cx, cyUpper + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Draw samples on the lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Visualize samples
      circle(x * radius + cx, cyLower - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Draw label for the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw a labeled text
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

  // Label in green
  fill('#01af52');
  text(label, x, y + 45);

  // Value in black
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);

  pop();
}
