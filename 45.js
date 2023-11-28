// Constants for adjusting various parameters
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
    // Create a canvas with a responsive size
    createResponsiveCanvas();
  } catch (error) {
    console.error("Error creating canvas:", error.message);
  }
}

// Function to create a responsive canvas
function createResponsiveCanvas() {
  const canvas = createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  if (!canvas) {
    throw new Error("Canvas creation failed.");
  }
}

// Draw function for the animation
function draw() {
  // Set background color
  background('#d1d6e6');

  // Calculate the number of samples based on frame count
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
  const sampleDelta = PI / sampleDivisions;
  let totalSamples = 0;

  // Calculate sphere properties
  const sphereRadius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const centerX = width / 2;
  const centerY = height / 2 - sphereRadius * CENTER_Y_ADJUSTMENT;

  // Draw samples on the upper hemisphere
  drawHemisphere(centerX, centerY, sphereRadius, sampleDelta, totalSamples);
  
  // Offset for the lower hemisphere
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Draw samples on the lower hemisphere
  drawHemisphere(centerX, centerY + sphereRadius + yOffset, sphereRadius, sampleDelta, totalSamples);

  // Display the number of samples
  drawLabel(8, 32, "Number of samples", totalSamples, LEFT);
}

// Function to draw samples on a hemisphere
function drawHemisphere(centerX, centerY, radius, delta, totalSamples) {
  noStroke();
  fill(0);

  for (let phi = 0.0; phi < 2.0 * PI; phi += delta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += delta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Adjust and draw a sample point on the hemisphere
      circle(x * radius + centerX, centerY + (z - y * 0.25) * radius, 2);
      totalSamples++;
    }
  }
}

// Function to draw labels on the canvas
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
  resizeCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  redraw();
}
