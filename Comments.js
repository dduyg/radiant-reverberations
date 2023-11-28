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
  const canvas = createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
}

// Draw function for rendering the irradiance sampling simulation
function draw() {
  // Background setup
  background('#d1d6e6');

  // Parameters controlling the number of samples
  const samplesPerFrame = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
  const sampleDelta = PI / samplesPerFrame;
  let nSamples = 0;

  // Parameters for the sphere's geometry
  const sphereRadius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const centerX = width / 2;
  const centerY = height / 2 - sphereRadius * CENTER_Y_ADJUSTMENT;

  // Rendering samples on the upper hemisphere
  renderSphereSamples(sphereRadius, centerX, centerY, sampleDelta, nSamples);

  // Offset for rendering samples on the lower hemisphere
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Rendering samples on the lower hemisphere
  renderSphereSamples(sphereRadius, centerX, centerY + sphereRadius + yOffset, sampleDelta, nSamples);

  // Drawing a label with the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to render samples on a sphere's surface
function renderSphereSamples(radius, centerX, centerY, sampleDelta, nSamples) {
  noStroke();
  fill(0);

  // Nested loops to cover the sphere's surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Spherical coordinates to Cartesian coordinates conversion
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Mapping Cartesian coordinates to the canvas
      const mappedX = x * radius + centerX;
      const mappedY = centerY + (z - y * 0.25) * radius;

      // Rendering a sample point on the sphere's surface
      circle(mappedX, mappedY, 2);
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

  // Adjusting position based on alignment
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  // Drawing label text in green
  fill('#01af52');
  text(label, x, y + 45);

  // Drawing value text in black
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);

  pop();
}
