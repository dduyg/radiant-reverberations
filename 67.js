// Set up the canvas with p5.js
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Parameters controlling the dynamics of the simulation
let frameVariation = 200; // Adjusts the variation in frames
let sampleDensityModifier = 40; // Controls the density of samples
let upperHemisphereVerticalAdjustment = 0.95; // Adjusts the vertical position of the upper hemisphere
let lowerHemisphereVerticalAdjustment = 1.5; // Adjusts the vertical position of the lower hemisphere
let lightSourcePosition = 0.0; // Controls the position of the virtual light source

// Main drawing function
function draw() {
  clear();

  // Calculate the number of samples per frame based on parameters
  const samplesPerFrame = pow(2, floor((frameCount % frameVariation) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;

  // Calculate sphere dimensions based on canvas size
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculate vertical positions of upper and lower hemispheres
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Render samples for upper and lower hemispheres
  let nUpperSamples = renderHemisphereSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta, 1);
  let nLowerSamples = renderHemisphereSamples(lowerHemisphereCenterY, sphereRadius, sampleAngularDelta, -1);

  // Update light source position for animation
  lightSourcePosition += 0.002;

  // Display project information
  displayInfo(8, 46, "Radiant Reverberations", "Number of samples: ", nUpperSamples + nLowerSamples, LEFT);
}

// Function to render samples on a hemisphere
function renderHemisphereSamples(hemisphereCenterY, sphereRadius, sampleAngularDelta, direction) {
  noStroke();
  fill(0);
  
  let nSamples = 0;

  // Loop through azimuthal and polar angles to sample points on the hemisphere
  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {

      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotate coordinates based on light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Calculate final sample position on the canvas
      const sampleX = rotatedX * sphereRadius + width / 2;
      const sampleY = hemisphereCenterY + direction * (z - rotatedY * 0.25) * sphereRadius;

      // Draw a small circle at the sample position
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }
  
  return nSamples;
}

// Function to display project information
function displayInfo(x, y, title, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textAlign(align);
  if (align == LEFT) {
    x += 4;
  }
  if (align == RIGHT) {
    x -= 4;
  }

  // Styling for project title
  const titleFontSize = width < 600 ? 19 : 24;
  const labelValueFontSize = width < 600 ? 17 : 22;

  textStyle(BOLD);
  fill('#01af52');
  textFont("Space Mono");
  textSize(titleFontSize);
  const titleWidth = textWidth(title);
  const padding = 3;
  noStroke();
  rect(x - padding, y + 45 - titleFontSize + padding / 2, titleWidth + 2 * padding, titleFontSize + padding);
  fill('#d1d6e6');
  text(title, x, y + 45);

  // Styling for label and value
  const verticalSpace = titleFontSize * 0.3;
  y += verticalSpace;

  textStyle(NORMAL);
  fill('#01af52');
  textFont("monospace");
  textSize(labelValueFontSize);
  text(`${label} `, x, y + 70);

  fill(0);
  text(value, x + textWidth(label), y + 70);

  pop();
}

// Adjust canvas size when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
