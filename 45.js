// Constants defining various parameters
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

// Setup function to create the canvas
function setup() {
  try {
    createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    console.error("Error creating canvas:", error.message);
  }
}

// Draw function for rendering the irradiance sampling simulation
function draw() {
  // Background setup
  background('#d1d6e6');

  // Parameters controlling the number of samples
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
  const sampleDelta = PI / sampleDivisions;
  let nSamples = 0;

  // Parameters for the sphere's geometry
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const cx = width / 2;
  const cy = height / 2 - radius * CENTER_Y_ADJUSTMENT;

  // Rendering samples on the upper hemisphere
  renderSphereSamples(radius, cx, cy, sampleDelta, nSamples);

  // Offset for rendering samples on the lower hemisphere
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Rendering samples on the lower hemisphere
  renderSphereSamples(radius, cx, cy + radius + yOffset, sampleDelta, nSamples);

  // Drawing a label with the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to render samples on a sphere's surface
function renderSphereSamples(radius, cx, cy, sampleDelta, nSamples) {
  noStroke();
  fill(0);

  // Loop for phi (azimuthal angle)
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    // Loop for theta (polar angle)
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Spherical to Cartesian coordinates conversion
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Rendering a sample point on the sphere's surface
      circle(x * radius + cx, cy + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }
}

// Function to draw a label with specified alignment
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

  fill('#01af52');
  text(label, x, y + 45);
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);
  
  pop();
}

// Function to handle window resizing
function windowResized() {
  try {
    resizeCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
    redraw();
  } catch (error) {
    console.error("Error resizing canvas:", error.message);
  }
}
