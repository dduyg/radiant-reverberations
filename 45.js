// Set constants for canvas size, frame count modification, sample division, sphere properties, and positioning
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

// Setup function to initialize the canvas
function setup() {
  createSimulationCanvas();
}

// Draw function to render the simulation
function draw() {
  background('#d1d6e6');

  // Calculate sample divisions based on frame count
  const sampleDivisions = calculateSampleDivisions();

  // Draw samples on the upper hemisphere
  drawHemisphereSamples(sampleDivisions, height / 2 - min(width, height) * SPHERE_RADIUS_PERCENTAGE * CENTER_Y_ADJUSTMENT);

  // Draw samples on the lower hemisphere
  drawHemisphereSamples(sampleDivisions, height / 2 + min(width, height) * SPHERE_RADIUS_PERCENTAGE * (1 + VERTICAL_SEPARATION_PERCENTAGE));

  // Display the number of samples
  drawLabel(8, 32, "Number of samples ", countSamples(sampleDivisions), LEFT);
}

// Function to create the canvas with a percentage of the window size
function createSimulationCanvas() {
  try {
    createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    console.error("Canvas creation failed:", error.message);
  }
}

// Function to calculate the number of sample divisions based on frame count
function calculateSampleDivisions() {
  return pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;
}

// Function to draw samples on a hemisphere
function drawHemisphereSamples(sampleDivisions, cy) {
  const sampleDelta = PI / sampleDivisions;
  let nSamples = 0;

  // Calculate properties for the hemisphere
  const radius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const cx = width / 2;

  noStroke();
  fill(0);

  // Loop through phi and theta to draw samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Draw a sample point and update the sample count
      nSamples = drawSamplePoint(phi, theta, radius, cx, cy, sampleDelta, nSamples);
    }
  }
}

// Function to draw a sample point and return the updated sample count
function drawSamplePoint(phi, theta, radius, cx, cy, sampleDelta, nSamples) {
  // Convert spherical coordinates to Cartesian coordinates
  const x = sin(theta) * cos(phi);
  const y = sin(theta) * sin(phi);
  const z = cos(theta);

  // Draw a sample point
  circle(x * radius + cx, cy + (z - y * VERTICAL_SEPARATION_PERCENTAGE) * radius, 2);

  // Increment the sample count
  return nSamples + 1;
}

// Display the sample number label with specified position, label text, value, and alignment
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  
  // Set the drawing style for the label
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
  
  // Set label color and draw the label
  fill('#01af52');
  text(label, x, y + 45); // Adjust value to position the label
  
  // Draw the dynamic value with default black color
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45); // Adjust value to position the label
  
  pop();
}
