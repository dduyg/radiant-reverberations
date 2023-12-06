//////////////////////////////////////////////////////////////////////////////////////////////////
///////// Parameters for controlling various aspects of the simulation
//////////////////////////////////////////////////////////////////////////////////////////////////
// Canvas size percentage to make it responsive
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
let lowerHemisphereVerticalAdjustment = 1.5;
// Fill color for points (modifies point color; currently set to black)
let pointFillColor = 0;

// Light source positions
let upperLightSource = createVector(0, 0); // Top-left corner for upper hemisphere
let lowerLightSource = createVector(width, 0); // Diagonal top-right to bottom-left for lower hemisphere

// Gradient color transition parameters
let upperGradientStart = color(0, 100, 50); // Black for upper hemisphere
let upperGradientEnd = color(120, 100, 80); // Green for upper hemisphere
let lowerGradientStart = color(0, 0, 20); // Black for lower hemisphere
let lowerGradientEnd = color(0, 0, 50); // Dark gray for lower hemisphere
//////////////////////////////////////////////////////////////////////////////////////////////////

// Set up canvas based on window dimensions
///////////////////////////////////////////
function setup() {
  let cnv = createCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
  cnv.id('p5-canvas');
}

// Draw function to create the visual
/////////////////////////////////////
function draw() {
  background('#d1d6e6');

  // Parameters influencing sample distribution
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame; // Calculates the angular separation between samples
  let nSamples = 0;

  // Set up sphere properties
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Adjusting for vertical separation between spheres
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Rendering the upper hemisphere
  /////////////////////////////////
  noStroke();

  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate the position of each sample point on the upper hemisphere
      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - y * 0.25) * sphereRadius;

      // Calculate the normalized position within the hemisphere (between 0 and 1)
      const normalizedPosition = map(phi, 0, 2 * PI, 0, 1);
      
      // Interpolate lightness based on the normalized position
      const upperLightness = lerp(upperGradientStart.levels[2], upperGradientEnd.levels[2], normalizedPosition);
      
      // Set fill color using HSL color model
      fill(upperGradientEnd.levels[0], upperGradientEnd.levels[1], upperLightness);

      // Draw sample point for upper hemisphere
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Rendering the lower hemisphere
  /////////////////////////////////
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate the position of each sample point on the lower hemisphere
      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = lowerHemisphereCenterY - (z + y * 0.25) * sphereRadius;

      // Calculate the normalized position within the hemisphere (between 0 and 1)
      const normalizedPosition = map(phi, 0, 2 * PI, 0, 1);
      
      // Interpolate lightness based on the normalized position
      const lowerLightness = lerp(lowerGradientStart.levels[2], lowerGradientEnd.levels[2], normalizedPosition);
      
      // Set fill color using HSL color model
      fill(lowerGradientEnd.levels[0], lowerGradientEnd.levels[1], lowerLightness);

      // Draw sample point for lower hemisphere
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Display the number of samples taken in the simulation
  drawLabel(8, 46, "Number of samples ", nSamples, LEFT);

  // Display title of work
  drawTitle("Radiant Reverberations", 2);
}

// Set labels with specified styling, position, and alignment
/////////////////////////////////////////////////////////////
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }
  // Font size 15 if screen width is less than 600px, otherwise 22
  textSize(width < 600 ? 15 : 22);

  // Set up the static label with color
  fill('#01af52');
  text(label, x, y + 45);

  // Set up the dynamic label with color; currently set to black
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);

  pop();
}

// Set the title of work
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");

  // Adapts font size between 16 and 28 according to screen width;
  // if width is 600px or more, sets directly to 32
  textSize(width < 600 ? map(width, 0, 600, 16, 28) : 32);

  fill('#01af52');
  textAlign(CENTER);
  text(title, width / 2, height - yOffset);

  pop();
}

// Function to handle window resizing
/////////////////////////////////////
function windowResized() {
  resizeCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}
