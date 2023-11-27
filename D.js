// Constants for controlling various aspects of the simulation
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER_DIVIDER = 200; // Controls the frame count divisor
const SAMPLE_DIVISIONS_MULTIPLIER = 9; // Controls the multiplier for sample divisions
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

function setup() {
  try {
    // Create a canvas with a size based on the window dimensions
    createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    console.error("Canvas creation failed:", error);
  }
}

function draw() {
  // Set the background color
  background('#d1d6e6');

  // Calculate the number of divisions for samples based on the frame count
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER_DIVIDER) / SAMPLE_DIVISIONS_MULTIPLIER)) * SAMPLE_DIVISIONS_MULTIPLIER;
  let nSamples = 0;

  // Calculate the angular separation between samples
  const sampleDelta = PI / sampleDivisions;

  // Set up initial sphere parameters
  const sphereRadius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const sphereCenterX = width / 2;
  const sphereCenterY = height / 2 - sphereRadius * CENTER_Y_ADJUSTMENT;

  // Draw samples on the upper hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Draw a point on the upper hemisphere
      circle(x * sphereRadius + sphereCenterX, sphereCenterY + (z - y * 0.25) * sphereRadius, 2);
      nSamples++;
    }
  }

  // Adjusted yOffset for the lower hemisphere
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Draw samples on the lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Draw a point on the lower hemisphere
      circle(x * sphereRadius + sphereCenterX, sphereCenterY + sphereRadius + yOffset - (z + y * 0.25) * sphereRadius, 2);
      nSamples++;
    }
  }

  // Display the number of samples on the canvas
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw a labeled text on the canvas
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(15);
  textAlign(align);

  // Adjustments for left and right alignment
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  // Draw the label in green and the value in black
  fill('#01af52');
  text(label, x, y + 45);
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);
  
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

