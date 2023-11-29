/******************************************************************
 ** Parameters for controlling various aspects of the simulation ~~
 ** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~
 */
// Canvas size percentage (adjust to observe responsiveness)
let canvasPercentage = 0.9;

// Frame count modifier (controls the variation speed)
let frameModifier = 200;

// Sample density modifier (affects the number of samples)
let sampleDensityModifier = 40;

// Sphere radius percentage (adjust to change the size of the spheres)
let sphereRadiusPercentage = 0.4;

// Vertical adjustment for the center of the upper hemisphere (experiment to change its position)
let upperHemisphereVerticalAdjustment = 0.95;

// Vertical adjustment for the center of the lower hemisphere (experiment to change its position)
let lowerHemisphereVerticalAdjustment = 1.35;

// Fill color for points (modifies point color; currently set to black)
let pointFillColor = 0;
/******************************************************************/

// Function to set up the canvas
function setup() {
  createCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}

// Function to draw the irradiance sampling simulation
function draw() {
  // Set background color
  background('#d1d6e6');

  // Parameters influencing sample distribution
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;
  let nSamples = 0;

  // Sphere properties
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Vertical separation adjustment
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Draw samples on the upper hemisphere
  noStroke();
  fill(pointFillColor);
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate the position of each sample point on the upper hemisphere
      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - y * 0.25) * sphereRadius;

      // Render (draw) the sample point
      circle(sampleX, sampleY, 2);

      // Increment the count of samples
      nSamples++;
    }
  }

  // Draw samples on the lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate the position of each sample point on the lower hemisphere
      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = lowerHemisphereCenterY - (z + y * 0.25) * sphereRadius;

      // Render (draw) the sample point
      circle(sampleX, sampleY, 2);

      // Increment the count of samples
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

// Function to handle window resizing
function windowResized() {
  resizeCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}
