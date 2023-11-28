// Constants for controlling various aspects of the simulation
// Set constants for canvas size, frame count modification, sample division, sphere properties, and positioning
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

// Set up the canvas based on window dimensions
function setup() {
  try {
    createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    // Handle potential errors during canvas creation
    console.error("Error creating canvas:", error.message);
  }
}

// Draw function to render simulation
function draw() {
  background('#d1d6e6');

  // Calculating the number of samples based on frame count
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;

  // Calculating the angular separation between samples
  const sampleDelta = PI / sampleDivisions;
  let nSamples = 0;

  // Set up initial sphere properties
  const sphereRadius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const centerX = width / 2;
  const centerY = height / 2 - sphereRadius * CENTER_Y_ADJUSTMENT;

  // Rendering samples on the upper hemisphere
  renderSphereSamples(sphereRadius, centerX, centerY, sampleDelta, nSamples);

  // Adjusting for vertical separation between spheres
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Rendering samples on the lower hemisphere
  renderSphereSamples(sphereRadius, centerX, centerY + sphereRadius + yOffset, sampleDelta, nSamples);

  // Display the number of samples taken in the simulation
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw samples on a sphere's surface and return the count
function renderSphereSamples(radius, centerX, centerY, sampleDelta, nSamples) {
  noStroke();
  fill(0);

  // Iterate to cover the entire sphere surface
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Rendering a sample point on the sphere's surface
      circle(x * radius + centerX, centerY + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }
}

// Display label with specified styling, position, label text, value, and alignment
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
  // Setting static label color and dynamic value label color (fill:0 black)
  fill('#01af52');
  text(label, x, y + 45); // Adjust value to position the label
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45); // Adjust value to position the label

  pop();
}

// Function to handle window resizing
function windowResized() {
  try {
    // Resize the canvas to fit the new window dimensions
    resizeCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
    // Redraw the simulation
    draw();
  } catch (error) {
    console.error("Window resizing failed:", error);
  }
}
