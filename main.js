//////////////////////////////////////////////////////////////////////////////////////////////////
///////// Parameters for controlling various aspects of the simulation
//////////////////////////////////////////////////////////////////////////////////////////////////
// Frame count modifier (controls the variation speed)
let frameModifier = 200;
// Sample density modifier (affects the number of samples)
let sampleDensityModifier = 40;
// Sphere radius percentage (adjust to change the size of the spheres)
let sphereRadiusPercentage = 0.3;
// Vertical adjustment for the center of the upper hemisphere (experiment to change its position)
let upperHemisphereVerticalAdjustment = 0.95;
// Vertical adjustment for the center of the lower hemisphere (experiment to change its position)
let lowerHemisphereVerticalAdjustment = 1.5;
// Initial position of the virtual light source
let lightSourceTheta = 0.0;
// Fill color for points (modifies point color; currently set to black)
let pointFillColor = 0;
//////////////////////////////////////////////////////////////////////////////////////////////////


// Set up canvas based on window dimensions
///////////////////////////////////////////
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Creating the visual with draw()
//////////////////////////////////
function draw() {
  clear();

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
  fill(pointFillColor);
  
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Rotate the incoming light direction based on the lightSourceTheta
      const rotatedX = cos(lightSourceTheta) * x - sin(lightSourceTheta) * y;
      const rotatedY = sin(lightSourceTheta) * x + cos(lightSourceTheta) * y;

      // Calculate the position of each sample point on the upper hemisphere
      const sampleX = rotatedX * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - rotatedY * 0.25) * sphereRadius;

      // Draw the sample point
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

      // Rotate the incoming light direction based on the lightSourceTheta
      const rotatedX = cos(lightSourceTheta) * x - sin(lightSourceTheta) * y;
      const rotatedY = sin(lightSourceTheta) * x + cos(lightSourceTheta) * y;

      // Calculate the position of each sample point on the lower hemisphere
      const sampleX = rotatedX * sphereRadius + sphereCenterX;
      const sampleY = lowerHemisphereCenterY - (z + rotatedY * 0.25) * sphereRadius;

      // Draw the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Adjust the position of the virtual light source over time
  lightSourceTheta += 0.01; // Adjust the increment value based on the desired speed
  
  // Display the number of samples taken in the simulation
  drawLabel(8, 46, "Radiant Reverberations", "Number of samples: ", nSamples, LEFT);
}

// Set labels with specified styling, position, and alignment
/////////////////////////////////////////////////////////////
function drawLabel(x, y, title, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  // Font size adjustments based on screen width
  const titleFontSize = width < 600 ? 18 : 24;
  const labelValueFontSize = width < 600 ? 15 : 20;

  // Set up the first line (title) with bold, Space Mono font, and green color
  textStyle(BOLD);
  textFont("Space Mono");
  fill('#01af52');
  textSize(titleFontSize);
  text(title, x, y + 45);

  // Set up the second line (label with value) with monospace font and black color for label, green color for value
  textStyle(NORMAL); // Set to normal (not bold)
  fill(0);
  textFont("monospace");
  textSize(labelValueFontSize);
  text(`${label} `, x, y + 70);
  fill('#01af52');
  text(value, x + textWidth(label), y + 70);

  pop();
}
