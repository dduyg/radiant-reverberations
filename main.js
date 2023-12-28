// Initialize variables
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Define parameters and draw the irradiance sampling pattern
let frameModifier = 200; // Controls frame variation
let sampleDensityModifier = 40; // Controls sample density
let upperHemisphereVerticalAdjustment = 0.95; // Adjustments for upper hemisphere
let lowerHemisphereVerticalAdjustment = 1.5; // Adjustments for lower hemisphere
let lightSourcePosition = 0.0; // Controls light source position

// Main drawing function
function draw() {
  clear();

  // Calculate samples per frame
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;
  let nSamples = 0;

  // Set sphere radius percentage based on canvas size
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculate hemisphere centers
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Draw samples on upper hemisphere
  drawSamples(upperHemisphereCenterY, 0.25, sphereRadius);

  // Draw samples on lower hemisphere
  drawSamples(lowerHemisphereCenterY, -0.25, sphereRadius);

  // Update light source position
  lightSourcePosition += 0.01;

  // Draw label with project information
  drawLabel(8, 46, "Radiant Reverberations", "Number of samples: ", nSamples, LEFT);
}

// Function to draw samples on a hemisphere
function drawSamples(centerY, yOffset, radius) {
  noStroke();
  fill(0);

  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      const sampleX = rotatedX * radius + sphereCenterX;
      const sampleY = centerY + (z + yOffset * rotatedY) * radius;

      circle(sampleX, sampleY, 2);
      nSamples++;
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
