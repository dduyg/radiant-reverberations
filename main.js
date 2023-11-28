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
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;

// Vertical adjustment for the center of the upper hemisphere (experiment to change its position)
const UPPER_HEMISPHERE_VERTICAL_ADJUSTMENT = 0.9;

// Vertical adjustment for the center of the lower hemisphere (experiment to change its position)
const LOWER_HEMISPHERE_VERTICAL_ADJUSTMENT = 0.3;

// Fill color for circles (experiment with different colors)
const CIRCLE_FILL_COLOR = 0; // Black
/***********************************/

// Set up the canvas
function setup() {
  const canvas = createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
}

// Draw function, called continuously
function draw() {
  // Set background color
  background('#d1d6e6');

  // Control the pattern parameters with frameCount
  const div = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;

  // Calculate the angular step for sampling
  const sampleDelta = PI / div;
  let nSamples = 0;

  // Set the radius of the spheres relative to the canvas size
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const cx = width / 2; // Center x-coordinate

  // Move the center of the upper hemisphere relative to the canvas size
  const cyUpper = height / 2 - radius * UPPER_HEMISPHERE_VERTICAL_ADJUSTMENT;

  // Move the center of the lower hemisphere relative to the canvas size
  const cyLower = height / 2 - radius * LOWER_HEMISPHERE_VERTICAL_ADJUSTMENT + radius * VERTICAL_SEPARATION_PERCENTAGE;

  // No stroke for circles, fill with black
  noStroke();
  fill(CIRCLE_FILL_COLOR);

  // Draw the upper hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate and draw each circle for the upper hemisphere
      circle(x * radius + cx, cyUpper + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Draw the lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate and draw each circle for the lower hemisphere
      circle(x * radius + cx, cyLower + (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Display the number of samples
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

  // Draw the static label & set color for the static label
  fill('#01af52'); // Change this to the desired color
  // Adjust the value to move the label lower/higher
  text(label, x, y + 45);
  // Set color for the dynamic value
  fill(0); // Keep this as black
  // Draw the dynamic value
  text(value, x + textWidth(label + ' '), y + 45); // Adjust the value to move the label lower/higher

  pop();
}
