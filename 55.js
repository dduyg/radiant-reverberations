// Constants for canvas size, animation speed, and sphere properties
const CANVAS_PERCENTAGE = 0.9;
const FRAME_MODIFIER = 200;
const SAMPLE_DIVIDER = 40;
const SPHERE_RADIUS_PERCENTAGE = 0.4;
const VERTICAL_SEPARATION_PERCENTAGE = 0.3;
const CENTER_Y_ADJUSTMENT = 0.9;
const Y_OFFSET_PERCENTAGE = 0.3;

// Set up canvas
function setup() {
  try {
    createCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    console.error("Error creating canvas:", error.message);
  }
}

// Main drawing function
function draw() {
  // Set background color
  background('#d1d6e6');

  // Calculate the number of sample divisions based on frame count
  const sampleDivisions = pow(2, floor((frameCount % FRAME_MODIFIER) / SAMPLE_DIVIDER)) * 9;

  // Calculate angular separation between samples
  const sampleDelta = PI / sampleDivisions;
  let totalSamples = 0;

  // Calculate sphere properties
  const sphereRadius = min(width, height) * SPHERE_RADIUS_PERCENTAGE;
  const centerX = width / 2;
  const centerY = height / 2 - sphereRadius * CENTER_Y_ADJUSTMENT;

  // Draw samples on the upper hemisphere of the first sphere
  totalSamples += drawSphereSamples(centerX, centerY, sphereRadius, sampleDelta);

  // Offset for the second sphere
  const yOffset = height * Y_OFFSET_PERCENTAGE;

  // Draw samples on the lower hemisphere of the second sphere
  totalSamples += drawSphereSamples(centerX, centerY + sphereRadius + yOffset, sphereRadius, sampleDelta);

  // Display the number of samples
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

      // Draw a point on the sphere's surface
      circle(x * radius + centerX, centerY + (z - y * 0.25) * radius, 2);
      sampleCount++;
    }
  }

  return sampleCount;
}

// Function to draw a label with a value on the canvas
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
  
  // Set label color and draw label text
  fill('#01af52');
  text(label, x, y + 45);
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);
  
  pop();
}

// Responsive canvas resizing
function windowResized() {
  try {
    resizeCanvas(windowWidth * CANVAS_PERCENTAGE, windowHeight * CANVAS_PERCENTAGE);
  } catch (error) {
    console.error("Error resizing canvas:", error.message);
  }
  redraw();
}
