// Setup function to create a canvas for visualization
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Parameters influencing the visualization
let frameModifier = 200; // Controls frame variation
let sampleDensityModifier = 40; // Controls sample density
let upperHemisphereVerticalAdjustment = 0.95; // Vertical adjustment for upper hemisphere
let lowerHemisphereVerticalAdjustment = 1.5; // Vertical adjustment for lower hemisphere
let lightSourcePosition = 0.0; // Initial light source position

// Draw function to create the dynamic visualization
function draw() {
  clear();

  // Calculate samples per frame based on modifiers
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;

  // Define sphere properties
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Define hemisphere centers
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Draw samples for upper hemisphere
  drawSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta, 1);

  // Draw samples for lower hemisphere
  drawSamples(lowerHemisphereCenterY, sphereRadius, sampleAngularDelta, -1);

  // Update light source position for animation
  lightSourcePosition += 0.01;

  // Display information label
  drawLabel(8, 46, "Radiant Reverberations", "Number of samples: ", samplesPerFrame * 2, LEFT);
}

// Function to draw samples on a hemisphere
function drawSamples(hemisphereCenterY, sphereRadius, sampleAngularDelta, direction) {
  noStroke();
  fill(0);

  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      // Calculate spherical coordinates
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotate coordinates based on light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Calculate sample position on the canvas
      const sampleX = rotatedX * sphereRadius + sphereCenterX;
      const sampleY = hemisphereCenterY + direction * (z - rotatedY * 0.25) * sphereRadius;

      // Draw sample point
      circle(sampleX, sampleY, 2);
    }
  }
}

// Set labels with specified styling, position, and alignment
/////////////////////////////////////////////////////////////
function drawLabel(x, y, title, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textAlign(align);
  if (align == LEFT) {
    x += 4;
  }
  if (align == RIGHT) {
    x -= 4;
  }

  // Font size title 19 if screen width is less than 600px, otherwise 24
  const titleFontSize = width < 600 ? 19 : 24;
  // Font size label 15 if screen width is less than 600px, otherwise 20
  const labelValueFontSize = width < 600 ? 15 : 20;

  // Set up the title of work
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

  // Add a bit more space between the first and second lines
  const verticalSpace = titleFontSize * 0.2;
  y += verticalSpace;

  // Set up the static label
  textStyle(NORMAL);
  fill('#01af52');
  textFont("monospace");
  textSize(labelValueFontSize);
  text(`${label} `, x, y + 70);

  // Set up the dynamic value of label; currently set to black
  fill(0);
  text(value, x + textWidth(label), y + 70);

  pop();
}

// Update canvas size when the window is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
