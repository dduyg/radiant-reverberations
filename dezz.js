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
    console.error("Error creating canvas:", error.message);
  }
}

// Draw function to render the simulation
function draw() {
  background('#d1d6e6');

  // Calculate the number of samples based on frame count
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;

  // Calculate angular separation between samples
  const sampleDelta = PI / sampleDivisions;
  let totalSamples = 0;

  // Set up initial sphere properties
  const sphereRadius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const centerX = width / 2;
  const centerY = height / 2 - sphereRadius * CENTER_Y_ADJUSTMENT;

  // Draw samples on the upper hemisphere
  totalSamples += drawSphereSamples(centerX, centerY, sphereRadius, sampleDelta);

  // Adjusted yOffset for the lower hemisphere
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Draw samples on the lower hemisphere
  totalSamples += drawSphereSamples(centerX, centerY + sphereRadius + yOffset, sphereRadius, sampleDelta);

  // Display the number of samples taken in the simulation
  drawLabel(8, 32, "Number of samples ", totalSamples, LEFT);
}

// Function to draw samples on a sphere's surface and return the count
function drawSphereSamples(centerX, centerY, radius, sampleDelta) {
  let sampleCount = 0;
  noStroke();
  fill(0);

  // Nested loops to cover the entire sphere surface
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Adjust and draw a sample point on the sphere's surface
      circle(x * radius + centerX, centerY + (z - y * 0.25) * radius, 2);
      sampleCount++;
    }
  }

  return sampleCount;
}

// Display samplelabel with specified position, label text, value, and alignment
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  
  // Set the style for the label
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
  
  // Set label color and draw label text
  fill('#01af52');
  text(label, x, y + 45); // Adjust value to position the label
  
  // Draw the dynamic value with default black color
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
